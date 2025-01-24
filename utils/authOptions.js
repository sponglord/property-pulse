import connectDB from '@/config/database';
import User from '@/models/User';
import GoogleProvider from 'next-auth/providers/google';

/**
 * see: https://next-auth.js.org/providers/google
 */

export const authOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			// When we click on Login - user can choose a Google account
			// Without this authorization object - you'll choose an account first time, but second & sub. logins will use the same account
			authorization: {
				params: {
					prompt: 'consent',
					access_type: 'offline',
					response_type: 'code',
				},
			},
		}),
	],
	callbacks: {
		// Invoked on successful sign in
		async signIn({ profile }) {
			// 1. Connect to DB
			await connectDB();
			// 2. Check if user exists. (A successful sign on will give us access to the email, (user)name, image, id from the Google account)
			const userExists = await User.findOne({ email: profile.email });
			// 3. If not, add user to Db
			if (!userExists) {
				// Truncate user name if too long
				const username = profile.name.slice(0, 20);

				// Save user to DB, using the model's create method
				await User.create({
					email: profile.email,
					username,
					image: profile.picture,
				});
			}
			// 4. Return true to allow sign in
			return true;
		},
		// Modifies (current, active, server) session object
		async session({ session }) {
			// 1. Get user from DB
			const user = await User.findOne({ email: session.user.email });
			// 2. Assign the user id to the session
			session.user.id = user._id.toString();
			// 3. Return session
			return session;
		},
	},
};
