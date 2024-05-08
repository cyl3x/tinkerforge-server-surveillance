import emitter from "../emitter.js";
import { actors } from "../tinkerforge/index.js";

emitter.on("temperature", displayTemperature);

emitter.on("lcd_show_temperature", () => {
  if (emitter.listeners("humidity").includes(displayHumidity)) {
    emitter.off("humidity", displayHumidity);
  }
  actors.lcd_display.clearDisplay();
  emitter.on("temperature", displayTemperature);
});

emitter.on("lcd_show_humidity", () => {
  if (emitter.listeners("temperature").includes(displayTemperature)) {
    emitter.off("temperature", displayTemperature);
  }
  actors.lcd_display.clearDisplay();
  emitter.on("humidity", displayHumidity);
});

const temps = { min: 100, max: 0 };

function displayTemperature(temp) {
  if (temp / 100 < temps.min) temps.min = temp / 100;
  if (temp / 100 > temps.max) temps.max = temp / 100;

  actors.lcd_display.writeLine(0, 0, "TEMPERATURE");
  actors.lcd_display.writeLine(1, 0, `Current ${temp / 100}`);
  actors.lcd_display.writeLine(2, 0, `Minimal ${temps.min}`);
  actors.lcd_display.writeLine(3, 0, `Maximal ${temps.max}`);
}

const humids = { min: 100, max: 0 };

function displayHumidity(humid) {
  humids.max = humid / 100;
  if (humid / 100 < humids.min) humids.min = humid / 100;
  if (humid / 100 > humids.max) humids.max = humid / 100;

  actors.lcd_display.writeLine(0, 0, `HUMIDITY`);
  actors.lcd_display.writeLine(1, 0, `Current ${humid / 100}`);
  actors.lcd_display.writeLine(2, 0, `Minimal ${humids.min}`);
  actors.lcd_display.writeLine(3, 0, `Maximal ${humids.max}`);
}
