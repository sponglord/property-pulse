import connectDB from '@/config/database';
import Property from '@/models/Property';

// GET api/properties/:[id]

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

		return new Response(JSON.stringify(property), { status: 200 });
	} catch (error) {
		console.log('### GET error:: e=', error);
		return new Response('Something went wrong', { status: 500 });
	}
};
