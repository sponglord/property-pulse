## Description

This is the eighth phase of a project originally bootstrapped with [`create-next-app`].

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
-   The Search component is also added to the Search results page itself, as well as the Properties page, so a user
-   can search from multiple places

### Main Additions since phase 7:

-   `components/PropertySearchForm.jsx` - enables the search fields (input & select) and uses `useRouter` to redirect
-   to the `search-results` page, adding query params to the url
-   `/app/properties/search-results/page.tsx` - hits the `/api/properties/search` endpoint (below) and shows the results
-   `app/api/properties/search/route.js` - performs regEx & DB query logic to match a location/propertyType to items in the DB

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
