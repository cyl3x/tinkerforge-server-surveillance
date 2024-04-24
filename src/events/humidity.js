import webhook from "../actions/webhook/index.js";
import emitter from "../emitter.js";

emitter.on('humidity', check);

function check(humidity) {
    var convertedHumid = humidity / 100.0;
  
    if (convertedHumid >= 65) {
      emitter.off('humidity', check);
      emitter.on('humidity', waitForNormalize);
      webhook.humidity.high(convertedHumid);
    }
}

function waitForNormalize() {
  var convertedHumid = humidity / 100.0;

  if (convertedHumid < 65) {
    emitter.on('humidity', check);
    emitter.off('humidity', waitForNormalize);
    webhook.humidity.normalized(convertedHumid);
  }
}