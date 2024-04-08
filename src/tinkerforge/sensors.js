import Tinkerforge from 'tinkerforge';
import { Sensors } from './consts.js';
import { getIPcon } from './connection.js';

const sensors = {};

export async function getSensor(name) {
    if (sensors[name]) return sensors[name];

    const ipcon = await getIPcon();
    
    switch (name) {
        case 'TEMPARATURE':
            const sensor = new Tinkerforge.BrickletTemperatureV2(Sensors[name], ipcon);
            sensor.getTemperatureCallbackThreshold(min, max);
            sensor.setI2CMode(1);
            return sensors[name] = sensor;
    
        default:
            throw new Error(`Sensor ${name} not found`);
    }
};