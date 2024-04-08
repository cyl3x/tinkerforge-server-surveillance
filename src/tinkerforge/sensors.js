import Tinkerforge from 'tinkerforge';
import { Sensors } from './consts.js';
import { getIPcon } from './connection.js';

const sensors = {};

export function getSensor(name) {
    if (sensors[name]) return sensors[name];
    
    switch (name) {
        case TEMPARATURE:
            return sensors[name] = new Tinkerforge.BrickletTemperatureV2(Sensors[name], getIPcon());
    
        default:
            throw new Error(`Sensor ${name} not found`);
    }
};