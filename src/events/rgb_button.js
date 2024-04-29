import webhook from "../actions/webhook/index.js";
import emitter from "../emitter.js";

emitter.on("rgb_button_pressed", () => {
  emitter.emit("change_menu");
});
