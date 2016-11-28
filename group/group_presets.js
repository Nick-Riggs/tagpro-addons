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
        set: (key, value) => {
            tagpro.group.socket.emit('setting', {name: key, value: value});
        },
        get: key => {
            switch(key) {
                case 'buffDelay':
                    return $('input[name=buffDelay]').prop('checked');

                case 'redTeamName':
                case 'blueTeamName':
                    return $('input[name=' + key + ']').val();

                case 'redTeamScore':
                    return $('#red-team .team-score-value').text();

                case 'blueTeamScore':
                    return $('#blue-team .team-score-value').text();

                default:
                    return $('select[name=' + key + ']').val();
            }
        },
        apply: preset => {
            console.log(preset);
            for(let k in tagpro.group.settings.defaults)
                tagpro.group.settings.set(
                    k, preset.hasOwnProperty(k) ?
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
            },
            {
                name: 'Testing',
                time: '20',
                caps: '0',
                speedPadRespawnTime: '1000',
                dynamiteRespawnTime: '1000',
                buffRespawnTime: '1000',
                playerRespawnTime: '1000'
            }
        ]
    };
    
    let detectPreset = () => {
        let presetSelected = false;
        for(let i=0; i<tagpro.group.settings.presets.length; ++i) {
            let preset = tagpro.group.settings.presets[i], selected = true;
            for(let k in tagpro.group.settings.defaults) {
                if(tagpro.group.settings.get(k) != (preset.hasOwnProperty(k) ? preset[k] : tagpro.group.settings.defaults[k])) {
                    selected = false;
                    break;
                }
            }
            if(selected) {
                presetSelected = true;
                presetSelector.val(i);
            }
        }
        if(!presetSelected)
            presetSelector.val(-1);
    };
    
    // DOM manipulation, you'll probably want to do this in a more convenient way if you implement this :)
    let presetSelector = $('<select class="form-control">');
    $('#private-settings > .settings-map > .row').prepend($('<div class="col-sm-12 js-leader-only">').append(presetSelector));
    for(let i=0; i<tagpro.group.settings.presets.length; ++i) {
        let preset = tagpro.group.settings.presets[i];
        presetSelector.append($('<option>').prop('value', i).text('Preset: ' + preset.name));
    }
    
    presetSelector.change(() => {
        let i = presetSelector.val();
        if(i < 0)
            return;
        tagpro.group.settings.apply(tagpro.group.settings.presets[i]);
        presetSelector.find('option[value=-1]').remove();
    });
    
    /*
     * The setting packets sent when applying a preset cause an annoying stutter in the preset field.
     * This is an ugly way of preventing that. I'm sorry.
     */
    let detectTimeout = setTimeout(detectPreset, 0);
    tagpro.group.socket.on('setting', () => {
        clearTimeout(detectTimeout);
        detectTimeout = setTimeout(detectPreset, 100);
    });
}
