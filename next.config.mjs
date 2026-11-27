/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  outputFileTracingRoot: process.cwd(),
  // Strict in-memory cache limit for 512MB RAM PaaS containers (Render Free/Starter)
  cacheMaxMemorySize: 20 * 1024 * 1024,
  productionBrowserSourceMaps: false,
  experimental: {
    // Tree-shake icons so unused icons are never loaded into server heap (only lucide-react, NOT framer-motion)
    optimizePackageImports: ['lucide-react'],
  },
  images: {
    // Prevent Sharp from allocating 60MB+ memory buffers for 3840px/2048px images on 512MB containers
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days immutable image caching
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  async rewrites() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || 'https://nwdpzcaxmfvcobnfwdwa.supabase.co';
    return [
      {
        source: '/assets/kairos-logo-reveal.mp4',
        destination: `${supabaseUrl}/storage/v1/object/public/assets/kairos-logo-reveal.mp4`,
      },
      {
        source: '/docs/:path*',
        destination: `${supabaseUrl}/storage/v1/object/public/assets/docs/:path*`,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com data:",
              "img-src 'self' data: blob: https: https://*.supabase.co",
              "media-src 'self' data: blob: https: https://*.supabase.co",
              "connect-src 'self' https://generativelanguage.googleapis.com https://*.supabase.co",
              "frame-src 'self' https://www.loom.com",
              "frame-ancestors 'self'",
              "object-src 'none'",
              "base-uri 'self'"
            ].join('; '),
          },
        ],
      },
      {
        source: '/assets/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/favicon.ico',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=604800',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
