document.addEventListener('DOMContentLoaded', function() {
    var videoId = localStorage.getItem('videoId');
    if (videoId) {
        var video = document.getElementById('playerVideo');
        video.src = 'https://pixeldrain.com/api/file/' + videoId;

        // Obtener el tiempo de reproducción guardado
        var savedTime = localStorage.getItem('videoTime_' + videoId);
        if (savedTime) {
            var seekTime = parseFloat(savedTime) - 15;
            video.currentTime = seekTime > 0 ? seekTime : 0;
        }

        video.play();

        // Guardar el tiempo de reproducción cada 5 segundos
        video.addEventListener('timeupdate', function() {
            var currentTime = video.currentTime - 15;
            localStorage.setItem('videoTime_' + videoId, currentTime > 0 ? currentTime : 0);
        });

        // Limpiar el tiempo de reproducción guardado cuando el video termina
        video.addEventListener('ended', function() {
            localStorage.removeItem('videoTime_' + videoId);
        });
    } else {
        alert('No se encontró el ID del video.');
    }
});