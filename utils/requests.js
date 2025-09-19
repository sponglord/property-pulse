const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

// Fetch single property
export async function fetchProperty(id) {
	try {
		// Handle the case where the domain is not available yet
		if (!apiDomain) {
			return null;
		}

		const res = await fetch(`${apiDomain}/properties/${id}`);

		if (!res.ok) {
			throw new Error('Failed to fetch data');
		}

		return await res.json();
	} catch (error) {
		console.log('### fetchProperty :: Data fetch error:: error=', error);
		return null;
	}
}
