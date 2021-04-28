"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  findOne: async (options) => {
    try {
      return await strapi.query("page").findOne(options.where);
    } catch (error) {
      console.log(error);
      return error;
    }
  },
};
