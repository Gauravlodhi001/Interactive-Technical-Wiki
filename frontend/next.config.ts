import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || process.env.BACKEND_URL;
    return [
      {
        source: "/api/:path*",
        destination: process.env.NODE_ENV === 'development'
          ? "http://127.0.0.1:8000/api/:path*"
          : backendUrl 
            ? `${backendUrl.replace(/\/$/, '')}/api/:path*` 
            : "/api/:path*",
      },
    ];
  },
};

export default nextConfig;
