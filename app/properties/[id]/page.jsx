'use client';

// Since this is a client rendered page the query to the database needs to be done using useEffect
import { useEffect, useState } from 'react';

import { useParams } from 'next/navigation';
import { fetchProperty } from '@/utils/requests';

import PropertyHeaderImage from '@/components/PropertyHeaderImage';
import PropertyImages from '@/components/PropertyImages';
import Link from 'next/link';
import PropertyDetails from '@/components/PropertyDetails';
import BookmarkButton from '@/components/BookmarkButton';
import Spinner from '@/components/Spinner';
import { FaArrowLeft } from 'react-icons/fa';
import ShareButtons from '@/components/ShareButtons';
import PropertyContactForm from '@/components/PropertyContactForm';

const PropertyPage = () => {
	const { id } = useParams();

	const [property, setProperty] = useState(null);
	// Since we are fetching from the client (c.f. server) you should also have a loading state
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// We can't make useEffect async - so we need to write another function
		const fetchPropertyData = async () => {
			if (!id) return;

			try {
				const property = await fetchProperty(id);
				setProperty(property);
			} catch (error) {
				console.error('Error fetching property:', error);
			} finally {
				setLoading(false); // Whatever happens - we want to reset the loading state
			}
		};

		if (property === null) {
			fetchPropertyData();
		}
	}, [id, property]); // Whenever the id or property change - fetch the new property object from the database

	// If proerty is not found and we're not in the process (db call) of looking for a property
	if (!property && !loading) {
		return (
			<h1 className='text-center text-2xl font-bold mt-10'>
				Property not found
			</h1>
		);
	}

	// We've finished loading and have retrieved a property
	return (
		<>
			{loading && <Spinner loading={loading} />}
			{!loading && property && (
				<>
					{/* Image */}
					<PropertyHeaderImage image={property.images[0]} />
					{/* Go back */}
					<section>
						<div className='container m-auto py-6 px-6'>
							<Link
								href='/properties'
								className='text-blue-500 hover:text-blue-600 flex items-center'
							>
								<FaArrowLeft className='fas fa-arrow-left mr-2' />
								Back to Properties
							</Link>
						</div>
					</section>
					{/* <!-- Property Info --> */}
					<section className='bg-blue-50'>
						<div className='container m-auto py-10 px-6'>
							<div className='grid grid-cols-1 md:grid-cols-70/30 w-full gap-6'>
								{/* <!-- PropertyDetails --> */}
								<PropertyDetails property={property} />

								{/* <!-- Sidebar --> */}
								<aside className='space-y-4'>
									<BookmarkButton property={property} />
									<ShareButtons property={property} />
									<PropertyContactForm property={property} />
								</aside>
							</div>
						</div>
					</section>

					{/* <!-- Images --> */}
					<PropertyImages images={property.images} />
				</>
			)}
		</>
	);
};
export default PropertyPage;
