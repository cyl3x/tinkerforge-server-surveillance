import { trigger } from './index.js';

/**
 * @param {number|string} value 
 */
function detect(value) {
    return trigger(
        'Movement was detected!',
        `detection after permited Time - SOMTHING IS CRAWLING IN THE DARK`,
        [{
            name: "Movement",
            value: `${value}°C`,
        }]
    );
}

export default { detect };