import Tinkerforge from 'tinkerforge';
import { actors, sensors } from '../tinkerforge/index.js';
import webhook from '../actions/webhook/index.js';
import emitter from '../emitter.js';
import config from '../config.js';

const alarmState = {};

/**
 * Tigger an alert after a given time has passed without the alarm being turned off.
 */
emitter.on('alarm_on_threshold', (id, reason, threshold) => {
    if (!!alarmState[id]) clearTimeout(alarmState[id]);

    alarmState[id] = setTimeout(() => {
        emitter.emit('alarm_on', reason);
    }, threshold);
});

/**
 * Cancels the alert if the alarm is turned off before the time has passed.
 */
emitter.on('alarm_off_threshold', (id) => {
    if (!alarmState[id]) return;

    clearTimeout(alarmState[id]);
    alarmState[id] = undefined;
    emitter.emit('alarm_off', `EVENT(${id})`);
});

/**
 * Turns the alarm on and starts listening for NFC tags.
 */
emitter.on('alarm_on', (reason) => {
    emitter.emit('e-paper_add', reason);

    if (emitter.listeners('nfc_state_changed').includes(nfc_reader)) {
        return void console.log(`Alarm: Turned on again - ${reason}`);
    } else {
        console.log(`Alarm: Turned on - ${reason}`);
    }

    webhook.alarm.on(reason ?? 'UNKNOWN');

    sensors.nfc_scanner.setMode(Tinkerforge.BrickletNFC.MODE_READER);
    emitter.on('nfc_state_changed', nfc_reader);
    actors.piezo.setAlarm(800, 2000, 10, 1, /* volume */ 1, 4294967295);
});

/**
 * Turns the alarm off and clears the e-paper display.
 */
emitter.on('alarm_off', (username) => {
    emitter.emit('e-paper_clear');

    if (!emitter.listeners('nfc_state_changed').includes(nfc_reader)) {
        actors.piezo.setAlarm(800, 2000, 10, 1, /* volume */ 1, 0);
        console.log(`Alarm: Turned off again by ${username}`);

        return;
    } else {
        console.log(`Alarm: Turned off by ${username}`)
    }

    webhook.alarm.off(username);

    emitter.off('nfc_state_changed', nfc_reader);
    actors.piezo.setAlarm(800, 2000, 10, 1, /* volume */ 1, 0);
});

/**
 * Reads the NFC tag and turns the alarm off if the tag is authorized.
 */
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