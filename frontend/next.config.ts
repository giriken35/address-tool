import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    // Vercel deployment will use NEXT_PUBLIC_API_URL (e.g. Render API URL)
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
    return [
      {
        source: "/api/:path*",
        destination: `${apiUrl}/api/:path*`, // Proxy to Backend
      },
    ];
  },
};

export default nextConfig;
