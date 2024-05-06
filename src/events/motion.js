import webhook from "../actions/webhook/index.js";
import config from '../config.js';
import emitter from "../emitter.js";

let currentDate = new Date();
let currentHours = currentDate.getHours();

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
    if(currentHours <= config.movement.start || currentHours > config.movement.end) {
        webhook.movement.detect(true);
        emitter.emit("alarm_on", "UNAUTHORIZED");
    }
})