## Description

This is the fifth phase of a project originally bootstrapped with [`create-next-app`].

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
-   In this phase we add a form that will allow the user to add a property to the database
-   We also add a new POST route that parses the submitted form data
-   The route also retrieves the User from the session so we can include them as the owner when we push to the DB
-   Image upload capabilities are provided using Cloudinary (a cloud based image service)
-   The PropertyCard (as seen on the Home and Properties page) can now display an image loaded from Cloudinary
-   The page for an individual property now shows all the images for that property (as loaded from Cloudinary)
    These are visible in the PropertyHeaderImage comp as well as in a dynamic grid at the bottom of the page

### Main Additions since phase 4:

-   `/components/PropertyAddForm.jsx` - contains a form with a submitting action, and change handlers for all its fields
-   `app/api/properties/route.js` - now has a POST function that allows you to POST to the route `/api/properties`
    The route/function then parses the submitted data (about the newly added property) from the form. It also uploads the image(s) to Cloudinary and stores the returned urls in the form data's images array before adding the new property to the DB.
-   This route also uses a new util, `utils/getSessionUser.js`, which uses `getServerSession` to retrieve the User
-   Created a `/components/PropertyImages.jsx` comp to display images in a dynamic grid

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
