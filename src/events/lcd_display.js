import emitter from "../emitter.js";
import { actors } from "../tinkerforge/index.js";

emitter.on("temperature", writeTemperature);

emitter.on("change_menu", () => {
  if (emitter.listeners("temperature").includes(writeTemperature)) {
    emitter.off("temperature", writeTemperature);
    actors.lcd_display.clearDisplay();
    emitter.on("humidity", writeHumidity);
  } else if (emitter.listeners("humidity").includes(writeHumidity)) {
    emitter.off("humidity", writeHumidity);
    actors.lcd_display.clearDisplay();
    emitter.on("temperature", writeTemperature);
  }
});

const temps = { min: 100, max: 0 };

function writeTemperature(temp) {
  if (temp / 100 < temps.min) temps.min = temp / 100
  else if (temp / 100 > temps.max) temps.max = temp / 100

  actors.lcd_display.writeLine(0, 0, "TEMPERATURE");
  actors.lcd_display.writeLine(1, 0, `Current ${temp / 100}`);
  actors.lcd_display.writeLine(2, 0, `Minimal ${temps.min}`);
  actors.lcd_display.writeLine(3, 0, `Maximal ${temps.max}`);
}

function writeHumidity(humid) {
  actors.lcd_display.writeLine(0, 0, `Humidity JL : ${humid / 100}`);
}
