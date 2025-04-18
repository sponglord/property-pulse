import connectDB from '@/config/database';
import Message from '@/models/Message';
import { getSessionUser } from '@/utils/getSessionUser';

export const dynamic = 'force-dynamic'; // see comment in app/api/bookmarks/route.js

// POST /api/messages
export const POST = async (request) => {
	try {
		await connectDB();

		// We can get the values from the request body
		const { name, email, phone, message, property, recipient } =
			await request.json();

		const sessionUser = await getSessionUser();

		if (!sessionUser || !sessionUser.user) {
			return new Response(
				JSON.stringify({
					message: 'You must be logged in to send a message',
				}),
				{ status: 401 } // unauthorised
			);
		}

		const { user } = sessionUser;

		// Cannot send message to self
		if (user.id === recipient) {
			return new Response(
				JSON.stringify({
					message: 'You cannot send a message to yourself',
				}),
				{ status: 400 } // Bad request
			);
		}

		// Now make a message model to send to the DB
		const newMessage = new Message({
			sender: user.id,
			recipient,
			property,
			name,
			email,
			phone,
			body: message,
		});

		// Save it to DB
		await newMessage.save();

		return new Response(
			JSON.stringify({
				message: 'Message sent',
			}),
			{ status: 200 }
		);
	} catch (error) {
		console.log('### /messages POST error:: e=', error);
		return new Response('Something went wrong', { status: 500 }); // Internal server error
	}
};

// GET /api/messages
export const GET = async () => {
	try {
		await connectDB();

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

		// Get user's messages
		const messages = await Message.find({ recipient: userId })
			// get the sender's name and property's title because there's a relationship between the messages and the sender (user)
			// and the messages and the property
			.populate('sender', 'username')
			.populate('property', 'name');

		return new Response(JSON.stringify(messages), { status: 200 });
	} catch (error) {
		console.log('### /messages GET error:: e=', error);
		return new Response('Something went wrong', { status: 500 });
	}
};
