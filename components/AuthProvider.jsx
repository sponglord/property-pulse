'use client';

/**
 * The SessionProvider has to be in a Client component, and ince the SessionProvider needs to be wrapped round all
 * our content (in layout.jsx), and we don't want to make layout.jsx a Client component, we create this component
 * which can then be added to layout.jsx
 */
import { SessionProvider } from 'next-auth/react';

const AuthProvider = ({ children }) => {
	return <SessionProvider>{children}</SessionProvider>;
};
export default AuthProvider;
