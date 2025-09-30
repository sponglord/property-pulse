## Description

This is the ninth phase of a project originally bootstrapped with [`create-next-app`].

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
-   Made the `PropertyContactForm` client-rendered so we can fill the form inputs with values from state; and made the
-   form submittable, if the user is logged in
-   Added an api route so we can submit the contact form, to send the message, and write it to the DB.
-   This route also allows us to GET the messages from the DB
-   Once a message is displayed it can be marked as read/unread, via the button in the `Message` comp, which uses a new api route, to update the message's "read" property in the DB
-   Messages can also be deleted, via the button in the `Message` comp
-   Messages are ordered with "new" i.e. unread ones, at the top
-   The Navbar header shows the number of new messages for the logged in user via a new `UnreadMessageCount` component

### Main Additions since phase 8:

-   created new model, `Message.js`
-   `components/PropertyContactForm.jsx` form can be submitted
-   created new route, `app/api/messages/route.js` with POST route for storing messages and GET route for fetching them
-   created new Messages page, `app/messages/page.jsx`
-   created new Messages component, `components/Messages.jsx` to display multiple messages (multiple instances of `<Message/>`)
-   created new Message component, `components/Message.jsx` to display a single message
-   create new route, `app/api/messages/[id]/route.js` to update the "read" property of a specific message (with a PUT method)
-   and to delete a message (with a DELETE method)
-   created new api route, `app/api/messages/unread-count`, to retieve the number of unread messages

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
