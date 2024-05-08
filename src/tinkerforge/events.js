import Tinkerforge from "tinkerforge";
import { sensors, actors } from "./index.js";

import emitter from "../emitter.js";

// error handler
emitter.on("callback_error", (error) => {
  console.log(`Error receiving data: ${String(error)}`);
});
// error handler

sensors.temperature.setTemperatureCallbackConfiguration(1000, false, "x", 0, 0);
sensors.temperature.on(
  Tinkerforge.BrickletPTCV2.CALLBACK_TEMPERATURE,
  emitter.emit.bind(emitter, "temperature"),
  emitter.emit.bind(emitter, "callback_error")
);

sensors.humidity.setHumidityCallbackConfiguration(1000, false, "x", 0, 0);
sensors.humidity.on(
  Tinkerforge.BrickletHumidityV2.CALLBACK_HUMIDITY,
  emitter.emit.bind(emitter, "humidity"),
  emitter.emit.bind(emitter, "callback_error")
);

sensors.nfc_scanner.on(
  Tinkerforge.BrickletNFC.CALLBACK_READER_STATE_CHANGED,
  emitter.emit.bind(emitter, "nfc_state_changed"),
  emitter.emit.bind(emitter, "callback_error")
);

sensors.rgb_button.on(Tinkerforge.BrickletRGBLEDButton.CALLBACK_BUTTON_STATE_CHANGED, function (state) {
  if (state === Tinkerforge.BrickletRGBLEDButton.BUTTON_STATE_PRESSED) {
    emitter.emit("rgb_button_pressed");
  }
});

sensors.dual_button.on(Tinkerforge.BrickletDualButtonV2.CALLBACK_STATE_CHANGED, function (buttonL, buttonR) {
  if (buttonL === Tinkerforge.BrickletDualButtonV2.BUTTON_STATE_PRESSED) {
    emitter.emit("dual_button_left_pressed");
  }
  if (buttonR === Tinkerforge.BrickletDualButtonV2.BUTTON_STATE_PRESSED) {
    emitter.emit("dual_button_right_pressed");
  }
});

sensors.brightness.setIlluminanceCallbackConfiguration(1000, false, "x", 0, 0);
sensors.brightness.on(
  Tinkerforge.BrickletAmbientLightV3.CALLBACK_ILLUMINANCE,
  emitter.emit.bind(emitter, "brightness"),
  emitter.emit.bind(emitter, "callback_error")
);

sensors.motion.on(
  Tinkerforge.BrickletMotionDetectorV2.CALLBACK_MOTION_DETECTED,
  emitter.emit.bind(emitter, "motion"),
  emitter.emit.bind(emitter, "callback_error")
);
