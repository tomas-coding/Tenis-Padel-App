import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimize for production
  output: 'standalone',
  // Disable ESLint during builds
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    // Enable optimizations
    optimizePackageImports: ['lucide-react'],
  },
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
