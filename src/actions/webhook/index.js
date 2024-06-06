import alarm from './alarm.js';
import temperature from './temperature.js';
import humidity from './humidity.js';
import config from '../../config.js';
import brightness from './brightness.js';
import movement from './movement.js';

export const COLOR = {
    RED: 15409955,
    GREEN: 48640,
};

/**
 * Send a formatted alert to the configured discord webhook.
 * 
 * @param {string} title title of the alert
 * @param {string} description why the alert was triggered (e.g. Temperature above 30°C)
 * @param {array<{ name: string, value: string }>} fields
 * @param {number} color color of the alert
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
        console.trace(
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
    brightness,
    movement,
}
