import webhook from "../actions/webhook/index.js";
import config from '../config.js';
import emitter from "../emitter.js";

let brightness_lvl = null;
emitter.on("brightness", (bright) => {
    brightness_lvl = bright;
})

emitter.on("lights_off", () => {
    if (brightness_lvl > config.brightness.light_level && isInBetweenHours) {
        webhook.brightness.left_on();
    }
})

function isInBetweenHours() {
    let currentHours = (new Date()).getHours();
    return currentHours > config.brightness.start_hour || currentHours <= config.brightness.end_hour;
}
