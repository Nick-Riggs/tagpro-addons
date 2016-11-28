// AFK Timer
// Displays a visual indicator (countdown timer) as a player is about to be kicked for AFK.
// Author: ballparts


///////////////////////////
// DEV DEFINED VARIABLES //
///////////////////////////

// Color of text - can be hex value or color name (e.g., "white")
var TEXTCOLOR = "#ED0716";

// Opacity of text - 0 is transparent, 1 is opaque
var TEXTOPACITY = 0.7;

// Size of the timer text font in pixels
var TEXTSIZE = 40;

// Where should the text be centered horizontally:
//   0 : all the way to the left
//   1 : all the way to the right
var TEXTLOCATION_HOR = 0.5;

// Where should the text be placed vertically:
//   0 : all the way at the top
//   1 : all the way at the bottom
var TEXTLOCATION_VER = 0.05;

///////////////////////////////
// END DEV DEFINED VARIABLES //
///////////////////////////////




function waitForInitialized(fn) {
    if (!tagpro) {
        setTimeout(function() {
            waitForInitialized(fn);
        }, 10);
    } else {
        fn();
    }
}

waitForInitialized(function() {
    tagpro.ready(function() {

    //////////////////////
    // TIMER TEXT SETUP //
    //////////////////////

    // SET UP TEXT FOR TIMER
    var timerText = tagpro.renderer.prettyText('', TEXTCOLOR);

    // Set up text style
    var textStyle = timerText.style;
    textStyle.align = "center";
    textStyle.fill =  TEXTCOLOR;
    textStyle.font = "bold " + TEXTSIZE + "pt Arial";

    // set opacity
    timerText.alpha = TEXTOPACITY;

    // settings object
    var textSettings = {
        TEXTLOCATION_HOR: TEXTLOCATION_HOR,
        TEXTLOCATION_VER: TEXTLOCATION_VER
    };


    function updateTimerStyle(timerText, newValue, textSettings) {
        // set text value
        timerText.setText(newValue);

        // set location of text
        timerText.x = tagpro.renderer.canvas.width * textSettings.TEXTLOCATION_HOR - timerText.width/2;
        timerText.y = tagpro.renderer.canvas.height * textSettings.TEXTLOCATION_VER;
    }

    //////////////////////////
    // END TIMER TEXT SETUP //
    //////////////////////////

    var lastUpdateTime = Date.now() - 10000;

    function getTimerText(lastUpdateTime) {
        var timeSinceLastUpdate = (Date.now() - lastUpdateTime) / 1000;
        var newTimerText = timeSinceLastUpdate >= 20 ? 30 - Math.floor(timeSinceLastUpdate) : '';
        return newTimerText;
    }

    // add text sprite to TagPro's UI layer
    tagpro.renderer.layers.ui.addChild(timerText);

    // update lastUpdateTime on keydown
    var socketEmit = tagpro.socket.emit;
    
    tagpro.socket.emit = function(event) {
        if (event === 'keydown' || event === 'keyup') {
            lastUpdateTime = Date.now();
        }
        socketEmit.apply(this, arguments);
    };

    // update timer text
    requestAnimationFrame(function updateTimerText() {
        if(tagpro.spectator) return;
        requestAnimationFrame(updateTimerText);
        var newValue = getTimerText(lastUpdateTime);
        updateTimerStyle(timerText, newValue, textSettings);
    });
    });
});
