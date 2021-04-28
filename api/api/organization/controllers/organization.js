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
        submittedBy.organization === null
      ) {
        const organization = await strapi.query("organization").create({
          ...context.request.body,
          published_at: null,
        });
        await strapi.plugins["users-permissions"].services.user.edit(
          {
            id: submittedBy.id,
          },
          {
            organization: organization.id,
            organizations: organization.id,
          }
        );
        return organization;
      } else {
        throw new Error("A user can only create one organization");
      }
      // TODO:
      // send email notification to admin for approval
    } catch (error) {
      console.log(error);
      return error;
    }
  },
};
