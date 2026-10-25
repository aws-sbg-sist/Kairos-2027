/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  // Ensure server components can import node:sqlite cleanly
  experimental: {
    serverComponentsExternalPackages: ['node:sqlite'],
  },
};

export default nextConfig;
