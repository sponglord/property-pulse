import connectDB from '@/config/database';
import Property from '@/models/Property';

// GET api/properties
export const GET = async (request) => {
    // For testing the route...
    // Going to http://localhost:5040/api/properties will print "Hello world" to the screen
    /* try {
        return new Response(JSON.stringify({ message: 'Hello world' }), { status: 200 });
    } catch (error) {
        console.log('### GET error:: e=', error);
        return new Response('Something went wrong', { status: 500 });
    } */

    try {
        // Now, going to http://localhost:5040/api/properties OR, within a comp, doing a fetch to this url
        // will retrieve the properties data from the db

        await connectDB();

        // The Property model has a find method which takes options on how you want to retieve your data...
        const properties = await Property.find({}); // ...an empty object means we will retrieve all

        /**
         * What's happening...
         *  - Property, being a model built with a Mongoose Schema, when it's "find" method is called will
         *    query the database we've connected to and retrieve all the objects that match that schema
         */

        return new Response(JSON.stringify(properties), { status: 200 });
    } catch (error) {
        console.log('### GET error:: e=', error);
        return new Response('Something went wrong', { status: 500 });
    }
};
