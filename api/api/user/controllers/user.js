"use strict";

module.exports = {
  getUserSelf: async (options) => {
    try {
      return await strapi.plugins["users-permissions"].services.user.fetch({
        id: options.id,
      });
    } catch (error) {
      console.log(error);
    }
  },
  updateUserSelf: async (context) => {
    try {
      const user = await strapi.plugins["users-permissions"].services.user.edit(
        { id: context.params.id },
        context.request.body
      );
      console.log(context);

      return { user };
    } catch (error) {
      console.log(error);
    }
  },
  updateUserRelations: async (context, options) => {
    try {
      const fields = Object.keys(options.input.data).filter(
        (i) => i !== "action"
      );
      const userByFields = await strapi.plugins[
        "users-permissions"
      ].services.user.fetch(context.params, fields);

      const updateFields = {}
      
      if (options.input.data.action === "ADD") {
        fields.forEach((param) => {
          if (userByFields[param]) {
            updateFields[param] = [
              ...userByFields[param],
              ...options.input.data[param],
            ];
          } else {
            updateFields[param] = options.input.data[param];
          }
        });
      }
      if (options.input.data.action === "REMOVE") {
        fields.forEach((param) => {
          if (userByFields[param]) {
            updateFields[param] = userByFields[param].filter(
              (item) => !options.input.data[param].includes(String(item.id))
            );
          }
        });
      }

      const user = await strapi.plugins["users-permissions"].services.user.edit(
        { id: context.params.id },
        updateFields
      );

      return { user };
    } catch (error) {
      console.log(error);
    }
  },
};
