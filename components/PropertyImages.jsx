import { getImageSrc } from '@/utils/getImageSrc';
import Image from 'next/image';

/**
 * A dynamic grid for displaying images in 2 columns, but if there is an uneven number of images
 * the final image spreads across both columns
 */
const PropertyImages = ({ images }) => {
	// Use util to display both images from Cloudinary, and, local ones
	const firstImageSrc = getImageSrc(images[0]);

	return (
		<section className='bg-blue-50 p-4'>
			<div className='container mx-auto'>
				{images.length === 1 ? (
					<Image
						src={firstImageSrc}
						alt=''
						className='object-cover h-[400px] mx-auto rounded-xl'
						width={1800}
						height={400}
						priority={true}
					/>
				) : (
					// Create a grid with 2 columns when there are 2 or more images
					<div className='grid grid-cols-2 gap-4'>
						{images.map((image, index) => {
							// Use util to display both images from Cloudinary, and, local ones
							const imageSrc = getImageSrc(image);

							return (
								<div
									key={index}
									// Dynamic class - if there are an uneven number of images we want the last one to spread across both columns
									className={`
                                        ${
											images.length % 2 === 1 &&
											index == images.length - 1
												? 'col-span-2' // spread the last image
												: 'col-span-1'
										}
                                        `}
								>
									<Image
										src={imageSrc}
										alt=''
										className='object-cover h-[400px] w-full rounded-xl'
										width={0}
										height={0}
										sizes='100vw'
										/**
										 * Avoids the:
										 * "Image with src "https://blahblah.jpg" was detected as the Largest Contentful Paint (LCP).
										 * Please add the "priority" property if this image is above the fold."
										 * warning in the console
										 */
										priority={true}
									/>
								</div>
							);
						})}
					</div>
				)}
			</div>
		</section>
	);
};
export default PropertyImages;
