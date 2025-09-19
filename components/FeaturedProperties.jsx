import { getFeaturedProperties } from '@/utils/properties';
import FeaturedPropertyCard from './FeaturedPropertyCard';

const FeaturedProperties = async () => {
	// Deployment issue with circular dependencies on Vercel, namely, a Server Component makes a network request
	// to its own API route during the build process. This happens because this component is on the first, Home, page.
	// To avoid this issue - access the DB directly via this util
	const properties = await getFeaturedProperties();

	return (
		properties.length > 0 && (
			<section className='bg-blue-50 px-4 pt-6 pb-10'>
				<div className='container-xl lg:container m-auto'>
					<h2 className='text-3xl font-bold text-blue-500 mb-6 text-center'>
						Featured Properties
					</h2>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
						{properties.map((property) => {
							return (
								<FeaturedPropertyCard
									key={property._id}
									property={property}
								/>
							);
						})}
					</div>
				</div>
			</section>
		)
	);
};
export default FeaturedProperties;
