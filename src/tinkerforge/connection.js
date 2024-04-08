import Tinkerforge from 'tinkerforge';
import { IP } from './consts.js';

let ipcon = null;

export function getIPcon() {
    if (ipcon) return ipcon;

    ipcon = new Tinkerforge.IPConnection();
    ipcon.connect(IP, 4223, console.error);

    [`exit`, `SIGINT`, `SIGUSR1`, `SIGUSR2`, `uncaughtException`, `SIGTERM`].forEach((e) => {
        process.on(e, () => {
            console.log("closing connection ...");
            ipcon.disconnect();
        });
    });

    return ipcon;
};