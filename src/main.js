import Tinkerforge from 'tinkerforge';
import { IP, Actors, Sensors } from './tinkerforge/consts.js';
import { getIPcon } from './tinkerforge/connection.js';

const ipcon = getIPcon();

const ps = new Tinkerforge.BrickletPiezoSpeakerV2(Actors.PIEZO, ipcon);

ipcon.on(Tinkerforge.IPConnection.CALLBACK_CONNECTED, () => {
  ps.setAlarm(800, 2000, 10, 1, 1, 1000);
});
