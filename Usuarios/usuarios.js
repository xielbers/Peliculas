if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('../sw.js').then(function(registration) {
        console.log('Service Worker registrado con éxito:', registration.scope);
      }).catch(function(error) {
        console.log('Error al registrar el Service Worker:', error);
      });
    });
  }
  
  let aElements = document.getElementsByTagName('a');
  document.addEventListener('click', aElements = function() {
    event.preventDefault();
  });

  function VideoID(videoId, plataforma) {
    localStorage.setItem('videoId', videoId);
  
    // Determina la URL del video según la plataforma
    let videoUrl;
    if (plataforma.toLowerCase() === 'pixeldrain') {
      videoUrl = `https://pixeldrain.com/api/file/${videoId}`; // Reemplaza con el formato de URL de Pixeldrain
    } else if (plataforma.toLowerCase() === 'drive') {
      videoUrl = `https://drive.google.com/file/d/${videoId}/preview`;
    } else {
      console.error(`Plataforma '${plataforma}' no reconocida.`);
      return; // Maneja la plataforma no válida
    }
  
    localStorage.setItem('plataforma', plataforma);
    window.location.href = '../player/player.html';
  }
  
  function VideoClear() {
    const videoId = localStorage.getItem('videoId');
    const plataforma = localStorage.getItem('plataforma');
  
    // Construir una clave única combinando el videoId y la plataforma
    const uniqueKey = `${videoId}_${plataforma}`;
  
    localStorage.removeItem(uniqueKey);
    alert('Tiempo guardado eliminado.');
  }
  
  let savedPass = localStorage.getItem('pass');
  let currentLocation = window.location.href;
  
  function Check() {
    // Si no hay ninguna contraseña en localStorage, redirigir inmediatamente a index.html
    if (!savedPass) {
        window.location.href = '../index.html'; // Redirigir si no hay contraseña almacenada
        return;
    }

    // Si la contraseña es '110528' y el usuario ya está en main.html, no hacer nada
    if (savedPass == '110528' && currentLocation.includes('main.html')) {
        return;
    }

    // Si la contraseña es '298465' y el usuario ya está en edith.html, no hacer nada
    if (savedPass == '298465' && currentLocation.includes('edith.html')) {
        return;
    }

    // Si la contraseña es '110528' pero no está en main.html, redirigir a main.html
    if (savedPass == '110528' && !currentLocation.includes('main.html')) {
        window.location.href = 'Usuarios/main.html';
        return;
    }

    // Si la contraseña es '298465' pero no está en edith.html, redirigir a edith.html
    if (savedPass == '298465' && !currentLocation.includes('edith.html')) {
        window.location.href = 'Usuarios/edith.html';
        return;
    }

    // Si la contraseña es '298465' y el usuario ya está en edith.html, no hacer nada
    if (savedPass == '995434' && currentLocation.includes('tecnica.html')) {
      return;
    }
  
    // Si la contraseña es '110528' pero no está en main.html, redirigir a main.html
    if (savedPass == '995434' && !currentLocation.includes('tecnica.html')) {
      window.location.href = 'Usuarios/main.html';
      return;
    }

    // Si la contraseña es incorrecta, redirigir a index.html
    window.location.href = '../index.html';
}

  function LogOut() {
    localStorage.clear('pass');
    window.location.reload();
  }

// Asignar la función Check al evento window.onload correctamente
window.onload = Check;
