document.addEventListener('DOMContentLoaded', function() {
    var videoId = localStorage.getItem('videoId');
    var video = document.getElementById('playerVideo');

    if (videoId) {
        video.src = 'https://pixeldrain.com/api/file/' + videoId;

        video.addEventListener('loadedmetadata', function() {
            var savedTime = localStorage.getItem('videoTime_' + videoId);
            if (savedTime) {
                var seekTime = parseFloat(savedTime) - 15;
                video.currentTime = seekTime > 0 ? seekTime : 0;
            }
            video.play();
        });

        video.addEventListener('timeupdate', function() {
            var currentTime = video.currentTime - 15;
            localStorage.setItem('videoTime_' + videoId, currentTime > 0 ? currentTime : 0);
        });

        video.addEventListener('ended', function() {
            localStorage.removeItem('videoTime_' + videoId);
        });
    } else {
        alert('No se encontró el ID del video.');
    }

    document.addEventListener('keydown', function(event) {
        switch (event.key) {
            case 'ArrowLeft':
                video.currentTime -= 10;
                break;
            case 'ArrowRight':
                video.currentTime += 10;
                break;
            case 'Enter':
                if (video.paused) {
                    video.play();
                } else {
                    video.pause();
                }
                break;
        }
    });
});
