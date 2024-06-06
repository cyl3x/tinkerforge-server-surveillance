import { trigger } from "./index.js";

/**
 * @param {number|string} value 
 */
function left_on() {
    return trigger(
        'Light was left on!',
        `Detection after configured Time - SAVE ELECTRICITY AND MONEY`,
        [{
            name: 'Brightness Level',
            value: 'ON',
        }]
    )
}

/**
 * @param {number|string} value 
 */
function normalized() {
    return trigger(
        'Light was finally turned off!',
        `NOW WE CAN SAVE MONEY`,
        [{
            name: 'Brightness Level',
            value: "Off",
        }],
    )
}

export default { left_on, normalized };