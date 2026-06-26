/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // <--- Add this line
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

export default nextConfig