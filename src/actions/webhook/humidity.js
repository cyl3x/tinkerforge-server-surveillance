import { trigger } from './index.js';

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

export default { high };