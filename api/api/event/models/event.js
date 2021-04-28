"use strict";

module.exports = {
  lifecycles: {
    async beforeCreate(data) {
      data.slug = await strapi.services.slug.generateSlug(data, "event");
      if (data.location) {
        // const features = await strapi.services.geocode.forwardGeocode(address);
        /**
         * TODO
         * Admin UI for selecting geocoded/updated location?
         */
        // Object.assign(data, {
        //   location: await geocode(data.location),
        // });
      }
    },
    async beforeUpdate(_, data) {
      data.slug = await strapi.services.slug.generateSlug(data, "event");
      if (data.location) {
        // const features = await strapi.services.geocode.forwardGeocode(address);
        /**
         * TODO
         * Admin UI for selecting geocoded/updated location?
         */
        // Object.assign(data, {
        //   location: await geocode(data.location),
        // });
      }
    },
  },
};
