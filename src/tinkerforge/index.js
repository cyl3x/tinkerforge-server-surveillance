import Tinkerforge from "tinkerforge";
import { ipcon } from "./connection.js";

/**
 * Configure all Tinkerforge sensors and
 * expose them as constants.
 */
export const sensors = {
  temperature: new Tinkerforge.BrickletPTCV2("Wcg", ipcon),
  brightness: new Tinkerforge.BrickletAmbientLightV3("Pdw", ipcon),
  humidity: new Tinkerforge.BrickletHumidityV2("ViW", ipcon),
  motion: new Tinkerforge.BrickletMotionDetectorV2("ML4", ipcon),
  rgb_button: new Tinkerforge.BrickletRGBLEDButton("23Qx", ipcon),
  dual_button: new Tinkerforge.BrickletDualButtonV2("Vd8", ipcon),
  nfc_scanner: new Tinkerforge.BrickletNFC("22ND", ipcon),
};

/**
 * Configure all Tinkerforge actors and
 * expose them as constants.
 */
export const actors = {
  piezo: new Tinkerforge.BrickletPiezoSpeakerV2("R7M", ipcon),
  epaper: new Tinkerforge.BrickletEPaper296x128("XGL", ipcon),
  seg_display: new Tinkerforge.BrickletSegmentDisplay4x7V2("Tre", ipcon),
  lcd_display: new Tinkerforge.BrickletLCD128x64("24Rh", ipcon),
};
