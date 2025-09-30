## Description

This is the twelfth phase of a project originally bootstrapped with [`create-next-app`].

-   It is created from a course at: https://learning.oreilly.com/course/next-js-14-from/9781836207979/
-   The repo for the course files is: https://github.com/bradtraversy/property-pulse-nextjs

The project is a property app for finding rentable properties and also to add properties that are for rent

-   Phase 1 (probably a combination of "Chap 1, Environment Setup" & "Chap 2, New Project & Folder Structure"):
-   Bare bones: project bootstrap
-
-   Phase 2 (probably starts at "Chap 2, Layout, Homepage & Metadata"):
-   The project has a Home page with top nav bar, footer and main content; and which allows you, via fixed file-routing
-   to navigate to a page where properties are displayed
-   From here dynamic routing \[id\] allows you to got to a page for a specific property
-
-   Phase 3 ("Chap 3, Database, API Routes & Property Components"):
-   Property data is loaded from a MongoDB database
-
-   Phase 4 ("Chap 4, Next Auth, Sessions & Google Provider"):
-   Login routing & authentication is supplied by `next-auth` using Google as an authentication provider
-
-   Phase 5 ("Chap 5, Create Properties & Cloudinary Integration"):
-   There is a form that will allow the user to add a new property to the database
-   Image upload capabilities are provided using Cloudinary (a cloud based image service)
-   The components (PropertyCard, PropertyHeaderImage & PropertyImages) now all load their images from Cloudinary
-
-   Phase 6 ("Chap 6, Profile & Manage Properties"):
-   The user profile page displays the users image, name, email and properties; and allows the user to edit and delete a property
-   App now has full CRUD (Create, Read, Update, Delete)
-
-   Phase 7 ("Chap 7, Map, Bookmarks & Sharing"):
-   Uses Mapbox and Google Geocoding to add mapping functionality for an address.
-   Added bookmarking functionality, and a "Saved Properties" page to display and share these bookmarks
-
-   Phase 8 ("Chap 8, Property Search"):
-   Created separate Search component (`PropertySearchForm`), which submits to a Search Results page that
-   calls an API route which searches for location (city, street, state, zipcode), property type, name or description
-   and displays the results
-
-   Phase 9 (starts at "Chap 9, Messaging System"):
-   Adding the messaging functionality: the ability to save & fetch messages to/from the DB
-   Messages are ordered with "new" i.e. unread ones, at the top. Once a message is displayed it can be marked as read/unread, & can also be deleted
-
-   Phase 10 (starts at "Chap 9, Global Context For Unread Messages"):
-   Use React ContextAPI to give us global state for the unread message count in the Navbar (accessed by the `UnreadMessageCount` and `Message` components). This allows the count to update with out a page refresh to re-query the DB
-
-   Phase 11 (starts at "Chap 10, Properties Client Component Refactor"):
-   Adding pagination for when we want to limit how many properties appear on a page. Ans a pagination component to allow us to move through the properties a page at a time
-
-   Phase 12 (starts at "Chap 10, Photoswipe Lightbox"):
-   Creating a lightbox effect on the page for a property, using Photoswipe & react-photoswipe-gallery, to scroll through the uploaded images for that particular property

### Main Additions since phase 11:

-   `app/layout.jsx` imports the photoswipe css
-   `components/PropertyImages.jsx` (which creates the dynamic grid for a particular property's uploaded images) imports `Gallery` & `Item` from react-photoswipe-gallery and wraps the whole section in the `Gallery` component, and the individual images in the `Item` component.

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
