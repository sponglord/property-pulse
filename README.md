## Description

This is the tenth phase of a project originally bootstrapped with [`create-next-app`].

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
-
-   Phase 5:
-   There is a form that will allow the user to add a new property to the database
-   Image upload capabilities are provided using Cloudinary (a cloud based image service)
-   The components (PropertyCard, PropertyHeaderImage & PropertyImages) now all load their images from Cloudinary
-
-   Phase 6:
-   The user profile page displays the users image, name, email and properties; and allows the user to edit and delete a property
-   App now has full CRUD (Create, Read, Update, Delete)
-
-   Phase 7:
-   Uses Mapbox and Google Geocoding to add mapping functionality for an address.
-   Added bookmarking functionality, and a "Saved Properties" page to display and share these bookmarks
-
-   Phase 8:
-   Created separate Search component (`PropertySearchForm`), which submits to a Search Results page that
-   calls an API route which searches for location (city, street, state, zipcode), property type, name or description
-   and displays the results
-
-   Phase 9:
-   Adding the messaging functionality: the ability to save & fetch messages to/from the DB
-   Messages are ordered with "new" i.e. unread ones, at the top. Once a message is displayed it can be marked as read/unread, & can also be deleted
-
-   Phase 10:
-   Use React ContextAPI to give us global state. This will allow an action in the `Message` component ("marked as read" or "delete") to update a state, that the `UnreadMessageCount` component in the `Navbar` can read, in order to update the icon showing the number of unread messages without a page refresh. (A page refresh works because it re-queries the database).
    i.e. as they are marked "read", or deleted, the count will update in the Navbar,

### Main Additions since phase 9:

-   Added `context/GlobalContext.js` which creates a global context, a provider, and a custom hook to access the context
-   `app/layout.jsx` uses the provider created in `GlobalContext.js` to wrap the application
-   `components/UnreadMessageCount.jsx` imports the custom hook created in `GlobalContext.js` to access the `unreadCount, setUnreadCount` state that it previously created & maintained itself. (It uses `setUnreadCount`) to initially set global state based on values retirieved from the DB)
-   `components/Message.jsx` also imports the custom hook created in `GlobalContext.js` to access the `setUnreadCount` global state, so that when a message is marked as read/unread - so the `UnreadMessageCount` comp will be updated without a page refresh

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
