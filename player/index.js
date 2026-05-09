document.addEventListener('DOMContentLoaded', function() {

  var videoId = localStorage.getItem('videoId');
  var iframe = document.getElementById('playerIframe');
  var video = document.getElementById('playerVideo');

  if (!videoId) {
    alert('No se encontró el ID del video.');
    window.location.href = '../index.html';
    return;
  }

  const plataforma = localStorage.getItem('plataforma');
  let filmSrc;

  // ================= MEDIAFIRE =================

  if (plataforma === 'mediafire') {

    filmSrc = `${videoId}`;

    video.style.display = 'flex';
    video.src = filmSrc;

    const uniqueKey = `${videoId}_${plataforma}`;
    const savedTime = localStorage.getItem(uniqueKey);

    if (savedTime) {

      video.addEventListener('loadedmetadata', function() {
        video.currentTime = parseFloat(savedTime);
      });

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

    video.addEventListener('timeupdate', function() {

      var currentTime = video.currentTime - 15;

      localStorage.setItem(
        uniqueKey,
        currentTime > 0 ? currentTime : 0
      );

    });

    video.addEventListener('ended', function() {
      localStorage.removeItem(uniqueKey);
    });

  }

  // ================= DRIVE =================

  else if (plataforma === 'drive') {

    const uniqueKey = `${videoId}_${plataforma}`;
    const savedTime = localStorage.getItem(uniqueKey);

    let startTime = '';

    if (savedTime) {
      startTime = `?t=${Math.floor(savedTime)}`;
    }

    filmSrc = `https://drive.google.com/file/d/${videoId}/preview?t=${startTime}`;

    iframe.style.display = 'flex';
    iframe.src = filmSrc;

    // Guardar tiempo manualmente
    // Necesitas enviar el tiempo desde el iframe usando postMessage
    // porque Google Drive bloquea acceso directo al video

    window.addEventListener('message', function(event) {

      if (event.data.currentTime) {

        var currentTime = event.data.currentTime - 15;

        localStorage.setItem(
          uniqueKey,
          currentTime > 0 ? currentTime : 0
        );

      }

      if (event.data.ended) {
        localStorage.removeItem(uniqueKey);
      }

    });

  }

  // ================= FILESFM =================

  else if (plataforma === 'filesfm') {

    filmSrc = `https://files.fm/f/${videoId}?hide_header=true&hide_menus=true`;

    iframe.style.display = 'flex';
    iframe.src = filmSrc;

  }

  else {

    console.error(`Plataforma '${plataforma}' no reconocida.`);
    return;
  }

  window.addEventListener('beforeunload', function(event) {

    if (video) {
      video.pause();
    }

    event.preventDefault();
    event.returnValue = '';

  });

});