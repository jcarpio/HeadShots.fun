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

  // Add redirects to handle invitation-based access
  async redirects() {
    return [
      {
        source: '/', // The home page
        destination: '/waitlist', // Redirect to the waitlist page
        permanent: false, // Temporary redirect
        has: [
          {
            type: 'query',
            key: 'code', // Check for the invitation code in the query parameter
            value: '(?!valid)', // Regex to ensure the code is not "valid"
          },
        ],
      },
    ];
  },
};

// Use withContentlayer if it's already part of your setup
module.exports = withContentlayer(nextConfig);
