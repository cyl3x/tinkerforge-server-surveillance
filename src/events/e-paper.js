import emitter from '../emitter.js';
import { actors } from '../tinkerforge/index.js';
import Tinkerforge from 'tinkerforge';

let epaper_msgs = [];

/**
 * Add a persistant message to the e-paper display.
 * Can show multiple messages at once.
 */
emitter.on('e-paper_add', (epaper_msg) => {
    if (!epaper_msg) {
        return void console.log('No message to display!')
    }

    epaper_msgs.push(epaper_msg);
    
    actors.epaper.fillDisplay(Tinkerforge.BrickletEPaper296x128.COLOR_RED);

    const y_start = 128 / 2 - (epaper_msgs.length * 24 / 2);
    
    for (let i = 0; i < epaper_msgs.length; i++) {
        const msg = epaper_msgs[i];

        const x = 296 / 2 - (msg.length * 18 / 2);

        actors.epaper.drawText(
            x < 0 ? 0 : x,
            y_start + (i * 24) + (i * 4),
            Tinkerforge.BrickletEPaper296x128.FONT_18X24,
            Tinkerforge.BrickletEPaper296x128.COLOR_WHITE,
            Tinkerforge.BrickletEPaper296x128.ORIENTATION_HORIZONTAL,
            msg
        );
    }

    actors.epaper.draw();
});

/**
 * Clear all messages from the e-paper display.
 */
emitter.on('e-paper_clear', () => {
    if (epaper_msgs.length === 0) return;

    epaper_msgs = [];
    actors.epaper.fillDisplay(Tinkerforge.BrickletEPaper296x128.COLOR_WHITE);
    actors.epaper.draw();
});