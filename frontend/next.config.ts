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
    
    // In development, proxy to local FastAPI.
    // In production, Vercel edge router and vercel.json will handle /api to api/index.py
    if (process.env.NODE_ENV === 'development') {
      return [
        {
          source: "/api/:path*",
          destination: "http://127.0.0.1:8000/api/:path*",
        },
      ];
    }

    return [];
  },
};

export default nextConfig;
