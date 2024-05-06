import webhook from "../actions/webhook/index.js";
import emitter from "../emitter.js";

let brightness_lvl = null;
emitter.on("brightness", (bright) => {
    brightness_lvl = bright;
    console.log(bright);
})

emitter.on("lights_off", (brightness_lvl) => {
    if(brightness_lvl > 2000) {
        webhook.brightness.detect(true);
    }
})