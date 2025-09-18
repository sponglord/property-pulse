import connectDB from '@/config/database';
import Property from '@/models/Property';

export async function getFeaturedProperties() {
	await connectDB();

	const properties = await Property.find({
		is_featured: true,
	}).lean();

	return properties;
}

export async function getRecentProperties(num = 3) {
	await connectDB();

	// Get the 3 latest properties
	const recentProperties = await Property.find({})
		.sort({ createdAt: -1 })
		.limit(num)
		.lean();

	return recentProperties;
}

// export async function getPropertyById() {}
