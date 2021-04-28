const path = require("path");

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  env: {
    API_URL: process.env.API_URL,
    BASE_URL: process.env.BASE_URL,
    MAPBOX_TOKEN: process.env.MAPBOX_TOKEN,
    PORTLAND_LAT: process.env.PORTLAND_LAT,
    PORTLAND_LONG: process.env.PORTLAND_LONG,
  },
  webpack(config) {
    const {
      resolve: { alias },
    } = config;
    alias.components = path.resolve(__dirname, "./src/components");
    alias.helpers = path.resolve(__dirname, "./src/helpers");
    alias.layouts = path.resolve(__dirname, "./src/layouts");
    alias.providers = path.resolve(__dirname, "./src/providers");
    alias.public = path.resolve(__dirname, "./src/public");
    alias.schema = path.resolve(__dirname, "./src/schema");
    alias.styles = path.resolve(__dirname, "./src/styles");
    alias.src = path.resolve(__dirname, "./src");
    return config;
  },
};
