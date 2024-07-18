function VideoID(videoId) {
    localStorage.setItem('videoId', videoId);
    window.location.href = 'player/player.html';
}

function InAPP(versionCliente) {
    var Elemento = document.getElementById('down');
    var Download = document.getElementById('appActualizacion');

    var versionNecesaria = '18/7/24';
    if(versionCliente == '' || versionCliente == null) {
        location.reload();
    } else {
        // Verificar si el elemento existe y si la versión del cliente es correcta
        if (Elemento && versionCliente === versionNecesaria) {
        // Eliminar el elemento
        Elemento.parentNode.removeChild(Elemento);
        console.log('Versión correcta');
        } else {
        console.error('Versión incorrecta');
        // Evitar el scroll
        document.body.style.overflow = 'hidden';
        // Mostrar el div de actualización
        Download.style.display = 'flex';
        }
    }
}