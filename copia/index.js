document.addEventListener('DOMContentLoaded', function() {
    var videoId = localStorage.getItem('videoId');
    var video = document.getElementById('playerVideo');
    var playPauseBtn = document.getElementById('playPauseBtn');
    var hoursInput = document.getElementById('hoursInput');
    var minutesInput = document.getElementById('minutesInput');
    var secondsInput = document.getElementById('secondsInput');
    var seekBtn = document.getElementById('seekBtn');
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
            var durationInSeconds = video.duration;

            // Calcular y establecer el límite máximo de horas
            var maxHours = Math.floor(durationInSeconds / 3600);
            hoursInput.max = maxHours;
            hoursInput.disabled = false;

            // Ocultar input de horas si el máximo es 0
            if (maxHours === 0) {
                hoursInput.style.display = 'none';
            }

            // Limitar los minutos si el video es menor a 1 hora
            if (durationInSeconds < 3600) {
                minutesInput.max = Math.floor((durationInSeconds % 3600) / 60);
            }
        });

        var savedTime = localStorage.getItem('videoTime_' + videoId);
        if (savedTime) {
            var seekTime = parseFloat(savedTime) - 15;
            video.currentTime = seekTime > 0 ? seekTime : 0;
        }

        video.play();

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

    playPauseBtn.addEventListener('click', function() {
        if (video.paused) {
            video.play();
            playPauseBtn.textContent = 'Pause';
        } else {
            video.pause();
            playPauseBtn.textContent = 'Play';
        }
    });

    seekBtn.addEventListener('click', function() {
        var hours = parseFloat(hoursInput.value) || 0;
        var minutes = parseFloat(minutesInput.value) || 0;
        var seconds = parseFloat(secondsInput.value) || 0;

        // Limitar los valores de minutos y segundos según la duración del video
        var durationInSeconds = video.duration;
        if (durationInSeconds < 3600) {
            hours = 0;
            hoursInput.value = 0;
        }
        if (durationInSeconds < 60) {
            minutes = 0;
            minutesInput.value = 0;
        }
        if (minutes > 59) {
            minutes = 59;
            minutesInput.value = 59;
        }
        if (seconds > 59) {
            seconds = 59;
            secondsInput.value = 59;
        }

        var seekTime = (hours * 3600) + (minutes * 60) + seconds;

        if (!isNaN(seekTime) && seekTime >= 0 && seekTime <= durationInSeconds) {
            video.currentTime = seekTime;
        }
    });
});
