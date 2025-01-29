import Image from 'next/image';

const PropertyHeaderImage = ({ image }) => {
	// Quick hack to display both images from Cloudinary, and, local ones
	const imageSrc = image.includes('https') // Detect if url is Cloudinary
		? image // Works for image loaded from Cloudinary
		: `/images/properties/${image}`; // Works for static image from the public dir

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
						priority={true}
					/>
				</div>
			</div>
		</section>
	);
};
export default PropertyHeaderImage;
