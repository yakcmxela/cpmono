"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/services.html#core-services)
 * to customize this service
 */

module.exports = {
  findUser: async (id) => {
    try {
      return await strapi.query("user", "users-permissions").findOne({ id });
    } catch (error) {
      console.log(error);
    }
    return null;
  },
  suggestVenues: async (location) => {
    console.log(location);
    try {
      return [];
    } catch (error) {
      console.log(error);
    }
    return null;
  },
};
