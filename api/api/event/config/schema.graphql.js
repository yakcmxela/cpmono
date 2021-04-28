module.exports = {
  definition: `
    input geocodeEventInput {
      address: String
    }
    input suggestEventInput {
      data: EventInput
      user: InputID!
    }
  `,
  mutation: `suggestEvent(input: suggestEventInput): createEventPayload!`,
  query: `geocodeLocation(input: geocodeEventInput): JSON`,
  resolver: {
    Query: {
      geocodeLocation: {
        description: "Get the possible map locations for an address",
        policies: ["plugins::users-permissions.isAuthenticated"],
        resolverOf: "application::event.event.geocode",
        resolver: async (_, options) => ({
          ...(await strapi.api.event.controllers.event.geocode(options)),
        }),
      },
    },
    Mutation: {
      suggestEvent: {
        description: "Upsert a new event to be reviewed",
        policies: ["plugins::users-permissions.isAuthenticated"],
        resolverOf: "application::event.event.suggest",
        resolver: async (_, options) => ({
          event: await strapi.api.event.controllers.event.suggest(options),
        }),
      },
    },
  },
};
