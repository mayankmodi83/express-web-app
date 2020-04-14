const request = require("request");
const token =
  "pk.eyJ1IjoibWF5YW5rbW9kaSIsImEiOiJjazhrMGVsY2MwbWpoM2dyMHcyNXFvemJrIn0.64IoZVUpfX2CAYxQuJmXYg";

const geoCode = (name, callback) => {
  request(
    {
      url:
        "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
        encodeURIComponent(name) +
        ".json?access_token=" +
        token,
      json: true
    },
    (error, { body }) => {
      if (error) {
        callback("Unable to connect to mapbox");
      } else if (body.message) {
        callback("Given token is not valid");
      } else {
        callback(undefined, body.features);
      }
    }
  );
};

module.exports = geoCode;
