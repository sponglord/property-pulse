import connectDB from '@/config/database';
import Property from '@/models/Property';

// GET /api/properties/search
export const GET = async (request) => {
	try {
		await connectDB();

		// Extract searchParams from url
		const { searchParams } = new URL(request.url);
		const location = searchParams.get('location');
		const propertyType = searchParams.get('propertyType');

		// Test with: http://localhost:5040/api/properties/search?location=Boston&propertyType=All
		// console.log('### search route :: location, propertyType=',location,propertyType);
		// return new Response(JSON.stringify({ message: 'Success' }), { status: 200});

		/**
		 * We want to match the location param (be it whole: "boston", or, part: "bost")
		 * to any location fields (city, state, street, zipcode)
		 * but also, to property name or description
		 */

		const locationPattern = new RegExp(location, 'i');

		// Match location pattern against DB fields
		// (This is an object we will use to make a DB query)
		let query = {
			$or: [
				{ name: locationPattern },
				{ description: locationPattern },
				{ 'location.street': locationPattern },
				{ 'location.city': locationPattern },
				{ 'location.state': locationPattern },
				{ 'location.zipcode': locationPattern },
			],
		};

		// Only check for property if it is not 'All'
		if (propertyType && propertyType !== 'All') {
			const typePattern = new RegExp(propertyType, 'i');
			query.type = typePattern;
		}

		// Retrieve all props from DB, based on query
		const properties = await Property.find(query);

		return new Response(JSON.stringify(properties), {
			status: 200,
		});
	} catch (error) {
		console.log('### /api/properties/search GET error:: e=', error);
		return new Response('Something went wrong', { status: 500 });
	}
};
