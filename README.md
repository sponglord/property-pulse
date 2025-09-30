## Description

This is the third phase of a project originally bootstrapped with [`create-next-app`].

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
-   To this end Models/Schema have been created using Mongoose, and Next api routes defined, which combine to allow us
-   to make queries against the collection we have created using a MongoDB Atlas cloud database
-   These queries are made from both Server rendered components (app/properties/page.jsx)
-   and Client rendered components (app/properties/[id]/page.jsx)

### Main Additions since phase 2:

-   `/config/database.js` - exposes a `connectDB` function which makes the connection to the `mongoDB`
-   `/models/Property.js` - a `Model/Schema` created using `Mongoose` reflecting the structure of the objects in the database
-   `/app/api/properties/route.js` - a call to this route uses the `connectDB` function exposed by `database.js` & the `Property` model
    to retrieve a list of all the properties from the DB
-   `/app/api/properties/[id]/route.js` - uses the `connectDB` function and the `Property` model to retrieve a single property from the DB

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
