// ==UserScript==
// @name          TagPro Live Player Position
// @version       0.6
// @include       http://*.koalabeast.com:*
// @include       http://*.jukejuice.com:*
// @include       http://*.newcompte.fr:*
// @run-at        document-start
// @grant         none
// @noframes
// ==/UserScript==

(function() {
    'use strict';

    function watchProp(obj, prop, fn) {
        var oldValue = obj[prop];
        if (oldValue) {
            return fn(oldValue);
        }
        Object.defineProperty(obj, prop, {
            get: function() {
                return oldValue;
            },
            set: function(newValue) {
                if (newValue) {
                    delete obj[prop];
                    obj[prop] = newValue;
                    fn(newValue);
                } else {
                    oldValue = newValue;
                }
            },
            enumerable: true,
            configurable: true
        });
    }

    watchProp(window, 'Box2D', function(b2d) {
        watchProp(b2d, 'Dynamics', function(b2dd) {
            watchProp(b2dd, 'b2Body', function() {
                function W() {
                    W.b2Body.apply(this, arguments);
                    if (this.constructor === W) {
                        this.b2Body.apply(this, arguments);
                    }
                    var thisValue = this;
                    watchProp(this, 'player', function(player) {
                        player.livePos = thisValue.m_xf.position;
                    });
                }
                Box2D.Dynamics.b2Body = W;
            });
        });
    });

    watchProp(window, 'tagpro', function(tp) {
        watchProp(tp, 'renderer', function(tpr) {
            watchProp(tpr, 'layers', function(tprl) {
                watchProp(tprl, 'backgroundDrawn', function() {
                    var event = new window.CustomEvent('tagproRendererDone');
                    window.dispatchEvent(event);
                });
            });
        });
    });
})();

var scriptText = '(' + (function() {
    'use strict';

    var tr = tagpro.renderer;

    tr.render = function() {
        requestAnimationFrame(tr.render);
        tagpro.world.update();
        tr.updateGraphics();
        tagpro.ui.update();
        tr.renderer.render(tr.stage);
        tr.measurePerformance();
    };

    var pastTime = performance.now();
    var frameCount = 0;
    tr.measurePerformance = function() {
        if (++frameCount !== 30) {
            return;
        }
        var currentTime = performance.now();
        tagpro.fps = Math.round(30000 / (currentTime - pastTime));
        frameCount = 0;
        pastTime = currentTime;
    };

    var upsp = tr.updatePlayerSpritePosition;
    tr.updatePlayerSpritePosition = function(player) {
        upsp.apply(this, arguments);
        var position = player.livePos || {x: player.x / 100, y: player.y / 100};
        player.sprite.x = position.x * 100;
        player.sprite.y = position.y * 100;
    };

    tr.centerContainerToPoint = function(x, y) {
        var r = tr.options.disableViewportScaling ? 1 : (this.vpHeight / tr.canvas_height).toFixed(2);
        var position;
        var player;
        if (tagpro.viewport.followPlayer) {
            player = tagpro.players[tagpro.playerId];
            position = player.livePos || {x: player.x / 100, y: player.y / 100};
            x = position.x * 100 + 20;
            y = position.y * 100 + 20;
            if (Math.round(position.x) === -100 && Math.round(position.y) === -100) {
                return;
            }
        }
        tr.gameContainer.x = this.vpWidth / 2 - x / tagpro.zoom * r;
        tr.gameContainer.y = this.vpHeight / 2 - y / tagpro.zoom * r;
    };

    tr.updateCameraPosition = function() {
        tr.centerContainerToPoint();
    };
}).toString() + ')();';

window.addEventListener('tagproRendererDone', function() {
    setTimeout(function() {
        var script = document.createElement('script');
        script.textContent = scriptText;
        document.head.appendChild(script);
        document.head.removeChild(script);
    }, 2000);
}, true);
