//**************************************//
//            TagProRandomTips          //
//             by Capernicus            //
// Adds random tip to game loading page //
//**************************************//

$(document).ready(function() {
    var num = 0;
    var tips = [
        "When chasing the opponent's flag carrier, try to stay between them and the flag tile.",
        "Nobody on regrab? Get on regrab. Somebody on regrab? Chase the player holding your flag!",
        "Pressing your keys harder doesn't make you go faster. Don't break your keyboard!",
        "When you have the flag, timing is important. Be patient and wait for your team to set up blocks.",
        "Have two people stay on defense to prevent the other team from taking your flag.",
        "Watch your speed when chasing. If you move too fast you might overcommit. Too slow and they'll go right past you!",
        "Try to not grab the flag when the opponents are coming in to cap. If you die there's one less person to stop them!",
        "For a fair game, consider waiting if there are fewer than 6 players.",
        "A powerup respawns exactly one minute after it was last picked up.",
        "When you have a tagpro on offense, let your teammate grab the flag. You can protect him with the tagpro!",
        "The rolling bomb powerup works as a one-time shield when you're carrying the flag.",
        "Your speed is increased while you're rolling on tiles of your color.",
        "Boosts respawn 10 seconds after they are used. Bombs respawn after 30 seconds. Powerups after 60 seconds.",
        "Press Escape to show the scoreboard, and to hide it.",
        "You can go to the <a href='/groups'>Groups</a> page to team up with some friends and play TagPro together.",
        "Rank points contribute to your score on the <a href='/boards'>Leaderboard</a>.",
        "You can change your name and pick a flair on the Profile page.",
        "If your Reserved Name is the same as your Displayed Name, your name will be green and have a check mark next to it.",
        "Earn degrees&deg; by winning games and unlock cool flairs.",
        "Check out the <a href='https://reddit.com/r/tagpro'>/r/TagPro subreddit</a> to read the news or hang out!",
        "Meet TagPro players on our <a href='https://reddit.com/r/tagpro/wiki/mumble'>voice-chat Mumble servers</a>. Microphone not required!",
        "If someone is being abusive to anyone, report them! Click on their ball, or their name in chat, or click Report on the scoreboard (Esc).",
        "Don't lash out on your team. Be understanding and supportive <3",
        "Team tiles don't make you go faster if you're the flag carrier (FC).",
        "In a neutral flag game if you're trapped in your base, you can pop yourself to reset the flag.",
        "Be mindful of when your powerup is going to run out. Powerups last for 20 seconds.",
        "Leave the rolling bomb powerup for your flag carrier if they are near.",
        "Use boosts, bombs and powerups to disrupt the enemy defense and grab the flag.",
        "After grabbing the flag you have 0.25 seconds of immunity!",
        "The slower you move, the quicker you can change direction to juke out the enemies.",
        "Don't guard your empty base. It's often better to help chase the flag carrier.",
        "Use walls to quickly change direction.",
        "If you start to become frustrated take a break!"
        "Press Enter to chat to everyone, or T to chat with your team."
        "Don't stand still for 30 seconds or the game will kick you out, thinking you're away from keyboard (AFK)."
        "If you wrongfully get reported, don't worry. It takes 8 reports in 24 hours for them to have an effect."
        "Learn how to enhance your gameplay experience on our <a href='https://www.reddit.com/r/TagPro/wiki/modding'>wiki page</a>!"
        "Save your favorite moments with the magical <a href='https://www.reddit.com/r/TagPro/wiki/tagpro_replays_extension'>Replays extension.</a>"
        "Change the look of your game on the <a href='/textures'>Texture Packs</a> tab."
        "If you have a small screen, you may want to Enable Viewport Scaling in the Settings."
        
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


