
import { sensors } from '../tinkerforge/index.js';
import webhook from '../actions/webhook/index.js';

const min = 10;
const max = 30;

sensors.temperature.getTemperatureCallbackThreshold(min, max);
sensors.temperature.setI2CMode(1); 

function check() {
    const temp = sensors.temperature.getTemperature();

    if (temp < min) {
        webhook.temperature.low(temp);
    } else if (temp > max) {
        webhook.temperature.high(temp);
    }
}

export default {
    check,
}