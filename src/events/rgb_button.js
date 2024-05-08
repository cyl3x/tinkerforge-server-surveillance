import emitter from "../emitter.js";

emitter.on("rgb_button_pressed", () => {
  emitter.emit("change_seg_mode");
});
