import connectDB from '@/config/database';
import Message from '@/models/Message';
import { getSessionUser } from '@/utils/getSessionUser';

export const dynamic = 'force-dynamic'; // see comment in app/api/bookmarks/route.js

// A route to get the number of unread messages

// GET /api/messages/unread-count
export const GET = async (request) => {
	try {
		await connectDB();

		// Get user id from the session
		const sessionUser = await getSessionUser();

		if (!sessionUser || !sessionUser.user) {
			return new Response(
				JSON.stringify({
					message: 'You must be logged in to fetch messages',
				}),
				{ status: 401 } // unauthorised
			);
		}

		const { userId } = sessionUser;

		// Count the messages for this user - passing in the condition i.e. just want unread messages for this recipient/user)
		const count = await Message.countDocuments({
			recipient: userId,
			read: false,
		});

		return new Response(JSON.stringify(count), {
			status: 200,
		});
	} catch (error) {
		console.log('### api/messages/unread-count Get error:: e=', error);
		return new Response('Failed retrieve message count', { status: 500 });
	}
};
