// import webhook from "../actions/webhook.js";
import emitter from "../emitter.js";


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
})