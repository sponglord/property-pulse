## Description

This is the sixth phase of a project originally bootstrapped with [`create-next-app`].

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
-   The user profile page displays the users image, name & email
-   It also displays the listings for that user: the user's id is added to a url so that the listings for any user can be retrieved
    by anyone who knows that users id. This is a design choice and is in contrast to the other option whereby a route,
    /api/properties/user, is added which gets the user from the session - which would mean only _that_ user can get the listings
-   Properties can be deleted or edited
-   Delete/edit confirmations are provided through React-Toastify
-   App now has full CRUD (Create, Read, Update, Delete)

### Main Additions since phase 5:

-   `app/profile/page.jsx` - shows user info and their property listings
-   `app/api/properties/user/[userid]/route.js` - is a route added to extract properties from the DB based on a user id
-   `app/api/properties/[id]/route.js` - added DELETE route, called from `app/profile/page.jsx`, which allows a user to delete a property
    from their profile page
-   `app/layout.jsx` - adds the React ToastContainer to the DOM
-   `app/properties/[id]/edit/page.jsx` & `components/PropertyEditForm.jsx` - displays the property details and allows you to edit them
-   `app/api/properties/[id]/route.js` - added PUT route, called from `components/PropertyEditForm.jsx`, which allows a user to update
    a property's details

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
