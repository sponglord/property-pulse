## Description

This is the seventh phase of a project originally bootstrapped with [`create-next-app`].

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
-   Uses Mapbox and Google Geocoding to add mapping functionality for an address
-   So we add the `mapbox-gl` & `react-map-gl` packages (the latter provides an API for Mapbox); as well as the `react-geocode` package
-   The Sidebar on the individual property page has also been cleaned up - the buttons and contact form broken out into separate components - so we now have buttons to Bookmark and Share a property
-   A new API route has been added `app/api/bookmarks/route.js`, allowing a user to add a property to their bookmarks array in the DB (NOTE: a User object has a bookmarks array)
-   The "Saved Properties" menu item in the User dropdown (top RHS) now routes to a page where we display the properties the user has bookmarked
-   Added `react-share` package to add Social media share buttons to a property's page

### Main Additions since phase 6:

-   `/Components/PropertyMap.jsx` - uses `Map` & `Marker` from `react-map-gl` to display a map/pin based on coords retrieved using `setDefaults` & `fromAddress` from `react-geocode`
-   `/Components/ShareButtons.jsx` - displays social media share buttons (Facebook, Twitter, Whatsapp, Email)
-   `/Components/PropertyContactForm.jsx` component added, currently just an inert form
-   `app/api/bookmarks/route.js` - adds a property if not already bookmarked, otherwise removes the bookmark
-   `/Components/BookmarkButton.jsx` added. Has a `handleClick` function which calls the above route to set/unset a bookmark
-   `app/api/bookmarks/check/route.js` is a route that allows the `BookmarkButton` component to check, on page load, whether a property is bookmarked
-   `app/api/bookmarks/route.js` also has a GET route to retrieve properties from the DB based on the user's bookmarks
-   `app/properties/saved/page.jsx` fetches bookmarked properties from `/api/bookmarks` and displays a `PropertyCard` for each one

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
