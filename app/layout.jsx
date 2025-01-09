// The layout file represents the main entry point to our application as far as our folder & file struture goes
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
