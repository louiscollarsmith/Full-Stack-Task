/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => [
    {
      source: "/:path*",
      destination: `http://localhost:2002/:path*`,
    },
  ],
};

module.exports = nextConfig;
