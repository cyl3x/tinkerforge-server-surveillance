import emitter from "../emitter.js";
import { sensors } from "../tinkerforge/index.js";

/**
 * Set the initial led states of the dual button.
 */
sensors.dual_button.setSelectedLEDState(0, 2);
sensors.dual_button.setSelectedLEDState(1, 3);

/**
 * Tiggers a change of the lcd display to temperature mode.
 */
  // Change active LED to LEFT
  sensors.dual_button.setSelectedLEDState(1, 3);
  sensors.dual_button.setSelectedLEDState(0, 2);
});

/**
 * Tiggers a change of the lcd display to humidity mode.
 */
  // Change active LED to RIGHT
  sensors.dual_button.setSelectedLEDState(0, 3);
  sensors.dual_button.setSelectedLEDState(1, 2);
});
