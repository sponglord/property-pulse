const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

// Fetch all properties from the db
async function fetchProperties() {
	try {
		// Handle the case where the domain is not available yet
		if (!apiDomain) {
			return [];
		}

		// Because we are doing this from the server we have to include the domain
		// Note: 2nd, 'cache', param is for when we are making a request from a server
		// - will ensure properties just added in the "Add Property" page will immediatley show up in the Properties overview page
		const res = await fetch(`${apiDomain}/properties`, {
			cache: 'no-store',
		});

		if (!res.ok) {
			throw new Error('Failed to fetch data');
		}

		return res.json();
	} catch (error) {
		console.log('### fetchProperties:: Data fetch error:: error=', error);
		return [];
	}
}

// Fetch single property
async function fetchProperty(id) {
	try {
		// Handle the case where the domain is not available yet
		if (!apiDomain) {
			return null;
		}

		const res = await fetch(`${apiDomain}/properties/${id}`);

		if (!res.ok) {
			throw new Error('Failed to fetch data');
		}

		return res.json();
	} catch (error) {
		console.log('### fetchProperty :: Data fetch error:: error=', error);
		return null;
	}
}

export { fetchProperties, fetchProperty };
