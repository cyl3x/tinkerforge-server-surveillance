import alarm from './alarm.js';
import temperature from './temperature.js';
import humidity from './humidity.js';
import config from '../../config.js';

export const COLOR = {
    RED: 15409955,
    GREEN: 48640,
};

/**
 * @param {string} title title of the incident
 * @param {string} description why the incident was triggered (e.g. Temperature above 30°C)
 * @param {array<{ name: string, value: string }>} fields
 */
export async function trigger(title, description, fields, color = COLOR.RED) {
    console.log(`Triggered webhook: ${title} - ${description}`);

    const body = {
        embeds: [{
            title,
            description,
            color,
            fields,
        }],
    }

    const response = await fetch(config.alarm.webhook, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        console.error(
            `Error sending webhook (${response.status}): ${await response.text()}`,
        );

        throw new Error('Error sending webhook');
    }
}

/**
 * @example
 * import actions from './actions/webhook/index.js';
 * 
 * actions.temperature.high(30);
 */

export default {
    alarm,
    humidity,
    temperature,
}
