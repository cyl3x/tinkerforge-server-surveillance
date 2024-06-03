import { trigger } from "./index.js";

function left_on() {
    return trigger(
        'Light was left on!',
        `Detection after configured Time - SAVE ELECTRICITY AND MONEY`,
        [{
            name: "Light",
            value: 'ON',
        }]
    )
}

function normalized() {
    return trigger(
        'Light was finally turned off!',
        `NOW WE CAN SAVE MONEY`,
        [{
            name: "Light",
            value: 'ON',
        }]
    )
}

export default { left_on, normalized };