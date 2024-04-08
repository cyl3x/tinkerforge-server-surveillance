import { trigger } from './index.js';

/**
 * @param {number|string} value 
 */
function high(value) {
    return trigger(
        'Temperature is rising!',
        `Is above 30°C - IT'S HOT IN HERE`,
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
        `Is below 10°C - IT'S COLD IN HERE`,
        [{
            name: "Temperature",
            value: `${value}°C`,
        }]
    );
}

export default { high, low }