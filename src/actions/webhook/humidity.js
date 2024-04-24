import { COLOR, trigger } from './index.js';

/**
 * @param {number|string} value 
 */
function high(value) {
    return trigger(
        'Humidity is high!',
        `Is above 65% - IT'S WET IN HERE`,
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
        `Is below 65% again - IT'S FINE NOW`,
        [{
            name: "Humidity",
            value: `${value}°C`,
        }],
        COLOR.GREEN,
    );
}

export default { high, normalized };