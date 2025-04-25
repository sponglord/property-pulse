import connectDB from '@/config/database';
import Message from '@/models/Message';
import { getSessionUser } from '@/utils/getSessionUser';

export const dynamic = 'force-dynamic'; // see comment in app/api/bookmarks/route.js

// A route to update a specific message

// PUT /api/mesaages/:id
export const PUT = async (request, { params }) => {
	try {
		await connectDB();

		// Get message's id, available as "id" because that's how the folder in the api is called "[id]".
		// If the folder was called [messageid] then we'd be retrieving the messageid prop from the params
		const { id } = await params;

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

		// Find message by the id
		const message = await Message.findById(id);

		if (!message) {
			return new Response('Message not found', {
				status: 404,
			});
		}

		// Verify ownership - important to stop just anyone be able to update a message if they know the id
		if (message.recipient.toString() !== userId) {
			return new Response('Not authorised to update message', {
				status: 401,
			});
		}

		// Update message to read/unread depending on the current status
		message.read = !message.read;

		await message.save();

		console.log('### :: =JSON.stringify(message)', JSON.stringify(message));

		return new Response(JSON.stringify(message), {
			status: 200,
		});
	} catch (error) {
		console.log('### api/messages/:id PUT error:: e=', error);
		return new Response('Failed to update message', { status: 500 });
	}
};
