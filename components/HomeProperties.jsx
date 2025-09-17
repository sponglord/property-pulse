import PropertyCard from '@/components/PropertyCard';
import Link from 'next/link';
// import { fetchProperties } from '@/utils/requests';
import connectDB from '@/config/database';
import Property from '@/models/Property';

const HomeProperties = async () => {
	// This is a server component - so we are "allowed" to call this function which will make a db call
	// const data = await fetchProperties();

	// const recentProperties = data.properties
	// 	.sort(() => Math.random() - Math.random()) // N.B. trick to randomise an array
	// 	.slice(0, 3);

	// Avoid circular dependencies on Vercel and access the DB directly
	await connectDB();

	// Get the 3 latest properties
	const recentProperties = await Property.find({})
		.sort({ createdAt: -1 })
		.limit(3)
		.lean();
	// --

	return (
		<>
			<section className='px-4 py-6'>
				<div className='container-xl lg:container m-auto'>
					<h2 className='text-3xl font-bold text-blue-500 mb-6 text-center'>
						Recent Properties
					</h2>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
						{recentProperties === 0 ? (
							<p>No Properties Found</p>
						) : (
							recentProperties.map((property) => (
								<PropertyCard
									key={property._id}
									property={property}
								/>
							))
						)}
					</div>
				</div>
			</section>
			<section className='m-auto max-w-lg my-10 px-6'>
				<Link
					href='/properties'
					className='block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700'
				>
					View All Properties
				</Link>
			</section>
		</>
	);
};
export default HomeProperties;
