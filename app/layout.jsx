// 1. The layout file represents the main entry point to our application as far as our folder & file struture goes
// It is a React component that is *rendered on the server*

import "@/assets/styles/globals.css";

export const metadata = {
  title: "PropertyPulse | Find the perfect rental",
  description: "Find your dream rental property",
  keywords: "rental, find rentals, find properties",
};

// 2. The pages we create, and how they show in the layout, comes through the children property
const MainLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div>{children}</div>
      </body>
    </html>
  );
};
export default MainLayout;
