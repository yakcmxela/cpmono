module.exports = {
  definition: `
    enum RelationAction {
      ADD
      REMOVE
    }
    input userRelationsInput {
      eventsAttended: [ID]
      eventsFavorited: [ID]
      action: RelationAction
    }
    input updateUserRelationsInput {
      where: InputID
      data: userRelationsInput
    }
  `,
  mutation: `
    updateUserRelations(input: updateUserRelationsInput): updateUserPayload!
    updateUserSelf(input: updateUserInput): updateUserPayload!
  `,
  query: `
    getUserSelf(id: ID!): UsersPermissionsUser!
  `,
  resolver: {
    Mutation: {
      updateUserSelf: {
        description: "User update to own base profile",
        policies: ["plugins::users-permissions.isAuthenticated", "isOwner"],
        resolverOf: "application::user.user.updateUserSelf",
        resolver: async (_, __, { context }) => {
          return await strapi.api.user.controllers.user.updateUserSelf(context);
        },
      },
      updateUserRelations: {
        description: "Add relations to a user",
        policies: ["plugins::users-permissions.isAuthenticated", "isOwner"],
        resolverOf: "application::user.user.updateUserRelations",
        resolver: async (_, options, { context }) => {
          return await strapi.api.user.controllers.user.updateUserRelations(
            context,
            options
          );
        },
      },
    },
    Query: {
      getUserSelf: {
        description: "Find a user's own profile",
        policies: ["plugins::users-permissions.isAuthenticated", "isOwner"],
        resolverOf: "application::user.user.getUserSelf",
        resolver: async (_, options) => {
          return await strapi.api.user.controllers.user.getUserSelf(options);
        },
      },
    },
  },
};
