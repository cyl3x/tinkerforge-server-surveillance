import Tinkerforge from 'tinkerforge';

const IP = '172.20.10.242';

/**
 * Create a new IP connection to the Tinkerforge devices.
 * It will automatically close the connection when the
 * application is terminated.
 */
function createIPcon() {
    const ipcon = new Tinkerforge.IPConnection();
    ipcon.connect(IP, 4223, (error) => console.error(`Could not connect to ${IP}:4223, code ${error}`));

    ['exit', 'SIGINT', 'SIGUSR1', 'SIGUSR2', 'SIGTERM'].forEach((e) => {
        process.on(e, () => {
            if (!ipcon.isConnected) return;

            console.log(`[${e}] Closing connection ...`);
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

/**
 * Export a static IP connection to the Tinkerforge devices.
 */
export const ipcon = await createIPcon();