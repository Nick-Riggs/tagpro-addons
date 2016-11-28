//**************************************//
//            TagProRandomTips          //
//             by Capernicus            //
// Adds random tip to game loading page //
//**************************************//

var tips = [
	"When chasing the opponent's flag carrier, always stay between them and the empty flag tile.",
	"Nobody on regrab? Get on regrab. Somebody on regrab? Chase the player holding your flag.",
	"You're not trying to return the flag as much as you are trying to prevent the opposition from scoring.",
	"Pressing your keys harder doesn't make you go faster, don't break your keyboard!",
	"If you have the flag, it's not always best to try and cap quickly. Be patient and wait for your team to put in blocks.",
	"Always have two people stay in base to defend and prevent the other team from taking your flag.",
	"If your offense partner has successfully taken the other team’s flag, stay near the opponent's base so you can regrab the flag if gets popped.",
	"Pay attention to your speed when chasing down the flag carrier. Move too fast and you might overcommit allowing them to juke you. Too slow and they'll go right past you!",
	"Try to not grab the flag when the opponents are coming in for a capture. If you die there will be one less person to try and stop them.",
	"Consider waiting if there are not 8 players in the game yet to make things fair.",
	"Powerups respawn one minute after they are last picked up. If you pay attention to the game clock while taking one, you will be able to be there when it respawns and take it again.",
	"Instead of grabbing the flag when you have a tagpro powerup, try to pop the defenders to give another attacker an easy grab.",
	"A rolling bomb powerup works as a one-time shield when you are carrying the flag. If someone on your team has the powerup, let them take the flag.",
	"Rolling on tiles of your color make you move a lot faster. If you are chasing down an attacker, try to take a route along these team tiles to catch up.",
	"Boosts respawn 10 seconds after they are used. Bombs respawn after 30 seconds and powerups after 1 minute.",
	"You can press escape to show the scoreboard which contains all kinds of statistics for all players.",
	"You can go to the groups page to team up with some friends and play TagPro together.",
	"After each game you will recieve a certain amount of rank points. At the end of a day, the top three scoring players in total rank points for that period will get a special flair.",
	"You can set a name and choose a flair on the profile page.",
	"If your reserved name is the same as your displayed name, your name will turn green and have a check mark next to it.",
	"After winning a certain amount of games you will level up. Getting to a higher degree will show others you're skilled and will unlock special flairs for you.",
	"If you like the game check out the /r/TagPro subreddit to keep up with the latest news!",
	"TagPro has a few servers on the voice chat server Mumble, you should get on there if you want to play some serious games and meet fellow players (microphone not needed).",
	"If you see someone break a rule you can report them by clicking on their ball, their name in chat or the report button on the scoreboard.",
	"If someone gives you a false report you can go to IRC #TPmods on freenode to have moderators remove the report for you.",
	"Don't get mad at your team for doing things wrong! Instead, give them tips on how to improve on playing the game so they can get better."
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
