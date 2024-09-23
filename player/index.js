if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('../sw.js').then(function(registration) {
            console.log('Service Worker registrado con éxito:', registration.scope);
        }).catch(function(error) {
            console.log('Error al registrar el Service Worker:', error);
        });
    });
}

document.addEventListener('DOMContentLoaded', function () {
    var videoId = localStorage.getItem('videoId');
    var iframe = document.getElementById('playerIframe');

    // Verificar si el iframe y el videoId existen
    if (!iframe) {
        console.error("No se encontró el iframe con ID 'playerIframe'.");
        return;
    }

    if (videoId) {
        // Cargar el video desde Google Drive sin lógica de tiempo
        iframe.src = 'https://drive.google.com/file/d/' + videoId + '/preview';
    } else {
        alert('No se encontró el ID del video.');
        window.location.href = '../index.html';
    }
});
