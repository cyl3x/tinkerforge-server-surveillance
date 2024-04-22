import Tinkerforge from 'tinkerforge';
import { actors } from '../tinkerforge/index.js';
import webhook from '../actions/webhook/index.js';
import emitter from '../emitter.js';

const piezoCfg = {
    durationMs: 1000,
    volume: 1,
}

emitter.on('alarm_on', () => {
    if (emitter.listeners('nfc_state_changed').includes(nfc_reader))
        return void console.log('Alarm is already running!');

    webhook.alarm.on();

    emitter.on('nfc_state_changed', nfc_reader);
    actors.piezo.setAlarm(800, 2000, 10, 1, piezoCfg.volume, piezoCfg.durationMs);
});

emitter.on('alarm_off', () => {
    if (!emitter.listeners('nfc_state_changed').includes(nfc_reader))
        return void console.log('Alarm is already off!');

    webhook.alarm.off();

    emitter.off('nfc_state_changed', nfc_reader);
    // actors.piezo.setAlarm(800, 2000, 10, 1, piezoCfg.volume, piezoCfg.durationMs);
});

function nfc_reader(nfc_readerstate, idle) {
    if (idle) {
        console.log('idling ...');
        return void nfc.readerRequestTagID();
    }

    if(state != Tinkerforge.BrickletNFC.READER_STATE_REQUEST_TAG_ID_READY) {
        return;
    }


    nfc.readerGetTagID(
        (tagType, tagID) => {
            var tagInfo = '';

            for (var i = 0; i < tagID.length; i++) {
                tagInfo += '0x' + ('0' + tagID[i].toString(16).toUpperCase()).substr(-2);

                if (i < tagID.length - 1) {
                    tagInfo += ' ';
                }
            }

            console.log('Found tag of type %d with ID [%s]', tagType, tagInfo);
            emitter.emit('alarm_off');
        },
        console.error.bind('Error while reading nfc tag: '),
    );
};

function off() {
    // disable
    // piezo.setAlarm(800, 2000, 10, 1, piezoCfg.volume, piezoCfg.durationMs);
}