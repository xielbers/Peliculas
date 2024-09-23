function VideoID(videoId) {
    localStorage.setItem('videoId', videoId);
    window.location.href = 'player/player.html';
}

function VideoClear(videoId) {
    localStorage.removeItem('videoTime_' + videoId);
    alert('Tiempo guardado eliminado.');
}

function LogIn() {
    var contraseñas = ['110528', '298465']; // Las contraseñas deben ser cadenas

    // Verificamos si la contraseña guardada es válida
    let savedPass = localStorage.getItem('pass');
    
    if (!contraseñas.includes(savedPass)) {
        let pass = prompt('Ingrese la contraseña');

        if (pass != null && pass.trim() !== '') {
            localStorage.setItem('pass', pass);
            savedPass = pass; // Actualizamos la contraseña guardada

            // Si la contraseña ingresada no está en el array, recargamos la página
            if (!contraseñas.includes(savedPass)) {
                window.location.reload();
                return; // Para evitar que siga ejecutando el código después de la recarga
            }
        } else {
            window.location.reload(); // Recargamos si no se ingresó ninguna contraseña válida
        }
    }

    // Redirigir según la contraseña
    if (savedPass == '298465') {
        window.location.href = 'Usuarios/edith.html';
    } else if (savedPass == '110528') {
        window.location.href = 'Usuarios/main.html';
    }
}

// Asignar la función LogIn al evento window.onload sin ejecutarla inmediatamente
window.onload = LogIn;