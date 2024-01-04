/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		DNCOMMERCE_API_TOKEN: process.env.DNCOMMERCE_API_TOKEN,
		API_URL: process.env.API_URL
	}
};

module.exports = nextConfig;
