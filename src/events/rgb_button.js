import emitter from '../emitter.js';

/**
 * Tiggers the change of the segment display mode.
 */
emitter.on('rgb_button_pressed', () => {
  emitter.emit('change_seg_mode');
});
