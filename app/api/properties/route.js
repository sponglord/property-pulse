import connectDB from '@/config/database';
import Property from '@/models/Property';

// GET api/properties
export const GET = async (request) => {
	// For testing the route...
	// Going to http://localhost:5040/api/properties will print "Hello world" to the screen
	/* try {
        return new Response(JSON.stringify({ message: 'Hello world' }), { status: 200 });
    } catch (error) {
        console.log('### GET error:: e=', error);
        return new Response('Something went wrong', { status: 500 });
    } */

	try {
		// Now, going to http://localhost:5040/api/properties OR, within a comp, doing a fetch to this url
		// will retrieve the properties data from the db

		await connectDB();

		// The Property model has a find method which takes options on how you want to retieve your data...
		const properties = await Property.find({}); // ...an empty object means we will retrieve all

		/**
		 * What's happening...
		 *  - Property, being a model built with a Mongoose Schema, when it's "find" method is called will
		 *    query the database we've connected to and retrieve all the objects that match that schema
		 */

		return new Response(JSON.stringify(properties), { status: 200 });
	} catch (error) {
		console.log('### GET error:: e=', error);
		return new Response('Something went wrong', { status: 500 });
	}
};

// POST api/properties
export const POST = async (request) => {
	// See the attributes on the <form> element in /components/PropertyAddForm.jsx - for how this route is called

	try {
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
			images,
		};

		// console.log('### propertyData:: =', propertyData);

		return new Response(JSON.stringify({ message: 'success' }), {
			status: 200,
		});
	} catch (error) {
		console.log('### POST error:: e=', error);
		return new Response('Failed to add property', { status: 500 });
	}
};
