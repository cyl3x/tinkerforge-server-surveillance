import emitter from "../emitter.js";
import config from "../config.js";

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
})