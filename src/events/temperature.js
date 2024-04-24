import webhook from "../actions/webhook/index.js";
import emitter from "../emitter.js";

emitter.on('temperature', check);

function check(temp) {
  var convertedTemp = temp / 100.0;

  if (convertedTemp < 10) {
    webhook.temperature.low(convertedTemp);
    emitter.off('temperature', check)
    emitter.on('temperature', waitForNormalize)
  } else if (convertedTemp > 30) {
    webhook.temperature.high(convertedTemp);
    emitter.off('temperature', check)
    emitter.on('temperature', waitForNormalize)
  }
}

function waitForNormalize(temp) {
  var convertedTemp = temp / 100.0;

  if (convertedTemp >= 10 && convertedTemp <= 30) {
    emitter.off('temperature', waitForNormalize);
    webhook.humidity.normalized(convertedHumid);
  }
}