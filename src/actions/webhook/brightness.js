import { trigger } from "./index.js";

/**
 * @param {number|string} value 
 */
function left_on(value) {
    return trigger(
        'Light was left on!',
        'Detection after configured Time - SAVE ELECTRICITY AND MONEY',
        [{
            name: 'Brightness Level',
            value: `${value}`,
        }]
    )
}

/**
 * @param {number|string} value 
 */
function normalized(value) {
    return trigger(
        'Light was finally turned off!',
        'NOW WE CAN SAVE MONEY',
        [{
            name: 'Brightness Level',
            value: `${value}`,
        }],
        COLOR.GREEN,
    )
}

export default { left_on, normalized };