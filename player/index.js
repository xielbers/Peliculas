if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
        .then(function(registration) {
            console.log('Service Worker registered with scope:', registration.scope);

            // Send message to Service Worker to cache the video
            var videoId = localStorage.getItem('videoId');
            if (videoId) {
                registration.active.postMessage({
                    action: 'cacheVideo',
                    videoId: videoId
                });
            }
        })
        .catch(function(error) {
            console.log('Service Worker registration failed:', error);
        });
}

document.addEventListener('DOMContentLoaded', function() {
    var videoId = localStorage.getItem('videoId');
    var video = document.getElementById('playerVideo');

    if (videoId) {
        video.src = 'https://drive.google.com/file/d/' + videoId + '/preview';

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
        window.location.href = '../index.html';
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
            case ' ':
                if (video.paused) {
                    video.play();
                } else {
                    video.pause();
                }
                break;
        }
    });

    window.addEventListener('beforeunload', function(event) {
        event.preventDefault();
        event.returnValue = '¿Seguro que quieres salir de la página?';
    });
});
