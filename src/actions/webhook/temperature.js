import { trigger } from './index.js';

/**
 * @param {number|string} value
 * @param {number|string} max 
 */
function high(value, max = 30) {
    return trigger(
        'Temperature is rising!',
        `Is above ${max}°C - IT'S HOT IN HERE`,
        [{
            name: "Temperature",
            value: `${value}°C`,
        }]
    );
}

/**
 * @param {number|string} value
 * @param {number|string} min
 */
function low(value, min = 10) {
    return trigger(
        'Temperature is falling!',
        `Is below ${min}°C - IT'S COLD IN HERE`,
        [{
            name: "Temperature",
            value: `${value}°C`,
        }]
    );
}

export default { high, low }