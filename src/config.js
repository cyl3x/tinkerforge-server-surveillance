export default {
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
}