/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		DNCOMMERCE_API_TOKEN: process.env.DNCOMMERCE_API_TOKEN,
	},
};

module.exports = nextConfig;
