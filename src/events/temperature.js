import webhook from "../actions/webhook/index.js";
import emitter from "../emitter.js";
import config from "../config.js";

emitter.on("temperature", check);

function check(temp) {
  var convertedTemp = temp / 100.0;

  if (convertedTemp < config.temperature.min) {
    webhook.temperature.low(convertedTemp);
    emitter.off("temperature", check);
    emitter.on("temperature", waitForNormalize);
  } else if (convertedTemp > config.temperature.max) {
    webhook.temperature.high(convertedTemp);
    emitter.off("temperature", check);
    emitter.on("temperature", waitForNormalize);
  }
}

function waitForNormalize(temp) {
  var convertedTemp = temp / 100.0;

  if (convertedTemp >= config.temperature.min && convertedTemp <= config.temperature.max) {
    emitter.off("temperature", waitForNormalize);
    webhook.humidity.normalized(convertedHumid);
  }
}
