import webhook from '../actions/webhook/index.js';
import emitter from '../emitter.js';
import config from '../config.js';

emitter.on('temperature', check);

/**
 * Sends an alert if the temperature is outside a given range.
 * Starts waiting for the temperature to normalize.
 */
function check(temp) {
  var convertedTemp = temp / 100.0;

  if (convertedTemp < config.temperature.min) {
    webhook.temperature.low(convertedTemp);
    emitter.off('temperature', check);
    emitter.on('temperature', waitForNormalize);
    emitter.emit('alarm_on_threshold', 'temperature', 'UNDERHEAT', config.temperature.alarm_threshold);
  } else if (convertedTemp > config.temperature.max) {
    webhook.temperature.high(convertedTemp);
    emitter.off('temperature', check);
    emitter.on('temperature', waitForNormalize);
    emitter.emit('alarm_on_threshold', 'temperature', 'OVERHEAT', config.temperature.alarm_threshold);
  }
}

/**
 * Sends an all-clear alert when the temperature is back to normal.
 */
function waitForNormalize(temp) {
  var convertedTemp = temp / 100.0;

  if (convertedTemp < config.temperature.min || convertedTemp > config.temperature.max)
    return;

  emitter.off('temperature', waitForNormalize);
  emitter.on('temperature', check);
  webhook.temperature.normalized(convertedTemp);

  emitter.emit('alarm_off_threshold', 'temperature');
}
