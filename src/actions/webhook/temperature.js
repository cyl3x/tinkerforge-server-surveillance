import { trigger } from './index.js';
import config from '../../config.js';

/**
 * @param {number|string} value
 */
function high(value) {
    return trigger(
        'Temperature is rising!',
        `Is above ${config.temperature.max}°C - IT'S HOT IN HERE`,
        [{
            name: "Temperature",
            value: `${value}°C`,
        }]
    );
}

/**
 * @param {number|string} value
 */
function low(value) {
    return trigger(
        'Temperature is falling!',
        `Is below ${config.temperature.min}°C - IT'S COLD IN HERE`,
        [{
            name: "Temperature",
            value: `${value}°C`,
        }]
    );
}

/**
 * @param {number|string} value
 */
function normalized(value) {
    return trigger(
        'Temperature is normal again!',
        `Is between ${config.temperature.min}°C and ${config.temperature.max}°C - IT'S FINE NOW`,
        [{
            name: "Temperature",
            value: `${value}°C`,
        }]
    );
}

export default { high, low, normalized }