import connectDB from '@/config/database';
import Property from '@/models/Property';
import { getSessionUser } from '@/utils/getSessionUser';

// GET api/properties/:[id]
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

		return new Response(JSON.stringify(property), { status: 200 });
	} catch (error) {
		console.log('### GET error:: e=', error);
		return new Response('Something went wrong', { status: 500 });
	}
};

// DELETE api/properties/:[id]
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
			return new Response('unauthorised', { status: 401 });
		}

		// Proceed with deletion
		await property.deleteOne();

		return new Response('Property deleted', { status: 200 });
	} catch (error) {
		console.log('### GET error:: e=', error);
		return new Response('Something went wrong', { status: 500 }); // 500 = Internal Server Error
	}
};
