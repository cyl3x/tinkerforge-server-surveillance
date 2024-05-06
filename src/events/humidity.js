import webhook from "../actions/webhook/index.js";
import emitter from "../emitter.js";
import config from '../config.js';

emitter.on('humidity', check);

function check(humidity) {
    var convertedHumid = humidity / 100.0;
  
    if (convertedHumid >= config.humidity.max) {
      emitter.off('humidity', check);
      emitter.on('humidity', waitForNormalize);
      webhook.humidity.high(convertedHumid);
      emitter.emit('alarm_on_threshold', 'humidity', "MOISTURE", config.humidity.alarm_threshold)
    }
}

function waitForNormalize() {
  var convertedHumid = humidity / 100.0;

  if (convertedHumid >= config.humidity.max) return;

  emitter.on('humidity', check);
  emitter.off('humidity', waitForNormalize);
  webhook.humidity.normalized(convertedHumid);

  emitter.emit('alarm_off_threshold', 'humidity');
}