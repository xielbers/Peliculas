if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('../sw.js').then(function(registration) {
        console.log('Service Worker registrado con éxito:', registration.scope);
      }).catch(function(error) {
        console.log('Error al registrar el Service Worker:', error);
      });
    });
  }
  
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
      videoSrc = `https://pixeldrain.com/api/file/${videoId}`;
      video.src = filmSrc;
      video.style = 'display: flex';
    } else if (plataforma === 'drive') {
      videoSrc = `https://drive.google.com/file/d/${videoId}/preview`;
      iframe.src = filmSrc;
      iframe.style = 'display: flex';
    } else {
      console.error(`Plataforma '${plataforma}' no reconocida.`);
      return;
    }
  });