export function getImageSrc(image) {
	// Quick hack to display both images from Cloudinary, and, local ones
	const imageSrc = image.includes('https') // Detect if url is Cloudinary
		? image // Works for image loaded from Cloudinary
		: `/images/properties/${image}`; // Works for static image from the public dir

	return imageSrc;
}
