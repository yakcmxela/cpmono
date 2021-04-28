"use strict";

module.exports = {
  /**
   * @description Returns an object of possible locations based on the supplied address
   */
  forwardGeocode: async (address) => {
    const mapboxClient = require("@mapbox/mapbox-sdk");
    const geocodingService = require("@mapbox/mapbox-sdk/services/geocoding");
    const geocodeClient = geocodingService(
      mapboxClient({ accessToken: process.env.MAPBOX_TOKEN })
    );
    return geocodeClient
      .forwardGeocode({
        query: address,
        types: ["place", "address", "poi", "poi.landmark"],
      })
      .send()
      .then(({ body }) => body.features);
  },
  reverseGeocode: async (coords) => {},
};
