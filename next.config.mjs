/** @type {import('next').NextConfig} */
const nextConfig = {
	webpackDevMiddleware: (config) => {
		config.watchOptions = {
			poll: 1000,
			aggregateTimeout: 300,
		};
		return config;
	},
	images: {
		remotePatterns: [
			// Needed to display images served from Google e.g. user profile images
			{
				protocol: 'https',
				hostname: 'lh3.googleusercontent.com',
				pathname: '**',
			},
			// Needed to display images served from Cloudinary i.e. property images
			{
				protocol: 'https',
				hostname: 'res.cloudinary.com',
				pathname: '**',
			},
		],
	},
};

export default nextConfig;
