## Description

This is an initial demo of a project originally bootstrapped with [`create-next-app`]

-   It is a simple project with a Home page and both fixed, and dynamic \[id]\, file-routing to subdirectories & pages.
-   It demos use of both `Link`, from `next/link`, for navigation (see Home page [`app/page.jsx`]) as well as `useRouter` from `next/navigation` within a Client rendered page (see `app/properties/[id]/page.jsx`).
-   It also demos the `useParams`, `useSearchParams` & `usePathname` hooks from `next/navigation` (see `app/properties/[id]/page.jsx`).

## Getting Started

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

If you go to the url [http://localhost:5040/properties/123?name=bill](http://localhost:5040/properties/123?name=bill) you will see the dynamic routing and Client rendered page in action
