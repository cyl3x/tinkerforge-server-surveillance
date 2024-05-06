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
    emitter.emit('alarm_on_threshold', 'temperature', "UNDERHEAT", config.temperature.alarm_threshold);
  } else if (convertedTemp > config.temperature.max) {
    webhook.temperature.high(convertedTemp);
    emitter.off("temperature", check);
    emitter.on("temperature", waitForNormalize);
    emitter.emit('alarm_on_threshold', 'temperature', "OVERHEAT", config.temperature.alarm_threshold);
  }
}

function waitForNormalize(temp) {
  var convertedTemp = temp / 100.0;

  if (convertedTemp < config.temperature.min && convertedTemp > config.temperature.max)
    return;

  emitter.off("temperature", waitForNormalize);
  emitter.on("temperature", check);
  webhook.temperature.normalized(convertedTemp);

  emitter.emit('alarm_off_threshold', 'temperature');
}
