import { COLOR, trigger } from './index.js';
import config from '../../config.js';

/**
 * @param {number|string} value 
 */
function high(value) {
    return trigger(
        'Humidity is high!',
        `Is above ${config.humidity.max}% - IT'S WET IN HERE`,
        [{
            name: "Humidity",
            value: `${value}°C`,
        }]
    );
}

/**
 * @param {number|string} value 
 */
function normalized(value) {
    return trigger(
        'Humidity normalized!',
        `Is below ${config.humidity.max}% again - IT'S FINE NOW`,
        [{
            name: "Humidity",
            value: `${value}°C`,
        }],
        COLOR.GREEN,
    );
}

export default { high, normalized };