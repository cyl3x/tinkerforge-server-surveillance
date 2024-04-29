import webhook from "../actions/webhook/index.js";
import temperature from "../actions/webhook/temperature.js";
import emitter from "../emitter.js";
import { actors, sensors } from "../tinkerforge/index.js";
import { maxTemp, minTemp } from "./temperature.js";

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

function writeTemperature(temp) {
  actors.lcd_display.writeLine(0, 0, "TEMPERATURE");
  actors.lcd_display.writeLine(1, 0, `Current ${temp / 100}`);
  actors.lcd_display.writeLine(2, 0, `Minimal ${minTemp}`);
  actors.lcd_display.writeLine(3, 0, `Maximal ${maxTemp}`);
}

function writeHumidity(humid) {
  actors.lcd_display.writeLine(0, 0, `Humidity JL : ${humid / 100}`);
}
