import emitter from "../emitter.js";
import { sensors } from "../tinkerforge/index.js";

// Turn on left LED
sensors.dual_button.setSelectedLEDState(0, 2);
sensors.dual_button.setSelectedLEDState(1, 3);

emitter.on("dual_button_left_pressed", () => {
  emitter.emit("lcd_show_temperature");
  // Change active LED to LEFT
  sensors.dual_button.setSelectedLEDState(1, 3);
  sensors.dual_button.setSelectedLEDState(0, 2);
});

emitter.on("dual_button_right_pressed", () => {
  emitter.emit("lcd_show_humidity");
  // Change active LED to RIGHT
  sensors.dual_button.setSelectedLEDState(0, 3);
  sensors.dual_button.setSelectedLEDState(1, 2);
});
