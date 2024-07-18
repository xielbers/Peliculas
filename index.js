function VideoID(videoId) {
    localStorage.setItem('videoId', videoId);
    window.location.href = 'player/player.html';
}

function VideoClear(videoId) {
    localStorage.removeItem('videoTime_' + videoId);
    alert('Tiempo guardado eliminado.');
}