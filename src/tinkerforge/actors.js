import Tinkerforge from 'tinkerforge';
import { Actors } from './consts.js';
import { getIPcon } from './connection.js';

const actors = {};

export async function getActor(name) {
    if (actors[name]) return actors[name];
    
    const ipcon = await getIPcon();

    switch (name) {
        case 'PIEZO':
            return actors[name] = new Tinkerforge.BrickletPiezoSpeakerV2(Actors.PIEZO, ipcon);
    
        default:
            throw new Error(`Actor ${name} not found`);
    }
};