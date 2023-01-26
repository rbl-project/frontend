/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
      {
        source:"/dashboard",
        destination:"/dashboard/exploratory-data-analysis/dataset-overview",
        permanent:true,
      }
    ]
  },
}

module.exports = nextConfig
