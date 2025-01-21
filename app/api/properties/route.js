import connectDB from '@/config/database';
// import Property from '@/models/Property';

// GET api/properties
export const GET = async (request) => {
    // Going to http://localhost:5040/api/properties will print "Hello world" to the screen
    /* try {
        return new Response('Hello world', { status: 200 });
    } catch (error) {
        console.log('### GET error:: e=', error);
        return new Response('Something went wrong', { status: 500 });
    } */

    try {
        await connectDB();

        // The Property model has a find method which takes options on how you want to retieve your data
        // const properties = await Property.find({}); // An empty object means we will retrieve all

        return new Response(JSON.stringify({ message: 'Hello world' }), { status: 200 });
    } catch (error) {
        console.log('### GET error:: e=', error);
        return new Response('Something went wrong', { status: 500 });
    }
};
