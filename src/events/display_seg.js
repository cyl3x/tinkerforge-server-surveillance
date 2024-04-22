import { actors } from '../tinkerforge/index.js';
import emitter from '../emitter.js';

emitter.on(
    'temperature',
    (temp) => {
        const digits = temp
            .toString()
            .split("")
            .map(Number);

        actors.seg_display.setNumericValue([...digits, 34, 12]);
    }
)
