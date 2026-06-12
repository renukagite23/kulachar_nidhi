// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   allowedDevOrigins: ["10.86.97.132"],
// };

// export default nextConfig;

import type { NextConfig } from "next";
import withPWA from "next-pwa";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "localhost",
    "*.local",
    "192.168.*.*",
    "10.*.*.*",
  ],
};

export default withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
})(nextConfig);