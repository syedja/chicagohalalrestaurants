import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: path.resolve(),
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'chicagohalalrestaurants.com' }],
        destination: 'https://www.chicagohalalrestaurants.com/:path*',
        permanent: true,
      },
    ]
  },
}
export default nextConfig