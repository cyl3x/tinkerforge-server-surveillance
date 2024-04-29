import Tinkerforge from 'tinkerforge';
import { actors, sensors } from '../tinkerforge/index.js';
import webhook from '../actions/webhook/index.js';
import emitter from '../emitter.js';
import config from '../config.js';

emitter.on('alarm_on', (reason, epaper_message) => {
    if (emitter.listeners('nfc_state_changed').includes(nfc_reader))
        return void console.log('Alarm is already running!');

    webhook.alarm.on(reason ?? 'Unknown');

    sensors.nfc_scanner.setMode(Tinkerforge.BrickletNFC.MODE_READER);
    emitter.on('nfc_state_changed', nfc_reader);
    actors.piezo.setAlarm(800, 2000, 10, 1, /* volume */ 1, 4294967295);
});

emitter.on('alarm_off', (username) => {
    if (!emitter.listeners('nfc_state_changed').includes(nfc_reader)) {
        actors.piezo.setAlarm(800, 2000, 10, 1, /* volume */ 1, 0);
        console.log('Alarm is already off!');

        return;
    };

    webhook.alarm.off(username);

    emitter.off('nfc_state_changed', nfc_reader);
    actors.piezo.setAlarm(800, 2000, 10, 1, /* volume */ 1, 0);
});

function nfc_reader(state, idle) {
    if(state === Tinkerforge.BrickletNFC.READER_STATE_REQUEST_TAG_ID_READY) {
        sensors.nfc_scanner.readerGetTagID(
            (tagType, tagID) => {
                const tag = tagID.reduce((acc, id) => acc + id.toString(16), '');
                if (tag in config.alarm.authorized_nfcs) emitter.emit('alarm_off', config.alarm.authorized_nfcs[tag]);
            },
            console.error.bind('Error while reading nfc tag: '),
        );
    }

    if (idle) sensors.nfc_scanner.readerRequestTagID();
};