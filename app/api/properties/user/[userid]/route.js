import connectDB from '@/config/database';
import Property from '@/models/Property';

// GET api/properties/user/:userid
export const GET = async (request, { params }) => {
	// For testing the route - go to http://localhost:5040/api/properties/user/[user id pulled from the DB]

	// Note: We extract "userid" from params because that's what the folder containing this route is called
	// If we'd just named the folder "id" then we'd be extracting "id" from params
	const { userid } = await params;

	if (!userid) {
		return new Response('User ID is required', { status: 400 });
	}

	try {
		await connectDB();

		// The Property model has a find method which takes options on how you want to retrieve your data...
		// ...here we just want the properties that match that user's id
		const properties = await Property.find({ owner: userid });

		return new Response(JSON.stringify(properties), { status: 200 });
	} catch (error) {
		console.log('### /properties/user/:userid GET error:: e=', error);
		return new Response('Something went wrong', { status: 500 });
	}
};
