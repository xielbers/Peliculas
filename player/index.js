document.addEventListener('DOMContentLoaded', function() {
    var videoId = localStorage.getItem('videoId');
    if (videoId) {
        var video = document.getElementById('playerVideo');
        video.src = 'https://pixeldrain.com/api/file/' + videoId;
        video.play();
    } else {
        alert('No se encontró el ID del video.');
    }
});