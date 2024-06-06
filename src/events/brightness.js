import webhook from '../actions/webhook/index.js';
import config from '../config.js';
import emitter from '../emitter.js';

let brightness_lvl = null;
emitter.on('brightness', (bright) => {
    brightness_lvl = bright;
})

emitter.on('lights_off', lights_off)

/**
 * Triggers an alert if the light is on between a given time frame.
 * Starts waiting for the light to be turned off.
 */
function lights_off() {
    if (brightness_lvl > config.brightness.light_level && isInBetweenHours()) {
        emitter.off('lights_off', lights_off)
        emitter.off('brightness', waitForNormalize)
        webhook.brightness.left_on(brightness_lvl);
    }
}

/**
 * Waits for the light to be turned off.
 */
function waitForNormalize(brightness_lvl) {
    if (brightness_lvl <= config.brightness.light_level) {
        emitter.off('brightness', waitForNormalize);
        emitter.on('lights_off', lights_off);
        webhook.brightness.normalized(brightness_lvl);
    }
}

/**
 * @returns {boolean} true if the current time is within the configured time frame.
 */
function isInBetweenHours() {
    let currentHours = (new Date()).getHours();
    return currentHours > config.brightness.start_hour || currentHours <= config.brightness.end_hour;
}
