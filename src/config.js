import config from '../config.json' with { "type": "json" };

function mergeDeep(target, source) {
    let output = Object.assign({}, target);
    if (isObject(target) && isObject(source)) {
        Object.keys(source).forEach(key => {
            if (isObject(source[key])) {
                if (!(key in target))
                    Object.assign(output, { [key]: source[key] });
                else
                    output[key] = mergeDeep(target[key], source[key]);
            } else {
                Object.assign(output, { [key]: source[key] });
            }
        });
    }

    return output;
}

function isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item));
}

const defaultConfig = {
    temperature: {
        min: 15,
        max: 30,
        alarm_threshold: 10000, // 10s
    },
    humidity: {
        max: 65,
        alarm_threshold: 10000, // 10s
    },
    movement: {
        start_hour: 21,
        end_hour: 6
    },
    motion: {
        light_threshold: 10000, // 10s
    },
    brightness:{
        start_hour: 21,
        end_hour: 6,
        light_level: 2000, //lumen
    },
    alarm: {
        webhook: 'https://discord.com/api/webhooks',
        authorized_nfcs: {
            // nfc id
            b7944dc7: 'The Church',
        }
    },
    nfc_reader: {
        always_log: false,
    }
};

export default mergeDeep(defaultConfig, config);
