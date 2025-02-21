'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

/**
 * A page that will hit the '/api/properties/search' endpoint and show the results
 */
const SearchResultsPage = () => {
	// In a client rendered page we use useSearchParams to retrieve params from the url
	// c.f. const { searchParams } = new URL(request.url) which we would use in a route
	const searchParams = useSearchParams();

	const [properties, setProperties] = useState([]);
	const [loading, setLoading] = useState(true);

	const location = searchParams.get('location');
	const propertyType = searchParams.get('propertyType');

	useEffect(() => {
		const fetchSearchResults = async () => {
			try {
				const res = await fetch(
					`/api/properties/search?location=${location}&propertyType=${propertyType}`
				);

				if (res.status === 200) {
					const data = await res.json();
					setProperties(data);
					console.log('### search:: properties=', data);
				} else {
					setProperties([]);
				}
			} catch (error) {
				console.log(
					'### Something went wrong whilst searching:: error=',
					error
				);
			} finally {
				setLoading(false);
			}
		};

		fetchSearchResults();
	}, [location, propertyType]);

	return <div>SearchResults</div>;
};
export default SearchResultsPage;
