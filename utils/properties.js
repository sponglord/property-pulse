import connectDB from '@/config/database';
import Property from '@/models/Property';

export async function getFeaturedProperties() {
	// await connectDB();

	// const properties = await Property.find({
	// 	is_featured: true,
	// }).lean();

	const properties = await findPropertiesByQueryObject({
		is_featured: true,
	});

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

export async function getPropertyById(id) {
	await connectDB();

	// The Property model has a findById method which allows you to specify the _id (db-added key) of a property you want to find
	const property = await Property.findById(id);

	return property;
}

export async function updatePropertyById(id, propertyData) {
	await connectDB();

	const updatedProperty = await Property.findByIdAndUpdate(id, propertyData);

	return updatedProperty;
}

export async function findPropertiesByQueryObject(queryObject) {
	await connectDB();

	const properties = await Property.find(queryObject);

	return properties;
}
