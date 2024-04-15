import Tinkerforge from 'tinkerforge';

const IP = '172.20.10.242';

function createIPcon() {
    const ipcon = new Tinkerforge.IPConnection();
    ipcon.connect(IP, 4223, (error) => console.error(`Could not connect to ${IP}:4223, code ${error}`));

    [`exit`, `SIGINT`, `SIGUSR1`, `SIGUSR2`, `uncaughtException`, `SIGTERM`].forEach((e) => {
        process.on(e, () => {
            if (!ipcon.isConnected) return;

            console.log("Closing connection ...");
            ipcon.disconnect();
        });
    });

    return new Promise((resolve) => {
        ipcon.on(
            Tinkerforge.IPConnection.CALLBACK_CONNECTED,
            () => resolve(ipcon),
        );
    });
};

export const ipcon = await createIPcon();