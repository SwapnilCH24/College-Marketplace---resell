/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // This ignores TypeScript errors during build
    ignoreBuildErrors: true,
  },
  eslint: {
    // This ignores ESLint errors during build
    ignoreDuringBuilds: true,
  },
}

export default nextConfig