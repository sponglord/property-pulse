import connectDB from '@/config/database';
import Property from '@/models/Property';
import { getSessionUser } from '@/utils/getSessionUser';
import cloudinary from '@/config/cloudinary';

// GET api/properties
// Retrieve all properties
export const GET = async (request) => {
	// For testing the route...
	// Going to http://localhost:5040/api/properties will print "Hello world" to the screen
	/* try {
        return new Response(JSON.stringify({ message: 'Hello world' }), { status: 200 });
    } catch (error) {
        console.log('### /properties GET error:: e=', error);
        return new Response('Something went wrong', { status: 500 });
    } */

	try {
		// Now, going to http://localhost:5040/api/properties OR, within a comp, doing a fetch to this url
		// will retrieve the properties data from the db

		await connectDB();

		// As an alternative to doing this...
		// const { searchParams } = new URL(request.url);
		// const page = searchParams.get('page');
		// const pageSize = searchParams.get('pageSize');

		// ...Get the params from the url using nextUrl
		const page = request.nextUrl.searchParams.get('page') || 1; // The page we want to "start" on
		const pageSize = request.nextUrl.searchParams.get('pageSize') || 3; // The no. of properties we want to display per page

		// If we request a "page" and a page has a pageSize of x, then if we start on page 2, we need to ignore the first x properties
		// and start retrieving properties from x + 1
		const skip = (page - 1) * pageSize;

		// Passing in an empty object to the model i.e. no retrieval "condition" will give us a count of all the properties
		const total = await Property.countDocuments({});

		// Retrieve a subset of properties starting at the skip value and only containing the number specified by pageSize
		const properties = await Property.find({}).skip(skip).limit(pageSize);

		/**
		 * What's happening...
		 *  - Property, being a model built with a Mongoose Schema, when it's "find" method is called will
		 *    query the database we've connected to and retrieve all the objects that match that schema
		 */

		const result = {
			total,
			properties,
		};

		return new Response(JSON.stringify(result), { status: 200 });
	} catch (error) {
		console.log('### /properties GET error:: e=', error);
		return new Response('Something went wrong', { status: 500 });
	}
};

// POST api/properties
// Add a new property
export const POST = async (request) => {
	// See the attributes on the <form> element in /components/PropertyAddForm.jsx - for how this route is called

	try {
		/**
		 * Retrieve the user/user.id
		 */
		await connectDB();

		// Access the logged in user
		const sessionUser = await getSessionUser();

		if (!sessionUser || !sessionUser.userId) {
			return new Response('User ID is required', { status: 401 });
		}

		const { userId } = sessionUser;

		/**
		 * Parse the form data, ready to send to the DB
		 */
		const formData = await request.formData();
		// console.log('### formData:: name=', formData.get('type')); // Gets the value of the from element who's name attribute is set to "type"

		// Access all values from amenities and images
		const amenities = formData.getAll('amenities'); // retrieves all values from an array
		// console.log('### formData:: =', amenities);
		const images = formData
			.getAll('images')
			.filter((image) => image.name !== '');

		// Create property data object for the DB
		const propertyData = {
			type: formData.get('type'),
			name: formData.get('name'),
			description: formData.get('description'),
			location: {
				street: formData.get('location.street'),
				city: formData.get('location.city'),
				state: formData.get('location.state'),
				zipcode: formData.get('location.zipcode'),
			},
			beds: formData.get('beds'),
			baths: formData.get('baths'),
			square_feet: formData.get('square_feet'),
			amenities,
			rates: {
				weekly: formData.get('rates.weekly'),
				monthly: formData.get('rates.monthly'),
				nightly: formData.get('rates.nightly'),
			},
			seller_info: {
				name: formData.get('seller_info.name'),
				email: formData.get('seller_info.email'),
				phone: formData.get('seller_info.phone'),
			},
			owner: userId,

			/**
			 * Images need to be uploaded to Cloudinary, so we can retrieve an actual url for them, and it is this url we will store
			 * in a string array.
			 * As it stands the images are currently File objects which we cannot store, as they are not compatible with
			 * Mongoose validation
			 */
			// images,
		};

		/**
		 * Upload image(s) to Cloudinary
		 *
		 * The process:
		 *  - Select an image from the form
		 *  - Turn it into an ArrayBuffer
		 *  - Encode that buffer to base64
		 *  - Upload that data to Cloudinary
		 *  - The Cloudinary response will contain a url for that image
		 *  - We put that url into the images array in the Property model
		 *  - And save it to the DB as part of our added property
		 */
		const imageUploadPromises = [];

		for (const image of images) {
			const imageBuffer = await image.arrayBuffer();
			const imageArray = Array.from(new Uint8Array(imageBuffer));
			const imageData = Buffer.from(imageArray);

			// Convert the image data to base64
			const imageBase64 = imageData.toString('base64');

			// Make request to upload to Cloudinary
			const result = await cloudinary.uploader.upload(
				`data:image/png;base64,${imageBase64}`,
				{ folder: 'propertypulse' } // This is the name of the folder we created on Cloudinary
			);

			imageUploadPromises.push(result.secure_url);

			// Wait for all images to upload i.e. for all promises to fulfill
			const uploadedImages = await Promise.all(imageUploadPromises);

			// Add uploaded images to the propertyData object
			propertyData.images = uploadedImages;
		}

		// console.log('### propertyData:: =', propertyData);

		// Instantiate a new Model...
		const newProperty = new Property(propertyData);

		// ...and save it to the DB
		await newProperty.save();

		// After a successful submission to the DB, redirect to the newly created property page
		// - MongoDB will have created a new property with an (Object) _id which it will have written to the Model
		return Response.redirect(
			`${process.env.NEXTAUTH_URL}/properties/${newProperty._id}`
		);

		// return new Response(JSON.stringify({ message: 'success' }), {
		// 	status: 200,
		// });
	} catch (error) {
		console.log('### /properties POST error:: e=', error);
		return new Response('Failed to add property', { status: 500 });
	}
};
