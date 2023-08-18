/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => [
    {
      source: "/:path*",
      destination: `http://localhost:3001/:path*`,
    },
  ],
};

module.exports = nextConfig;
