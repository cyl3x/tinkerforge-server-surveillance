import { trigger } from './index.js';

/**
 * @param {boolean} value 
 */
function detect(value) {
    return trigger(
        'Movement was detected!',
        'Detection after permited Time - SOMETHING IS CRAWLING IN THE DARK',
        [{
            name: 'Movement',
            value: `${value}`,
        }]
    );
}

export default { detect };