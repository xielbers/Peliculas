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
    
    filmSrc = `https://drive.google.com/file/d/${videoId}/preview`;

    iframe.style.display = 'flex';
    iframe.src = filmSrc;

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