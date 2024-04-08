import { BrickletTemperature } from "tinkerforge";
import { getSensor } from "../tinkerforge/sensors.js";
import actions from '../actions/webhook/index.js';

const min = 10;
const max = 30; 

function check() {
    const temp = getSensor('TEMPERATURE').getTemperature();

    if (temp < min) {
        actions.temperature.low(temp);
    } else if (temp > max) {
        actions.temperature.high(temp);
    }
}

export default {
    check,
}