import { actors } from '../tinkerforge/index.js';
import emitter from '../emitter.js';

emitter.on(
    'temperature',
    (temp) => {
        const digits = temp
            .toString()
            .split("")
            .map(Number);

        actors.seg_display.setNumericValue([digits[0], digits[1], digits[2], 12]);
        actors.seg_display.setSelectedSegment(15,true);
        actors.seg_display.setSelectedSegment(34,true);
    }
)
