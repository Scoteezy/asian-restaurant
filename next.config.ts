// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { env } from "@/env";

/** @type {import("next").NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: "**.googleusercontent.com",
      },
    ],
  },
};

export default nextConfig;
