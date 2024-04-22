import webhook from '../actions/webhook/index.js';
import emitter from '../emitter.js';

emitter.on(
    'temperature',
    (temp) => {
        if (temp < 10) {
            webhook.temperature.low(temp);
        } else if (temp > 30) {
            webhook.temperature.high(temp);
        }
    }
);
