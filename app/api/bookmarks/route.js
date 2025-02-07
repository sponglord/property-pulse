import connectDB from '@/config/database';
import User from '@/models/User';
import Property from '@/models/Property';
import { getSessionUser } from '@/utils/getSessionUser';

/**
 * This route will work fine locally but when pushing to Vercel it might have trouble using SSR with this route
 *  re. https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
 * This can be fixed with the following line:
 */
export const dynamic = 'force-dynamic';

// GET /api/bookmarks
export const GET = async () => {
	try {
		await connectDB();

		const sessionUser = await getSessionUser();

		if (!sessionUser || !sessionUser.userId) {
			return new Response('User ID is required', { status: 401 });
		}

		const { userId } = sessionUser;

		// Find user in DB
		const user = await User.findOne({ _id: userId }); // You could also use User.findById()

		// Get user's bookmarked properties
		const bookmarks = await Property.find({
			// NOTE: we're looking in the user's bookmarks to see if there's a property that matches the _id of the property
			_id: { $in: user.bookmarks },
		});

		return new Response(JSON.stringify(bookmarks), { status: 200 });
	} catch (error) {
		console.log('### /bookmarks GET error:: e=', error);
		return new Response('Something went wrong', { status: 500 });
	}
};

// POST api/bookmarks
export const POST = async (request) => {
	try {
		await connectDB();

		// We can get the property id from the request body (since it's not going to be sent in the url)
		const { propertyId } = await request.json();

		// Access the logged in user
		const sessionUser = await getSessionUser();

		if (!sessionUser || !sessionUser.userId) {
			return new Response('User ID is required', { status: 401 });
		}

		const { userId } = sessionUser;

		// Find user in DB
		const user = await User.findOne({ _id: userId }); // You could also use User.findById()

		// Check if property is already bookmarked;
		let isBookmarked = user.bookmarks.includes(propertyId);

		let message;

		if (isBookmarked) {
			// If already bookmarked - remove it
			user.bookmarks.pull(propertyId); // Note the user of the 'pull' function
			message = 'Bookmark removed sucessfully';
			isBookmarked = false;
		} else {
			// If not bookmarked - add it
			user.bookmarks.push(propertyId);
			message = 'Bookmark added sucessfully';
			isBookmarked = true;
		}

		// Update user in DB
		await user.save();

		return new Response(JSON.stringify({ message, isBookmarked }), {
			status: 200,
		});
	} catch (error) {
		console.log('### /bookmarks PUSH error:: e=', error);
		return new Response('Something went wrong', { status: 500 });
	}
};
