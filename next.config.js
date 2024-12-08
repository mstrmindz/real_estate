module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["bayut-production.s3.eu-central-1.amazonaws.com", "localhost"],
  },
};
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|svg)$/i,
      type: "asset/resource",
    });
    return config;
  },
};

module.exports = nextConfig;
