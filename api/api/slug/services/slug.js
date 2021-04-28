"use strict";

/**
 * `slug` service.
 */

module.exports = {
  generateSlug: async (data, collection) => {
    const slugify = require("slugify");
    if (!collection) {
      return undefined;
    }
    const { slug, title } = data;
    if (title && (!slug || slug === "")) {
      const defaultSlug = slugify(title).toLowerCase();
      const slugExists = await strapi
        .query(collection)
        .find({ slug: defaultSlug });

      if (slugExists.length > 0) {
        const count = await strapi.query(collection).count({});
        return slugify(`${title}-${count + 1}`).toLowerCase();
      }
      return slugify(title).toLowerCase();
    }

    return slug;
  },
};
