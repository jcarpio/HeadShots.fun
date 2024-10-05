const { withContentlayer } = require("next-contentlayer2");
import("./env.mjs");
/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "randomuser.me",
      },
      {
        protocol: "https",
        hostname: "s.headshots.fun",
      },
      {
        protocol: "https",
        hostname: "replicate.delivery",
      },
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ["@prisma/client"],
  },

  async redirects() {
    return [
      {
        source: '/', // The home page
        destination: '/waitlist', // Redirect to the waitlist page
        permanent: false, // Set it to false to make it a temporary redirect
        has: [
          {
            type: 'query',
            key: 'code', // If no 'code' query parameter, redirect to /waitlist
            value: '(?!valid)', // This will allow "valid" codes to bypass the waitlist
          },
        ],
      },
      {
        source: '/waitlist',
        destination: '/waitlist', // Make sure /waitlist is visible directly
        permanent: false,
      },
    ];
  },
};

module.exports = withContentlayer(nextConfig);
