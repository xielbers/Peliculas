if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('../sw.js').then(function(registration) {
            console.log('Service Worker registrado con éxito:', registration.scope);
        }).catch(function(error) {
            console.log('Error al registrar el Service Worker:', error);
        });
    });
}

function LogIn() {
    var contraseñas = ['110528', '298465', '995434']; // Las contraseñas deben ser cadenas

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
    } else if (savedPass == '995434') {
        window.location.href = 'Usuarios/tecnica.html';
    }
}

// Asignar la función LogIn al evento window.onload sin ejecutarla inmediatamente
window.onload = LogIn;