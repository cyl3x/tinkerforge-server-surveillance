import Tinkerforge from 'tinkerforge';
import { Sensors } from './consts.js';
import { getIPcon } from './connection.js';

const sensors = {};

export function getSensor(name) {
    if (sensors[name]) return sensors[name];
    
    switch (name) {
        case 'TEMPARATURE':
            const sensor = new Tinkerforge.BrickletTemperatureV2(Sensors[name], getIPcon());
            sensor.getTemperatureCallbackThreshold(min, max);
            sensor.setI2CMode(1);
            return sensors[name] = sensor;
    
        default:
            throw new Error(`Sensor ${name} not found`);
    }
};