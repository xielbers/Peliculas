document.addEventListener('DOMContentLoaded', function() {
  var videoId = localStorage.getItem('videoId');
  var iframe = document.getElementById('playerIframe');
  var video = document.getElementById('playerVideo');

  // Maneja la falta videoId

  if (!videoId) {
    alert('No se encontró el ID del video.');
    window.location.href = '../index.html';
    return;
  }

  // Usa la plataforma almacenada en localStorage para determinar la fuente del video
  const plataforma = localStorage.getItem('plataforma');
  let filmSrc;

  if (plataforma === 'pixeldrain') {
    // Reemplazar con el código de inserción de Pixeldrain (si corresponde)
    filmSrc = `https://pixeldrain.com/api/file/${videoId}`;
    video.src = filmSrc;
    video.style = 'display: flex';

    // Obtener el tiempo guardado
    const uniqueKey = `${videoId}_${plataforma}`;
    const savedTime = localStorage.getItem(uniqueKey);

    // Si hay un tiempo guardado, establecerlo como el tiempo actual
    if (savedTime) {
      video.currentTime = savedTime;
    }

    // Agregar los controles de teclado
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

      // Guardar el tiempo cada 15 segundos
      setInterval(() => {
        localStorage.setItem(uniqueKey, video.currentTime);
      }, 15000);
    });
  } else if (plataforma === 'drive') {
    filmSrc = `https://drive.google.com/file/d/${videoId}/preview`;
    iframe.src = filmSrc;
    iframe.style = 'display: flex';
  } else {
    console.error(`Plataforma '${plataforma}' no reconocida.`);
    return;
  }

  window.addEventListener('beforeunload', function(event) {
    event.preventDefault();
    event.returnValue = '¿Seguro que quieres salir de la página?';
  });
});