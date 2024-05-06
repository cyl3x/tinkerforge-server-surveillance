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

export default { left_on };