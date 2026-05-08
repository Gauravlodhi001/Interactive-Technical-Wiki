import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL;
    if (backendUrl) {
      return [
        {
          source: "/api/:path*",
          destination: `${backendUrl.replace(/\/$/, '')}/api/:path*`,
        },
      ];
    }
    
    // In development, proxy to local FastAPI server
    if (process.env.NODE_ENV === 'development') {
      return [
        {
          source: "/api/:path*",
          destination: "http://127.0.0.1:8000/api/:path*",
        },
      ];
    }

    // In production, proxy to the Vercel Python serverless function at /api
    return [
      {
        source: "/api/:path*",
        destination: "/api",
      },
    ];
  },
};

export default nextConfig;
