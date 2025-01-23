import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            // When we click on Login - user can choose a Google account
            // Without this authorization object - you'll choose an account first time, but second & sub. logins will use the same account
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),
    ],
    callbacks: {
        // Invoked on successful sign in
        async signIn({ profile }) {
            // 1. Connect to DB
            // 2. Check if user exists
            // 3. If not, add user to Db
            // 4. Return true to allow sign in
        },
        // Modifies session object
        async session({ session }) {
            // 1. Get user from DB
            // 2. Assign the user id to the session
            // 3. Return session
        },
    },
};
