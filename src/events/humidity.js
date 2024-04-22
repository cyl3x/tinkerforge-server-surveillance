import webhook from "../actions/webhook/index.js";
import emitter from "../emitter.js";

emitter.on("humidity", (humidity) => {
  var convertedHumid = humidity / 100.0;
  if (convertedHumid >= 65) {
    webhook.humidity.low(convertedHumid);
  }
});
