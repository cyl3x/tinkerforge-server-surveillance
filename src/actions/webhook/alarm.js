import { trigger } from './index.js';

/**
 * @param {string} reason 
 */
function on(reason) {
    return trigger(
        'Alarm is turned on',
        `Alarm turned on - ${reason}`,
        [{
            name: 'Reason',
            value: `${reason}`,
        }]
    );
}

/**
 * @param {string} username 
 */
function off(username) {
    return trigger(
        'Alarm is turned off',
        `Alarm turned off by ${username}`,
        [{
            name: 'User',
            value: `${username}`,
        }]
    );
}

export default { on, off };