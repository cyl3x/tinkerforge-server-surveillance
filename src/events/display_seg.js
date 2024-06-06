import { actors, sensors } from "../tinkerforge/index.js";
import emitter from "../emitter.js";

/**
 * Set the initial color of the RGB button.
 */
sensors.rgb_button.setColor(255, 0, 0);

/**
 * Register temperature as first mode displayed.
 */
emitter.on("temperature", SegTemperature);

/**
 * Circle through the different modes.
 */
emitter.on("change_seg_mode", () => {
  if (emitter.listeners("temperature").includes(SegTemperature)) {
    emitter.off("temperature", SegTemperature);
    emitter.on("humidity", SegHumidity);
    sensors.rgb_button.setColor(0, 0, 255);
  } else if (emitter.listeners("humidity").includes(SegHumidity)) {
    emitter.off("humidity", SegHumidity);
    emitter.on("brightness", SegBrightness);
    sensors.rgb_button.setColor(0, 255, 0);
  } else if (emitter.listeners("brightness").includes(SegBrightness)) {
    emitter.off("brightness", SegBrightness);
    emitter.on("temperature", SegTemperature);
    sensors.rgb_button.setColor(255, 0, 0);
  }
});

/**
 * Temperature display mode.
 */
function SegTemperature(temp) {
  const digits = temp.toString().split("").map(Number);

  actors.seg_display.setNumericValue([digits[0], digits[1], digits[2], 12]);
  actors.seg_display.setSelectedSegment(15, true);
  actors.seg_display.setSelectedSegment(34, true);
}

/**
 * Humidity display mode.
 */
function SegHumidity(humid) {
  const digits = humid.toString().split("").map(Number);

  actors.seg_display.setNumericValue([digits[0], digits[1], digits[2], -1]);
  actors.seg_display.setSelectedSegment(15, true);
  actors.seg_display.setSelectedSegment(25, true);
  actors.seg_display.setSelectedSegment(26, true);
  actors.seg_display.setSelectedSegment(28, true);
  actors.seg_display.setSelectedSegment(29, true);
  actors.seg_display.setSelectedSegment(30, true);
}

/**
 * Brightness display mode.
 */
function SegBrightness(brightness) {
  const digits = brightness.toString().split("").map(Number);

  if (brightness < 1000) {
    actors.seg_display.setNumericValue([digits[0], digits[1], digits[2], -1]);

    // Show "L" when brightness is below 1000 Lux
    // actors.seg_display.setSelectedSegment(27, true);
    // actors.seg_display.setSelectedSegment(28, true);
    // actors.seg_display.setSelectedSegment(29, true);
  } else {
    actors.seg_display.setNumericValue([digits[0], digits[1], digits[2], digits[3]]);
  }
}
