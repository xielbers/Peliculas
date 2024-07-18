document.addEventListener('DOMContentLoaded', function() {
    var videoId = localStorage.getItem('videoId');
    var video = document.getElementById('playerVideo');
    var playPauseBtn = document.getElementById('playPauseBtn');
    var timeDisplay = document.getElementById('timeDisplay');
    var currentTimeDisplay = document.getElementById('currentTime');
    var totalDurationDisplay = document.getElementById('totalDuration');
    var seekBarFill = document.getElementById('seekBarFill');
    var seekBarHandle = document.getElementById('seekBarHandle');
    var controls = document.getElementById('controls');

    let hideControlsTimeout;

    function resetHideControlsTimeout() {
        clearTimeout(hideControlsTimeout);
        controls.style.opacity = '1';
        hideControlsTimeout = setTimeout(function() {
            controls.style.opacity = '0';
        }, 5500);
    }

    document.addEventListener('mousemove', resetHideControlsTimeout);
    document.addEventListener('touchstart', resetHideControlsTimeout);

    resetHideControlsTimeout();

    if (videoId) {
        video.src = 'https://pixeldrain.com/api/file/' + videoId;

        video.addEventListener('loadedmetadata', function() {
            var duration = video.duration;
            var durationFormatted = formatTime(duration);
            totalDurationDisplay.textContent = durationFormatted;
        });

        var savedTime = localStorage.getItem('videoTime_' + videoId);
        if (savedTime) {
            var seekTime = parseFloat(savedTime) - 15;
            video.currentTime = seekTime > 0 ? seekTime : 0;
        }

        video.play();

        video.addEventListener('timeupdate', function() {
            var currentTime = video.currentTime - 15;
            var currentTimeFormatted = formatTime(currentTime);
            currentTimeDisplay.textContent = currentTimeFormatted;

            var progress = (video.currentTime / video.duration) * 100;
            seekBarFill.style.width = progress + '%';
            seekBarHandle.style.left = progress + '%'; // Mover el manejador junto con el progreso
        });

        video.addEventListener('ended', function() {
            localStorage.removeItem('videoTime_' + videoId);
        });
    } else {
        alert('No se encontró el ID del video.');
    }

    playPauseBtn.addEventListener('click', function() {
        if (video.paused) {
            video.play();
            playPauseBtn.textContent = 'Pause';
        } else {
            video.pause();
            playPauseBtn.textContent = 'Play';
        }
    });

    document.addEventListener('keydown', function(event) {
        var duration = video.duration;

        if (event.key === 'ArrowLeft') {
            // Retroceder 10 segundos
            video.currentTime -= 10;
        } else if (event.key === 'ArrowRight') {
            // Avanzar 10 segundos
            video.currentTime += 10;
        } else if (event.key === 'ArrowUp') {
            // Aumentar volumen
            if (video.volume < 1) {
                video.volume += 0.1;
            }
        } else if (event.key === 'ArrowDown') {
            // Disminuir volumen
            if (video.volume > 0) {
                video.volume -= 0.1;
            }
        } else if (event.key === ' ') {
            // Play/Pause con la barra espaciadora
            if (video.paused) {
                video.play();
                playPauseBtn.textContent = 'Pause';
            } else {
                video.pause();
                playPauseBtn.textContent = 'Play';
            }
        }
    });

    function formatTime(time) {
        var hours = Math.floor(time / 3600);
        var minutes = Math.floor((time % 3600) / 60);
        var seconds = Math.floor(time % 60);
        
        var formattedTime = '';

        if (hours > 0) {
            formattedTime += hours + ':';
        }
        
        formattedTime += (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;

        return formattedTime;
    }
});
