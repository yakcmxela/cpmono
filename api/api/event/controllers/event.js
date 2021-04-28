"use strict";

module.exports = {
  create: async (context) => {
    try {
      const submittedBy = context.state.user;
      if (submittedBy.role.type === "contributor") {
        const newEvent = await strapi.query("event").create({
          ...context.request.body,
          published_at: null,
          submittedBy,
        });
        await strapi.plugins["users-permissions"].services.user.edit(
          {
            id: submittedBy.id,
          },
          {
            events: newEvent.id,
          }
        );
        return newEvent;
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
  geocode: async (options) => ({
    ...(await strapi.services.geocode.forwardGeocode(options.input.address)),
  }),
  suggest: async (options) => {
    const { data, user } = options.input;
    const eventServices = strapi.api.event.services.event;
    const userServices = strapi.api.user.services.user;
    const submittedEvent = { ...data, published_at: null };

    try {
      const submittedBy = await eventServices.findUser(user.id);
      Object.assign(submittedEvent, {
        submittedBy,
      });
    } catch (error) {
      console.log(error);
    }

    try {
      // TODO
      // Maybe assign venue based on location submitted.
      // const venues = await eventServices.getVenues(submittedEvent.location);
      // Object.assign(submittedEvent, {
      //   venues,
      // });
    } catch (error) {
      console.log(error);
    }

    try {
      // TODO
      // 1. Find admins to receive email
      // 2. Send email notifications
      // const adminsToNotify = await userServices.findAdminsForNotification();
      // const notifications = adminsToNotify.map((admin) =>
      //   strapi.plugins["email"].services.email.send({
      //     to: "alexpmckay@gmail.com",
      //     from: "noreply@boldcoastdev.com",
      //     subject: "New event submitted!",
      //     text: "", // Event title / submitter?,
      //   })
      // );
      // await Promise.all(notifications)
    } catch (error) {
      console.log(error);
    }

    try {
      return await strapi.query("event").create(submittedEvent);
    } catch (error) {
      return error;
    }
  },
};
