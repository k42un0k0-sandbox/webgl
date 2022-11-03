const path = require("path");
/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
    config.resolve.alias["@"] = path.join(__dirname, "src");
    config.module.rules.push({
      test: /\.(glsl|vert|flag)$/,
      use: "raw-loader",
    });
    return config;
  },
};
