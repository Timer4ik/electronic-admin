/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
            },
        ],
    },
    publicRuntimeConfig: {
        API_URL: "http://26.13.70.202:5000/api"
    }
}

module.exports = nextConfig
