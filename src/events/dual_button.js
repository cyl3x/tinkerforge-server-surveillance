import emitter from '../emitter.js';
import { sensors } from '../tinkerforge/index.js';

/**
 * Set the initial led states of the dual button.
 */
sensors.dual_button.setSelectedLEDState(0, 2);
sensors.dual_button.setSelectedLEDState(1, 3);

/**
 * Tiggers a change of the lcd display to temperature mode.
 */
emitter.on('dual_button_left_pressed', () => {
  emitter.emit('lcd_show_temperature');
  // Change active LED to LEFT
  sensors.dual_button.setSelectedLEDState(1, 3);
  sensors.dual_button.setSelectedLEDState(0, 2);
});

/**
 * Tiggers a change of the lcd display to humidity mode.
 */
emitter.on('dual_button_right_pressed', () => {
  emitter.emit('lcd_show_humidity');
  // Change active LED to RIGHT
  sensors.dual_button.setSelectedLEDState(0, 3);
  sensors.dual_button.setSelectedLEDState(1, 2);
});
