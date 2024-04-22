import Tinkerforge from 'tinkerforge';
import { sensors } from './index.js';
import emitter from '../emitter.js';

// error handler
emitter.on('callback_error', (error) => {
    console.log(`Error receiving data: ${String(error)}`)
});
// error handler

sensors.temperature.setTemperatureCallbackConfiguration(1000, false, "x", 0, 0);
sensors.temperature.on(
    Tinkerforge.BrickletPTCV2.CALLBACK_TEMPERATURE,
    emitter.emit.bind(emitter, 'temperature'),
    emitter.emit.bind(emitter, 'callback_error'),
);

// TODO - define the other callbacks
// sensors.humidity.setTemperatureCallbackConfiguration(1000, false, "x", 0, 0);
// sensors.humidity.on(
//     Tinkerforge.BrickletPTCV2.CALLBACK_TEMPERATURE,
//     emitter.emit.bind(emitter, 'humidity'),
//     emitter.emit.bind(emitter, 'callback_error'),
// );