import Tinkerforge, { BrickletTemperature } from "tinkerforge";
import { Sensors } from "./tinkerforge/consts";
import { getIPcon } from "./tinkerforge/connection";
import actions from './actions/webhook/index.js';

const min = 10;
const max = 30; 
var temperature = new BrickletTemperature(Sensors.TEMPERATURE,getIPcon())

temperature.getTemperatureCallbackThreshold(min, max);
temperature.setI2CMode(1);

export function temperatureEvent(){
    if(temperature.getTemperature() < min){
        actions.temperature.low(temperature.getTemperature());
    }
    else if(temperature.getTemperature() > max){
        actions.temperature.high(temperature.getTemperature());
    }
}