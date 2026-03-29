/**
 * Created by joepm.hsu on 2017/3/20.
 */
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        videoId: 'YzRic89tqKY',
        playerVars: {controls: '1', rel: '0'},
        events: {
            'onStateChange': onPlayerStateChange
        }
    });
}


var done = false;

function onPlayerStateChange(event) {
    //console.log(event);
    if (event.data == YT.PlayerState.PLAYING) {
    }

    if (event.data == YT.PlayerState.ENDED) {
        //$('#mainCont').trigger('VIDEO_END');
    }
}


function playerSetVol() {
    player.unMute();
    player.setVolume(10);
}

function playVideo() {
    player.playVideo();
}

function stopVideo() {
    player.stopVideo();
}

function pauseVideo() {
    player.pauseVideo();
}
