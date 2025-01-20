import Hero from "@/components/Hero";
import InfoBoxes from "@/components/InfoBoxes";
import HomeProperties from "@/components/HomeProperties";
// import connectDB from "@/config/database";

const HomePage = async () => {
  /**
   * You can connect to a DB from any server rendered component - however in our particular application
   * we’re creating RESTful endpoints - so API routes that will run functions to connect to the DB
   */
  // await connectDB(); // test db connection

  return (
    <div>
      <Hero />
      <InfoBoxes />
      <HomeProperties />
    </div>
  );
};
export default HomePage;
