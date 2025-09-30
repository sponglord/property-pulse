## Description

This is the fourth phase of a project originally bootstrapped with [`create-next-app`].

-   It is created from a course at: https://learning.oreilly.com/course/next-js-14-from/9781836207979/
-   The repo for the course files is: https://github.com/bradtraversy/property-pulse-nextjs

The project is a property app for finding rentable properties and also to add properties that are for rent

-   Phase 1:
-   Bare bones: project bootstrap
-
-   Phase 2:
-   The project has a Home page with top nav bar, footer and main content; and which allows you, via fixed file-routing
-   to navigate to a page where properties are displayed
-   From here dynamic routing \[id\] allows you to got to a page for a specific property
-
-   Phase 3:
-   Property data is loaded from a MongoDB database
-
-   Phase 4:
-   Login routing & authentication is supplied by `next-auth` using Google as an authentication provider
-   A `SessionProvider` is added which allows us to attach the login buttons to the Google Provider;
    and gives us access to a session, once logged in
-   Once logged-in we save the User to the DB and save the User.id to the Session. This process uses the `User.js` model/Schema
-   The functionality to sign out is also added, along with route protection to prevent logged-out users from accessing forbidden urls

### Main Additions since phase 3:

-   `/utils/authOptions.js` - details & configures the authentication provider (Google)
-   `/app/api/[...nextauth]/route.js` - initialises `authOptions` and exposes a `handler`
-   This means that a visit to any url with http://localhost:5040/api/auth/... will get picked up by `next-auth`
    so, for instance, http://localhost:5040/api/auth/signin will show a "Sign in with Google button"
-   `/components/AuthProvider.jsx` - creates a `SessionProvider` which is wrapped round all our contents in `layout.jsx`
    and allows us to access `signIn` and `useSession` functions/hooks within the `NavBar`
-   `/components/NavBar.jsx` - attaches the "Login or Register" buttons to the Google Provider (for the sign-in process)
    and accesses the use, from the session, to get the profile image
-   `/utils/authOptions.js` - also populates some callbacks:
    -   `signIn` to check if a User exists &, if not, to add them to the DB
    -   `session` to save a User.id to the session object
-   `/models/User.js` - a `Model/Schema` (created using `Mongoose` & reflecting the structure of the User object in the database) that facilitates the previous step
-   `/middleware.js` - adds a 'matcher' array to protect routes once a user is logged out

## Getting Started

#### To save disk space there is only one copy of the static images used in this project, so...

-   copy the `images` folder from `__shared_images` to the `public` directory

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:5040](http://localhost:5040) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.
