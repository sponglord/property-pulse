// This is a React component that is *rendered on the server*

// The reason this shows up as the home page is 'cos this file is directly in the app folder and we have called the file 'page'
// This is file based routing in action

// This page contains an example of doing navigation with a Link component c.f. using React's Router
// (You can see Router in action in the file: [id] > page.jsx)

import Link from "next/link";

const HomePage = () => {
  return (
    <div>
      <h1 className="text-3xl">Welcome</h1>
      {/* Avoid doing a full reload when the user clicks the link by using a Link comp rather than the <a> tag */}
      <Link href="/properties">Show Properties</Link>
    </div>
  );
};
export default HomePage;
