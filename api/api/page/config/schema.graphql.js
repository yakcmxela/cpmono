module.exports = {
  query: `pageByParams(where: JSON): Page`,
  resolver: {
    Query: {
      pageByParams: {
        description: "Find the a page by it's properties",
        policies: [],
        resolverOf: "application::page.page.findOne",
        resolver: async (_, options) =>
          await strapi.api.page.controllers.page.findOne(options),
      },
    },
  },
};
