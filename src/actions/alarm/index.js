import { getActor } from '../../tinkerforge/actors.js'

const piezoCfg = {
    durationMs: 1000,
    volume: 1,
}

export async function onAlarm() {
    const piezo = await getActor('PIEZO');

    piezo.setAlarm(800, 2000, 10, 1, piezoCfg.volume, piezoCfg.durationMs);
}