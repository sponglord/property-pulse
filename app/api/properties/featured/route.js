import connectDB from '@/config/database';
import Property from '@/models/Property';

// GET api/properties/featured/
// Retrieve properties for which "is_featured: true"
export const GET = async (request) => {
	try {
		await connectDB();

		// Retrieve a the featured properties
		const properties = await Property.find({ is_featured: true });

		/**
		 * What's happening...
		 *  - Property, being a model built with a Mongoose Schema, when it's "find" method is called will
		 *    query the database we've connected to and retrieve all the objects that match that schema
		 */

		return new Response(JSON.stringify(properties), { status: 200 });
	} catch (error) {
		console.log('### /properties/featured/ GET error:: e=', error);
		return new Response('Something went wrong', { status: 500 });
	}
};
