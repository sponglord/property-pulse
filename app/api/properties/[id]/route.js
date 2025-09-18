import connectDB from '@/config/database';
import Property from '@/models/Property';
import { getSessionUser } from '@/utils/getSessionUser';

// GET api/properties/:id
// Fetches individual property based on id

// Test by going to http://localhost:5040/api/properties/678e882ece5a98937f674389 (where the last string is an _id for an entry in the mongoDB)// GET api/properties/:[id]
export const GET = async (request, { params }) => {
	// N.B. second argument, destructuring params from the url

	try {
		await connectDB();

		// Asynchronous access of `params.id`.
		// In Next 15, the params & searchParam APIs have been made asynchronous. re. https://nextjs.org/docs/messages/sync-dynamic-apis
		const { id } = await params;

		// The Property model has a findById method which allows you to specify the _id (db-added key) of a property you want to find
		const property = await Property.findById(id);

		if (!property)
			return new Response('Property not found', { status: 404 });

		/**
		 * What's happening...
		 *  - Property, being a model built with a Mongoose Schema, when it's "findById" method is called will
		 *    query the database we've connected to and retrieve the object with the matching _id
		 */

		return new Response(JSON.stringify(property), {
			status: 200,
			// Need to add this CORS header so that the individual property page will be served on Vercel
			// UPDATE: Maybe not true - might have just been an issue with running the deploy preview (https://property-pulse-avt5k153y-sponglords-projects.vercel.app)
			// rather than the *actual* deployment (https://property-pulse-mauve-two.vercel.app)
			// headers: {
			// 	'Content-Type': 'application/json',
			// 	'Access-Control-Allow-Origin': '*', // Allows requests from any origin
			// },
		});
	} catch (error) {
		console.log('### api/properties/:id GET error:: e=', error);
		return new Response('Something went wrong', { status: 500 });
	}
};

// DELETE api/properties/:id
// For deleting a specific property from "Your Profile" > "Your Listings"
// Deletes individual property based on id
export const DELETE = async (request, { params }) => {
	// N.B. second argument, destructuring params from the url

	/**
	 * Need to match user/session to property owner - since only they are allowed to delete a property
	 */
	try {
		await connectDB();

		const { id: propertyId } = await params;

		// Access the logged in user
		const sessionUser = await getSessionUser();

		if (!sessionUser || !sessionUser.userId) {
			return new Response('User ID is required', { status: 401 }); // 401 = unauthorised
		}

		const { userId } = sessionUser;

		// The Property model has a findById method which allows you to specify the _id of a property you want to find
		const property = await Property.findById(propertyId);

		if (!property)
			return new Response('Property not found', { status: 404 }); // 404 = Not found

		// Verify ownership
		if (property.owner.toString() !== userId) {
			return new Response('Unauthorised', { status: 401 });
		}

		// Proceed with deletion
		await property.deleteOne();

		return new Response('Property deleted', { status: 200 });
	} catch (error) {
		console.log('### api/properties/:id DELETE error:: e=', error);
		return new Response('Something went wrong', { status: 500 }); // 500 = Internal Server Error
	}
};

// For editing a specific property from "Your Profile" > "Your Listings"
// PUT api/properties/:id
export const PUT = async (request, { params }) => {
	try {
		await connectDB();

		// Retrieve the logged in user's id
		const sessionUser = await getSessionUser();

		if (!sessionUser || !sessionUser.userId) {
			return new Response('User ID is required', { status: 401 });
		}

		const { id } = await params; // Get property's id, available as "id" because that's how the folder in the api is called  i.e. "[id]".
		// If the folder was called [propertyid] then we'd be retrieving the propertyid prop from the params
		const { userId } = sessionUser;

		/**
		 * Parse the form data, ready to send to the DB
		 */
		const formData = await request.formData();

		// Access all values from amenities and images
		const amenities = formData.getAll('amenities'); // retrieves all values from an array

		// Get property to update
		const existingProperty = await Property.findById(id);

		if (!existingProperty) {
			return new Response('Property does not exist', { status: 404 });
		}

		// Verify ownership
		if (existingProperty.owner.toString() !== userId) {
			return new Response('Unauthorised', { status: 401 });
		}

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
		};

		// console.log('### propertyData:: =', propertyData);

		// Update property in DB
		const updatedProperty = await Property.findByIdAndUpdate(
			id,
			propertyData
		);

		return new Response(JSON.stringify(updatedProperty), {
			status: 200,
		});
	} catch (error) {
		console.log('### api/properties/:id PUT error:: e=', error);
		return new Response('Failed to update property', { status: 500 });
	}
};
