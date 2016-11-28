{
    tagpro.group.settings = {
        defaults: {
            redTeamName: "Red",
            blueTeamName: "Blue",
            redTeamScore: "0",
            blueTeamScore: "0",
            map: "",
            time: "12",
            caps: "3",
            accel: "1",
            topspeed: "1",
            bounce: "1",
            playerRespawnTime: "3000",
            speedPadRespawnTime: "10000",
            dynamiteRespawnTime: "30000",
            buffRespawnTime: "60000",
            buffDelay: false,
            potatoTime: "0"
        },
        set: function(key, value) {
            tagpro.group.socket.emit('setting', {name: key, value: value});
        },
        apply: function(preset) {
            for(let k in tagpro.group.settings.defaults)
                set(k, preset.hasOwnProperty(k) ?
                       preset[k] : tagpro.group.settings.defaults[k]);
        },
        presets: [
            {
                name: 'Default'
            },
            {
                name: 'Pick-Up Game',
                caps: 0,
                time: 10,
                buffDelay: true
            },
            {
                name: 'Hockey',
                map: 'Hockey',
                caps: 0,
                time: 10,
                buffDelay: true
            },
            {
                name: 'Open Field Masters',
                map: 'OFM',
                time: 5
            },
            {
                name: 'Duel',
                map: 'Duel',
                time: '5',
                caps: '3',
                playerRespawnTime: '1000'
            }
        ]
    };
}