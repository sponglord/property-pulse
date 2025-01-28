import { authOptions } from '@/utils/authOptions';
import { getServerSession } from 'next-auth/next';

/**
 * Util that allows any api route to access the logged in user
 */
export const getSessionUser = async () => {
	try {
		const session = await getServerSession(authOptions);

		// console.log('### session:: =', session);
		/**
		 * session = {user:, name:, email:, image:, id:}
		 */

		if (!session || !session.user) {
			return null;
		}

		return {
			user: session.user,
			userId: session.user.id, // We have previously written the user.id to the session in the session callback in authOptions.js
		};
	} catch (error) {
		console.error('### getSessionUser:: error=', error);
		return null;
	}
};
