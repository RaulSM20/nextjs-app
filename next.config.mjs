/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/categories",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
