// ==UserScript==
// @name          TagPro Team Count Indicator
// @version       1.2
// @author        browncoat, modified by bash#
// @description   Indicates the number of players on each team with ball icons next to the score
// @include       http://tagpro-*.koalabeast.com:*
// @include       http://tangent.jukejuice.com*
// @include       http://*.newcompte.fr*
// ==/UserScript==

tagpro.ready(function () {

    function createBallIndicators(ballTile, totalBalls) {
        var parent = new PIXI.DisplayObjectContainer();

        function alphaForBall(i) {
            return totalBalls >= i ? 1 : 0.25
        }

        var size = 20;
        var gap = 2;
        tagpro.tiles.draw(parent, ballTile, { x: 0,           y: 0          }, size, size, alphaForBall(1));
        tagpro.tiles.draw(parent, ballTile, { x: size + gap,  y: 0          }, size, size, alphaForBall(2));
        tagpro.tiles.draw(parent, ballTile, { x: 0,           y: size + gap }, size, size, alphaForBall(3));
        tagpro.tiles.draw(parent, ballTile, { x: size + gap,  y: size + gap }, size, size, alphaForBall(4));
        return parent;
    }

    var prevRed = -1;
    var prevBlue = -1;
    var prevWidth = -1;
    var prevHeight = -1;

    var updateUi = tagpro.ui.update;
    tagpro.ui.update = function () {
        updateUi();

        if (!tagpro.ui.sprites.ballIndicators) {
            tagpro.ui.sprites.ballIndicators = new PIXI.DisplayObjectContainer();
        }


        var redPlayers = 0;
        var bluePlayers = 0;
        for (var playerId in tagpro.players) {
            if (tagpro.players.hasOwnProperty(playerId)) {
                if (tagpro.players[playerId].team == 1) {
                    redPlayers++;
                } else {
                    bluePlayers++;
                }
            }
        }

        var viewport = $("#viewport");
        var vpWidth = viewport.width();
        var vpHeight = viewport.height();

        if ((redPlayers == prevRed) && (bluePlayers == prevBlue) && (vpWidth == prevWidth) && (vpHeight == prevHeight)) {
            return;
        }

        prevRed = redPlayers;
        prevBlue = bluePlayers;
        prevWidth = vpWidth;
        prevHeight = vpHeight;

        var red = createBallIndicators("redball", redPlayers);
        red.x = vpWidth / 2 - 120 - red.width;
        red.y = vpHeight - 80;

        var blue = createBallIndicators("blueball", bluePlayers);
        blue.x = vpWidth / 2 + 120;
        blue.y = vpHeight - 80;

        tagpro.renderer.layers.ui.addChild(tagpro.ui.sprites.ballIndicators);
        tagpro.ui.sprites.ballIndicators.removeChildren();
        tagpro.ui.sprites.ballIndicators.addChild(red);
        tagpro.ui.sprites.ballIndicators.addChild(blue);

    }



});