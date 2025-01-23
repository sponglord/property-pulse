import { authOptions } from '@/utils/authOptions';
import NextAuth from 'next-auth';

/**
 * Anything in the URL after /auth will get picked up by Next-Auth
 * Going to http://localhost:5040/api/auth/signin will show a "Sign in with Google button"
 * And, if your Google credentials are correct in the .env file, clicking on that button will show you a screen
 * where you can choose an account to login to the PropertyPulse App we created at https://console.cloud.google.com
 */

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
