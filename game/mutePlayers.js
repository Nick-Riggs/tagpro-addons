/*
* Description: Lets a player mute and unmute another player for a game. Operates on a player's in-game ID.
* Link: https://www.reddit.com/r/TagPro/comments/580uz8/script_mute_other_players/
*/

(function() {
    'use strict';

    var baseEmit;
    var mutedPlayers = [];
    var chatDiv = jQuery('#chatHistory');

    function addToTagProReady(func) {
        if (tagpro !== undefined) {
            tagpro.ready(func);
        } else {
            setTimeout(function() { addToTagProReady(func); }, 0);
        }
    }

    function getPlayerList() {
        return Object.keys(tagpro.players).map(function(id) {
            return tagpro.players[id];
        });
    }

    function executeCommand(command, action, text) {
        var playerName = text.split(command).slice(1).join();
        console.log(playerName);
        var tagproPlayers = getPlayerList();
        var matchedPlayers = tagproPlayers.filter(function(player) {
            return playerName.trim() === player.name;
        });
        matchedPlayers.map(function(player) {
            return player.id;
        }).forEach(action);
    }

    var muteCommand = executeCommand.bind(null, '/m', function(playerId) {
        mutedPlayers.push(playerId);
        var playerNames = getPlayerNamesFromId(playerId);
        if (playerNames !== null) {
            playerNames.forEach(function(playerName) {
                insertChat('Muted ' + playerName);
            });
        }
    });

    var unmuteCommand = executeCommand.bind(null, '/u', function(playerId) {
        mutedPlayers = mutedPlayers.filter(function(elem) {
            return playerId !== elem;
        });
        var playerNames = getPlayerNamesFromId(playerId);
        if (playerNames !== null) {
            playerNames.forEach(function(playerName) {
                insertChat('Unmuted ' + playerName);
            });
        }
    });

    function newEmit(emitType, data) {
        if (emitType === 'chat') {
            var message = data.message;
            if (message.startsWith('/m')) {
                muteCommand(message);
                return;
            } else if (message.startsWith('/u')) {
                unmuteCommand(message);
                return;
            }
        }
        baseEmit(emitType, data);
    }

    function getPlayerNamesFromId(playerId) {
        var tagproPlayers = getPlayerList();
        var matchedNames = tagproPlayers.filter(function(player) {
            return player.id === playerId;
        }).map(function(player) {
            return player.name;
        });
        if (matchedNames === null || matchedNames === undefined || matchedNames.length === 0) {
            return null;
        }
        return matchedNames;
    }

    function insertChat(text) {
        var message = jQuery('<div><span class="auth"></span><span class="name"></span><span class="message"></span></div>');
        message.find('.message').text(text);
        message.appendTo(chatDiv);
    }

    function handleChat(chat) {
        if (mutedPlayers.indexOf(chat.from) > -1) {
            var playerNames = getPlayerNamesFromId(chat.from);
            if (playerNames !== null) {
                playerNames.forEach(function(playerName) {
                    chatDiv.find('.name:contains(' + playerName + ')').parent().remove();
                });
            }
        }
    }

    function main() {
        baseEmit = tagpro.socket.emit;
        tagpro.socket.emit = newEmit;
        tagpro.socket.on('chat', handleChat);
    }

    addToTagProReady(main);
})();