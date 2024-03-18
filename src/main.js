import Tinkerforge from 'tinkerforge';

const ipcon = new Tinkerforge.IPConnection();

[`exit`, `SIGINT`, `SIGUSR1`, `SIGUSR2`, `uncaughtException`, `SIGTERM`].forEach((e) => {
    process.on(e, () => {
        console.log("closing connection ...");
        ipcon.disconnect();
    });
})

ipcon.connect('172.20.10.242', 4223, console.error);

ipcon.on(Tinkerforge.IPConnection.CALLBACK_CONNECTED,
    function(connectReason) {
        // Trigger Enumerate
        ipcon.enumerate();
    }
);

// Register Enumerate Callback
ipcon.on(Tinkerforge.IPConnection.CALLBACK_ENUMERATE,
    // Print incoming enumeration
    function(uid, connectedUid, position, hardwareVersion, firmwareVersion,
             deviceIdentifier, enumerationType) {
        console.log('UID:               '+uid);
        console.log('Enumeration Type:  '+enumerationType);
        if(enumerationType === Tinkerforge.IPConnection.ENUMERATION_TYPE_DISCONNECTED) {
            console.log('');
            return;
        }
        console.log('Connected UID:     '+connectedUid);
        console.log('Position:          '+position);
        console.log('Hardware Version:  '+hardwareVersion);
        console.log('Firmware Version:  '+firmwareVersion);
        console.log('Device Identifier: '+deviceIdentifier);
        console.log('');
    }
);