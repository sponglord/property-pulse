export { default } from 'next-auth/middleware';

export const config = {
	/**
	 * Match any urls we want to protect.
	 * Without this, logging in (which then gives you access to the 'Add Property" page) & then logging out
	 * - you would still be able to access http://localhost:5040/properties/add
	 * - and http://localhost:5040/properties/679cde4fdbedf83845ffca76/edit
	 *
	 * With this, attempting to access any of these urls will lead you to a Google "sign in" button
	 */
	matcher: [
		'/properties/add',
		'/profile',
		'/properties/saved',
		'/messages',
		'/properties/:id/edit', // If you log out whilst in Edit page you should be made to sign in
	],
};
