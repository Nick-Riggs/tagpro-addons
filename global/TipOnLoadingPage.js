//**************************************//
//            TagProRandomTips          //
//             by Capernicus            //
// Adds random tip to game loading page //
//**************************************//

var tips = [
	"When chasing the opponent's' flag carrier, always stay between him and the empty flag tile.",
	"Nobody on regrab? Get on regrab. Somebody on regrab? Chase your own flag.",
	"You're not trying to return the flag as much as you are trying to prevent the opposition from scoring.", "Pushing harder doesn't make you go faster.",
	"If you have the flag, it's not always best to try and cap ASAP. Be patient and wait for your team to put in blocks.",
	"Always have two people stay in base to defend and prevent the other team from taking your flag.",
	"If your team has successfully taken the other team’s flag, stay near their base to be able to immediately take it again if your flag carrier dies, so the other team won't be able to score.",
	"If you are chasing down the flag carrier, pay attention to your speed. If you move too fast, you might move out way too far when the flag carrier slows down, allowing them to juke you.",
	"Try to not grab the flag when the opponents have taken your flag and they are near their flag. If you die, there will be one less person to try to tag them.",
	"If there are not 8 people in a game when you join yet, you might want to just wait for more players to join the game to make it fair.", "Powerups respawn one minute after they are last picked up. If you pay attention to the game clock while taking one, you will be able to be there again when it respawns and take it again.",
	"Try to never grab the flag when you have a tagpro powerup as it's not necessary. Instead, you want to try to kill their defenders to give another attacker an easy grab.",
	"A rolling bomb powerup works as a one-time shield when you are carrying the flag. If someone on your team has the powerup, let them take the flag.",
	"Tiles in the color of your team will allow you to move a lot faster. If you are chasing down an attacker, try to take a route along these team tiles to get ahead of them.",
	"Boosts respawn 10 seconds after they are used. Bombs respawn after 30 seconds and powerups after 1 minute.",
	"You can press escape to show the scoreboard, containing all kinds of statistics for all players.",
	"You can go to the groups page to team up with some friends to play TagPro together.",
	"After a game, you will get a certain amount of rank points. At the end of a day, the top three scoring players in total rank points for that period will get a special flair.",
	"You can set a name and a flair on the profile page.",
	"If your reserved name is the same as your displayed name, your name will turn green and have a check mark in chat.",
	"By winning a certain amount of games, you can level up. Getting to a higher degree will show other people that you are more skilled and at certain degrees you will unlock special flairs.",
	"If you like the game, you should definitely come to the /r/TagPro subreddit and check out the awesome community!",
	"TagPro has a few servers on the voice chat (microphone is not needed though) server Mumble, you should get on there if you want to play some serious games.",
	"If you see someone break a rule you can report them by clicking on their ball, their name in chat or the report button on the scoreboard.",
	"If someone reports you and you think that you shouldn't be, you can go to IRC #TPmods on freenode to have moderators remove the report for you.",
	"Don't get mad at your team for doing things wrong! Instead, give them tips on how to improve on playing the game, so they can get better."
];

// Find spot in DOM to place tip
function findInputSpot() {
	SS = $('.joiner');
	for (var i = 0; i < SS.length; i ++) {
		var textcontent = SS[i].innerText || SS[i].textContent;
		if (textcontent.search('Looking') >= 0) {
			return SS[i];
		}
	}
	return false;
}

// Places random tip in proper spot in DOM
function placeTip() {
		var random = parseInt(Math.random() * tips.length);
		var randTip = tips[random];
		inputSpot = $(findInputSpot());
		inputSpot.before( "<center><p id='headText'></p></center>" );
		$("#headText").text(randTip);
		$("#headText").css({"color": "#2ECC40", "font-size": "140%", "word-wrap": "break-word", "width": "65%"});
}

// If we are in loading page, try place the tip
if (document.URL.search('games/find')>=0) {
	placeTip();
}
