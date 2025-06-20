// A place to share things across multiple components

// To use the context we need to uses the provider in our layout

'use client';

import { createContext, useContext, useState } from 'react';

// Create context
const GlobalContext = createContext();

// Create a provider to provide the context to the rest of the application
export function GlobalProvider({ children }) {
	// Any state that we want to be global goes here
	const [unreadCount, setUnreadCount] = useState(0); // moved from UnreadMessageCount

	return (
		<GlobalContext.Provider value={{ unreadCount, setUnreadCount }}>
			{children}
		</GlobalContext.Provider>
	);
}

// Create a custom hook to access context
export function useGlobalContext() {
	return useContext(GlobalContext);
}
