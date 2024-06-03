import webhook from "../actions/webhook/index.js";
import config from '../config.js';
import emitter from "../emitter.js";

let brightness_lvl = null;
emitter.on("brightness", (bright) => {
    brightness_lvl = bright;
})

emitter.on("lights_off", lights_off)

function lights_off() {
    if (brightness_lvl > config.brightness.light_level && isInBetweenHours()) {
        emitter.off("lights_off", lights_off)
        emitter.off("brightness", waitForNormalize)
        webhook.brightness.left_on();
    }
}

function waitForNormalize(brightness) {
    if (brightness <= config.brightness.light_level) {
        emitter.off("brightness", waitForNormalize);
        emitter.on("lights_off", lights_off);
        webhook.brightness.normalized(convertedTemp);
    }
  }

function isInBetweenHours() {
    let currentHours = (new Date()).getHours();
    return currentHours > config.brightness.start_hour || currentHours <= config.brightness.end_hour;
}
