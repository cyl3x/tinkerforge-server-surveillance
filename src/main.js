import Tinkerforge from 'tinkerforge';
import { Actors, Sensors } from './consts.js';

const ipcon = new Tinkerforge.IPConnection();
ipcon.connect('172.20.10.242', 4223, console.error);

[`exit`, `SIGINT`, `SIGUSR1`, `SIGUSR2`, `uncaughtException`, `SIGTERM`].forEach((e) => {
    process.on(e, () => {
        console.log("closing connection ...");
        ipcon.disconnect();
    });
})


const ps = new Tinkerforge.BrickletPiezoSpeakerV2(Actors.PIEZO, ipcon);

ipcon.on(Tinkerforge.IPConnection.CALLBACK_CONNECTED, () => {

    ps.setAlarm(800, 2000, 10, 1, 1, 1000);
});

// // Register Enumerate Callback
// ipcon.on(Tinkerforge.IPConnection.CALLBACK_ENUMERATE,
//     // Print incoming enumeration
//     function(uid, connectedUid, position, hardwareVersion, firmwareVersion,
//              deviceIdentifier, enumerationType) {
//         console.log('UID:               '+uid);
//         console.log('Enumeration Type:  '+enumerationType);
//         if(enumerationType === Tinkerforge.IPConnection.ENUMERATION_TYPE_DISCONNECTED) {
//             console.log('');
//             return;
//         }
//         console.log('Connected UID:     '+connectedUid);
//         console.log('Position:          '+position);
//         console.log('Hardware Version:  '+hardwareVersion);
//         console.log('Firmware Version:  '+firmwareVersion);
//         console.log('Device Identifier: '+deviceIdentifier);
//         console.log('');
//     }
// );