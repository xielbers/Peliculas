function VideoID(videoId) {
    localStorage.setItem('videoId', videoId);
    window.location.href = '../player/player.html';
}

function VideoClear(videoId) {
    localStorage.removeItem('videoTime_' + videoId);
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

    // Si la contraseña es incorrecta, redirigir a index.html
    window.location.href = '../index.html';
}

// Asignar la función Check al evento window.onload correctamente
window.onload = Check;
