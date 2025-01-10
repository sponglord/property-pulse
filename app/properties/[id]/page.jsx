// 1. Example of dynamic route - anything with url like http://localhost:5040/properties/123 will load *this* page

// 2. N.B. For a catch-all have a dir named [...id] containing a page.jsx - then any url like http://localhost:5040/properties/123/rooms
// or http://localhost:5040/properties/123/facilities or http://localhost:5040/properties/123/rooms/beds would load *that* page.jsx

// 3. Demo-ing use of React's Router (in Client rendered page) as way to navigate
"use client"; // see: https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns

// 4. Also demo-ing the useParams, useSearchParams & usePathname hooks from next/navigation

import {
  useRouter,
  useParams,
  useSearchParams,
  usePathname,
} from "next/navigation";
// Without "use client" at the top of the file you get the following error in the console:
// "You're importing a component that needs `useRouter`. This React hook only works in a client component.
//    To fix, mark the file (or its parent) with the `"use client"` directive.""

const PropertyPage = () => {
  console.log("hello");

  const router = useRouter();

  // With e.g. url: http://localhost:5040/properties/456?name=nick
  const { id } = useParams();
  const searchParams = useSearchParams();
  const name = searchParams.get("name");

  const pathname = usePathname();

  return (
    <div>
      <div>Individual PropertyPage</div>
      {/* The use of the onClick event also means this needs to be a Client component */}
      <button onClick={() => router.push("/")} className="bg-blue-500 p-2">
        Page {id}. {name}: Go Home (from {pathname})
      </button>
    </div>
  );
};
export default PropertyPage;
