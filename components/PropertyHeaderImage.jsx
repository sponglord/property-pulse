import { getImageSrc } from '@/utils/getImageSrc';
import Image from 'next/image';

const PropertyHeaderImage = ({ image }) => {
	// Use util to display both images from Cloudinary, and, local ones
	const imageSrc = getImageSrc(image);

	return (
		<section>
			<div className='container-xl m-auto'>
				<div className='grid grid-cols-1'>
					<Image
						src={imageSrc}
						alt=''
						className='object-cover h-[400px] w-full'
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
			</div>
		</section>
	);
};
export default PropertyHeaderImage;
