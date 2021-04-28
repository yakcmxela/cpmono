"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    async beforeCreate(data) {
      if (!data.isHomePage) {
        data.slug = await strapi.services.slug.generateSlug(data, "page");
      } else {
        await maybeUnsetHomepage();
        data.slug = "";
      }
    },
    async beforeUpdate(_, data) {
      if (!data.isHomePage) {
        data.slug = await strapi.services.slug.generateSlug(data, "page");
      } else {
        await maybeUnsetHomepage();
        data.slug = "";
      }
    },
  },
};

const maybeUnsetHomepage = async (id = null) => {
  /**
   * There can only be one homepage. This function looks for
   * and unsets another one if the current page is being set
   * as home.
   */
  try {
    const otherHomePage = await strapi.query("page").find({ isHomePage: true });
    const toUnset = otherHomePage.filter((page) => page.id !== id);
    if (toUnset.length) {
      for (const page of toUnset) {
        const slug = await strapi.services.slug.generateSlug(page, "page");
        await strapi
          .query("page")
          .update({ id: page.id }, { isHomePage: false, slug });
      }
    }
  } catch (error) {
    console.log(error);
  }
};
