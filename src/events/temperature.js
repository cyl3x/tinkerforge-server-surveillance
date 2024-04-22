import webhook from "../actions/webhook/index.js";
import emitter from "../emitter.js";

emitter.on("temperature", (temp) => {
  var convertedTemp = temp / 100.0;
  if (convertedTemp < 10) {
    webhook.temperature.low(convertedTemp);
  } else if (temp > 30) {
    webhook.temperature.high(convertedTemp);
  }
});
