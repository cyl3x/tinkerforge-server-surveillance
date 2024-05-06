import webhook from "../actions/webhook/index.js";
import config from '../config.js';
import emitter from "../emitter.js";

let currentDate = new Date();
let currentHours = currentDate.getHours();

let timeout = null;

emitter.on("motion", (motion) => {
    if(timeout) {
        clearTimeout(timeout);
        timeout = null;
    }

    if (!timeout) {
        timeout = setTimeout(() => {
            emitter.emit("lights_off")
        }, 10000);
        emitter.emit("lights_on");
    }
    console.log(timeout);

    if(currentHours <= config.movement.start || currentHours > config.movement.end) {
        webhook.movement.detect(true);
        emitter.emit("alarm_on", "UNAUTHORIZED");
    }
})