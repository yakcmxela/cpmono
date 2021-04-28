"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  create: async (context) => {
    try {
      const submittedBy = context.state.user;
      if (
        submittedBy.role.type === "authenticated" &&
        submittedBy.artist === null
      ) {
        const artist = await strapi.query("artist").create({
          ...context.request.body,
          published_at: null,
        });
        await strapi.plugins["users-permissions"].services.user.edit(
          {
            id: submittedBy.id,
          },
          {
            artist: artist.id,
          }
        );
        return artist;
      } else {
        throw new Error("A user can only create one artist");
      }
      // TODO:
      // send email notification to admin for approval
    } catch (error) {
      console.log(error);
      return error;
    }
  },
};
