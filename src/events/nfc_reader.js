import Tinkerforge from 'tinkerforge';
import { sensors } from '../tinkerforge/index.js';
import emitter from '../emitter.js';
import config from '../config.js';

if (config.nfc_reader.always_log) {
    sensors.nfc_scanner.setMode(Tinkerforge.BrickletNFC.MODE_READER);

    /**
     * Reads the NFC tag and prints it to the console.
     */
    emitter.on('nfc_state_changed', (state, idle) => {
        if(state === Tinkerforge.BrickletNFC.READER_STATE_REQUEST_TAG_ID_READY) {
            sensors.nfc_scanner.readerGetTagID(
                (tagType, tagID) => {
                    const tag = tagID.reduce((acc, id) => acc + id.toString(16), '');
                    console.log(`Regonized NFC Tag: ${tag}`);
                },
                console.error.bind('Error while reading nfc tag: '),
            );
        }

        if (idle) sensors.nfc_scanner.readerRequestTagID();
    });
}
