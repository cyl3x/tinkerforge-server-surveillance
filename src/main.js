import Tinkerforge from "tinkerforge";
import { ipcon } from "./tinkerforge/connection.js";
import { sensors } from "./tinkerforge/index.js";

import EventEmitter from "node:events";

//Event Emitter
const eventEmitter = new EventEmitter();

// Events
eventEmitter.on("temperature_warning", () => {
  console.log("Temperature too high!");
});

// Logic
eventEmitter.emit("test");

// Sensors
const t = sensors.temperature;
t.setTemperatureCallbackConfiguration(1000, false, "x", 0, 0);

t.on(Tinkerforge.BrickletPTCV2.CALLBACK_TEMPERATURE, function (temperature) {
  var temp = temperature / 100.0;
  if (temp > 28.0) {
    eventEmitter.emit("temperature_warning");
  }
});
