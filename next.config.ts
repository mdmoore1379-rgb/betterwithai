import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: 'export',   // Commented for Client Portal (auth + personalized data).
  // For full production with SSO, projects, invoices, e-sign: Deploy as full Next.js app on Vercel.
  // Marketing pages can stay static/fast. Portal at /portal uses server features + Supabase auth.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
