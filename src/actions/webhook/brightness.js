import { trigger } from "./index.js";

/**
 * @param {boolean} value
 */
function detect(value) {
    return trigger(
        'Light was left on!',
        `Detection after configured Time - SAVE ELECTRICITY AND MONEY`,
        [{
            name: "Light",
            value: `${value}`,
        }]
    )
}

export default { detect };