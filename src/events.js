import Tinkerforge, { BrickletTemperature } from "tinkerforge";
import { Sensors } from "./tinkerforge/consts";
import { getIPcon } from "./tinkerforge/connection";

const min = 10;
const max = 30; 
var temperature = new BrickletTemperature(Sensors.TEMPERATURE,getIPcon())

temperature.getTemperatureCallbackThreshold(min, max);
temperature.setI2CMode(1);

export function temperatureEvent(){
    if(temperature.getTemperature() < min || temperature.getTemperature() > max){
        return temperature.getTemperature();
    }
}