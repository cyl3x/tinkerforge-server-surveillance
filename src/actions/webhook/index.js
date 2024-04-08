import temperature from './temperature.js';
import humidity from './humidity.js';

const URL = 'https://discord.com/api/webhooks'

/**
 * @param {string} title title of the incident
 * @param {string} description why the incident was triggered (e.g. Temperature above 30°C)
 * @param {array<{ name: string, value: string }>} fields
 */
export async function trigger(title, description, fields) {
    const body = {
        embeds: [{
            title,
            description,
            color: 15409955,
            fields,
        }],
    }

    const response = await fetch(URL, {
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
    humidity,
    temperature,
}
