/*
 * Group Server Switcher by Ruud
 * =============================
 * 
 * This script adds a select box to the group screen
 * which allows the group leader to create a group on
 * another server with the same settings.
 * The URL of the new group is then sent to the old
 * group as a chat message.
 *
 * Requires some methods from group_presets.js.
 */
{
    let getCookie = (name, def) => {
        var n = $.cookie(name);
        $.removeCookie(name);
        var r = $.cookie(name) === undefined;
        if(n === undefined || r)
            $.cookie(name, n || def, {
                expires: 36500,
                path: "/",
                domain: tagpro.cookieHost
            });
        return n || def;
    };
     
    let setCookie = (name, value) => {
        $.removeCookie(name);
        $.cookie(name, value, {domain: tagpro.cookieHost, path: '/', expires: 36500});
    };

    let ping = (server, callback) => {
        if(server.url.endsWith('.koalabeast.com'))
            $.ajax({
                url:'http://'+server.url+'/stats?callback=?',
                timeout:1000,
                success:function(response) {
                    server.players = response.players;
                    server.error = false;
                    callback(server);
                },
                error:function() {
                    server.error = true;
                    callback(server);
                },
                dataType:'json'
            });
    };

    let servers = {
        Regular: {
            Chord: {name: 'Chord', url: 'tagpro-chord.koalabeast.com'},
            Orbit: {name: 'Orbit', url: 'tagpro-orbit.koalabeast.com'},
            Diameter: {name: 'Diameter', url: 'tagpro-diameter.koalabeast.com'},
            Pi: {name: 'Pi', url: 'tagpro-pi.koalabeast.com'},
            Radius: {name: 'Radius', url: 'tagpro-radius.koalabeast.com'},
            Origin: {name: 'Origin', url: 'tagpro-origin.koalabeast.com'},
            Sphere: {name: 'Sphere', url: 'tagpro-sphere.koalabeast.com'},
            Centra: {name: 'Centra', url: 'tagpro-centra.koalabeast.com'}
        },
        Testing: {
            Tangent: {name: 'Tangent', url: 'tangent.jukejuice.com'},
            Maptest: {name: 'Maptest', url: 'tagpro-maptest.koalabeast.com'},
            NC1: {name: 'NC Europe', url: 'maptest.newcompte.fr'},
            NC2: {name: 'NC US East', url: 'maptest2.newcompte.fr'},
            NC3: {name: 'NC US West', url: 'maptest3.newcompte.fr'},
            NC4: {name: 'NC Oceanic', url: 'oceanic.newcompte.fr'}
        }
    };
    
    // ugly DOM editing again, pls implement in a better fashion
    let newGroupForm = 
        $('<form>')
            .attr('method', 'POST')
            .attr('target', '_blank')
            .append($('<input>')
                .attr('name','name'))
            .append($('<input>')
                .attr('type','checkbox')
                .attr('name','public'));

    $('.group-settings.pull-right')
        .append($('<label>')
            .prop('for', 'switchServerSelect')
            .addClass('btn')
            .addClass('btn-default')
            .addClass('group-setting')
            .css('padding', '0')
            .append($('<select>')
                .addClass('js-leader-only')
                .attr('id', 'switchServerSelect')
                .css({
                    'background-color': 'transparent',
                    'border': '0',
                    'cursor': 'pointer',
                    'height': '35px'
                })
                .append($('<option>')
                    .attr('value', '')
                    .text('Switch Server...'))));

    for(let type in servers) {
        let optgroup = $('<optgroup>')
            .attr('label', type)
            .css('color', 'black');

        for(let server in servers[type]) if(servers[type][server].url !== tagpro.serverHost) {
            let option = $('<option>')
                .attr('value', servers[type][server].url)
                .text(servers[type][server].name)
                .css('color', 'black')
                .appendTo(optgroup);

            ping(servers[type][server], x => {
                $('option[value="' + x.url + '"]')
                    .text(x.name + (x.error ? '' : ' (' + x.players + (x.players === 1 ? ' player' : ' players') + ')'));
            });
        }
        optgroup.appendTo('#switchServerSelect');
    }

    $('#switchServerSelect').change(() => {
        let transferredSettings = {
            private: $('.group.container').hasClass('js-private-game')
        };
        
        for(let k in tagpro.group.settings.defaults) {
            let v = tagpro.group.settings.get(k);
            if(v != tagpro.group.settings.defaults[k])
                transferredSettings[k] = v;
        }
        
        setCookie('transferredSettings', btoa(JSON.stringify(transferredSettings)));
        setCookie('previousGroup', 'http://' + tagpro.socketHost + tagpro.group.socket.nsp);
        newGroupForm.find('[name=name]').val($('[name=groupName]').val());
        newGroupForm.attr('action', 'http://' + $('#switchServerSelect').val() + '/groups/create').submit();
        $('#switchServerSelect').val('');
    });

    if(getCookie('transferredSettings', false)) {
        let transferredSettings = JSON.parse(atob(getCookie('transferredSettings', {})));
        setCookie('transferredSettings', '');
        
        for(let key in transferredSettings)
            tagpro.group.socket.emit('setting', {name: key, value: transferredSettings[key]});

        if(transferredSettings.private)
            $('.switch-to-pug').click();
        
        let s = io.connect(getCookie('previousGroup', ''));
        s.on('connect', () => {
            s.emit('chat', document.location.href);
            s.close();
        });
        setCookie('previousGroup', '');
    }
}