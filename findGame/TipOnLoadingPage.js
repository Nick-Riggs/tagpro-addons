//**************************************//
//            TagProRandomTips          //
//             by Capernicus            //
// Adds random tip to game loading page //
//**************************************//

$(document).ready(function() {
    var num = 0;
    var tips = [
        "When chasing the opponent's flag carrier always stay between them and the flag tile.",
        "Nobody on regrab? Get on regrab. Somebody on regrab? Chase the player holding your flag.",
        "Pressing your keys harder doesn't make you go faster. Don't break your keyboard!",
        "When you have the flag, it's not always best to cap quickly. Be patient and wait for your team to put in blocks.",
        "Always have two people stay in base to prevent the other team from taking your flag.",
        "Stay near the opponent's base so you can regrab the flag if your teammate pops.",
        "Watch your speed when chasing. Move too fast and you might overcommit. Too slow and they'll go right past you!",
        "Try to not grab the flag when the opponents are coming in for a capture. If you die there will be one less person to try and stop them.",
        "Consider waiting if there aren't 8 players in the game to make things fair.",
        "Powerups respawn one minute after they are last picked up.",
        "When you have a tagpro on offense let a teammate pick up the flag and focus on clearing a path.",
        "A rolling bomb powerup works as a one-time shield when you're carrying the flag.",
        "Rolling on tiles of your color make you move a lot faster.",
        "Boosts respawn 10 seconds after they are used. Bombs respawn after 30 seconds. Powerups after 1 minute.",
        "You can press escape to show the scoreboard.",
        "You can go to the <a href='/groups'>groups</a> page to team up with some friends and play TagPro together.",
        "Rank points contribute to your score on the <a href='/boards'>leaderboard</a>.",
        "You can set a name and choose a flair on the profile page.",
        "If your reserved name is the same as your displayed name, your name will turn green and have a check mark next to it.",
        "Earn degrees&deg; by winning games and unlock cool flairs.",
        "Check out the <a href='https://reddit.com/r/tagpro'>/r/TagPro subreddit</a> to read the latest news!",
        "Meet TagPro players on our <a href='https://reddit.com/r/tagpro/wiki/mumble'>voice-chat mumble servers</a>. Microphone not required.",
        "If you see someone break a rule you can report them by clicking on their ball, their name in chat or the report button on the scoreboard.",
        "Don't get mad at your team! Instead, give them tips on how to improve.",
        "Team tiles don't make you go faster if you're holding the flag.",
        "When you're trapped in your end zone in a neutral flag game, pop yourself to reset the flag.",
        "Be mindful of when your powerup is going to run out. Powerups last for 20 seconds.",
        "Leave the rolling bomb powerup for your flag carrier if they are nearby.",
        "When you are trying to grab the flag, use boosts, bombs, and powerups to disrupt the enemy defense.",
        "You have 0.25 seconds of immunity after grabbing the flag. Use this to your advantage.",
        "If you move slowly, you can change directions faster and have a better chance of juking enemies.",
        "Don't guard an empty base! Return the flag.",
        "Walls can be used to quickly change direction when you are trying to juke other players.",
        "Have fun! If you're on a losing streak or getting frustrated then take a break."
    ];

    // Places random tip in proper spot in DOM
    function placeTip() {
        var random = Math.floor(Math.random() * tips.length);
        var randTip = tips[random];
        var inputSpot = $(".spinner");
        var headText = $("<div class='col-md-6 col-md-offset-3' style='margin-top: 20px;'></div>")
            .insertAfter(inputSpot)
            .wrapAll("<div class='row'></div>");

        headText.html(
            "<div style='position: relative;padding-left: 40px; margin-left: 20px;'>"
            + randTip
            + "<div style='position: absolute; left: 0; top: 0; bottom: 0;'>"
            +  "<strong>Tip</strong>:</div>"
            + "</div>");
    }

    placeTip();
});


