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
        start: 6,
        end: 21
    },
    motion: {
        light_threshold: 10000, // 10s
    },
    alarm: {
        webhook: 'https://discord.com/api/webhooks',
        authorized_nfcs: {
            // nfc id
            b7944dc7: 'The Church',
        }
    },
}