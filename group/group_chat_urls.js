/*
 * Group Chat URLs by Ruud
 * =======================
 *
 * Makes URLs posted in group chat clickable.
 * I recommend just taking the important lines and
 * stuffing them into the existing chat callback
 * because this is awful and probably breaks existing scripts.
 */
{
    tagpro.group.socket._callbacks.chat[0] = e => {
        e.message = e.message.replace(/[<>]/g, x => {
            return x == '<' ? '&lt;' : '&gt;';
        }).replace(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/g, url => {
            return '<a target="_blank" href="' + url + '">' + url + '</a>';
        });
        
        // took this from the minified gobal-group.js
        var t = $(".js-chat-log");
        if (e.from)
            var n = $("<span></span>").addClass("player-name").text(e.from + ": ");
        var r = $("<span></span>").html(e.message).addClass("chat-message");
        $("<div></div>").addClass("chat-line").append(n).append(r).appendTo(t),
        t.scrollTop(t.get(0).scrollHeight)
    };
}