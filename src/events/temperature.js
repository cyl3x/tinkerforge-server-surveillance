import { BrickletTemperature } from "tinkerforge";
import { Sensors } from "../tinkerforge/consts.js";
import { getIPcon } from "../tinkerforge/connection.js";
import actions from '../actions/webhook/index.js';

const min = 10;
const max = 30; 
var temperature = new BrickletTemperature(Sensors.TEMPERATURE, getIPcon())

temperature.getTemperatureCallbackThreshold(min, max);
temperature.setI2CMode(1);

function check() {
    const temp = temperature.getTemperature();

    if (temp < min) {
        actions.temperature.low(temp);
    } else if (temp > max) {
        actions.temperature.high(temp);
    }
}

export default {
    check,
}