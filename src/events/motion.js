import webhook from "../actions/webhook/index.js";
import config from '../config.js';
import emitter from "../emitter.js";

let timeout = null;
emitter.on("motion", () => {
    if(timeout) {
        clearTimeout(timeout);
        timeout = null;
    }

    if (!timeout) {
        timeout = setTimeout(() => {
            emitter.emit("lights_off")
        }, config.motion.light_threshold);

        emitter.emit("lights_on");
    }

    if(isInBetweenHours) {
        webhook.movement.detect(true);
        emitter.emit("alarm_on", "UNAUTHORIZED");
    }
})

function isInBetweenHours() {
    let currentHours = (new Date()).getHours();
    return currentHours > config.movement.start_hour || currentHours <= config.movement.end_hour;
}