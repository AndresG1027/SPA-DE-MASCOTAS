/* LÓGICA DE AUTENTICACIÓN (LOGIN/REGISTRO)
   Cumple con: Regex, Bloqueo 3 intentos, Recuperación.
*/

// --- VALIDACIONES SIMPLES (REGEX) ---
function validarNombre(nombre) {
    var re = /^[A-Za-zÁÉÍÓÚÑáéíóúñ ]+$/;
    return re.test(nombre);
}

function validarCorreo(correo) {
    var re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(correo);
}

function validarCelular(numero) {
    // Acepta entre 7 y 12 números (Regla general)
    var re = /^[0-9]{7,12}$/;
    return re.test(numero);
}

function validarClave(clave) {
    // Mayúscula, minúscula, número, símbolo, min 6 chars
    var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
    return re.test(clave);
}

// --- MOSTRAR MENSAJES ---
function mostrarAviso(idElemento, texto, color) {
    var el = document.getElementById(idElemento);
    el.innerText = texto;
    el.style.color = color;
}

// --- VER CONTRASEÑA ---
function togglePassword(idInput) {
    var input = document.getElementById(idInput);
    if (input.type === "password") {
        input.type = "text";
    } else {
        input.type = "password";
    }
}

// --- 1. REGISTRO ---
function registrarUsuario(e) {
    e.preventDefault();
    
    var nombre = document.getElementById("reg-nombre").value;
    var correo = document.getElementById("reg-correo").value;
    var celular = document.getElementById("reg-celular").value;
    var clave = document.getElementById("reg-pass").value;

    if (!validarNombre(nombre)) {
        mostrarAviso("msg-reg", "Nombre inválido (solo letras).", "red"); return;
    }
    if (!validarCorreo(correo)) {
        mostrarAviso("msg-reg", "Correo inválido.", "red"); return;
    }
    if (!validarCelular(celular)) {
        mostrarAviso("msg-reg", "Celular debe tener 7-12 dígitos.", "red"); return;
    }
    if (!validarClave(clave)) {
        mostrarAviso("msg-reg", "Clave débil (Usa Mayús, Minús, #, Símbolo).", "red"); return;
    }

    // Guardar datos básicos
    localStorage.setItem("usr_nombre", nombre);
    localStorage.setItem("usr_correo", correo);
    localStorage.setItem("usr_clave", clave);
    localStorage.setItem("usr_celular", celular);
    
    // Inicializar seguridad
    localStorage.setItem("usr_intentos", "0");
    localStorage.setItem("usr_bloqueado", "no");

    mostrarAviso("msg-reg", "¡Cuenta creada! Redirigiendo...", "#238636");
    setTimeout(function() { window.location.href = "index.html"; }, 2000);
}

// --- 2. LOGIN ---
function iniciarSesion(e) {
    e.preventDefault();

    var correo = document.getElementById("log-correo").value;
    var clave = document.getElementById("log-pass").value;

    // Recuperar datos
    var correoReal = localStorage.getItem("usr_correo");
    var claveReal = localStorage.getItem("usr_clave");
    var intentos = parseInt(localStorage.getItem("usr_intentos"));
    var bloqueado = localStorage.getItem("usr_bloqueado");

    if (!correoReal) {
        mostrarAviso("msg-log", "No existe usuario. Regístrate.", "red"); return;
    }

    // Validar Correo Primero
    if (correo !== correoReal) {
        mostrarAviso("msg-log", "Correo incorrecto.", "red"); return;
    }

    // Revisar Bloqueo
    if (bloqueado === "si") {
        mostrarAviso("msg-log", "CUENTA BLOQUEADA.", "red");
        document.getElementById("link-recuperar").style.display = "block";
        return;
    }

    // Validar Clave
    if (clave === claveReal) {
        mostrarAviso("msg-log", "Bienvenido...", "#238636");
        localStorage.setItem("usr_intentos", "0"); // Resetear intentos
        // REDIRECCIÓN AL SISTEMA DEL SPA
        window.location.href = "dashboard.html";
    } else {
        intentos++;
        localStorage.setItem("usr_intentos", intentos);
        
        if (intentos >= 3) {
            localStorage.setItem("usr_bloqueado", "si");
            mostrarAviso("msg-log", "Bloqueado por 3 intentos fallidos.", "red");
            document.getElementById("link-recuperar").style.display = "block";
        } else {
            mostrarAviso("msg-log", "Clave mal. Intento " + intentos + " de 3.", "orange");
        }
    }
}

// --- 3. RECUPERACIÓN ---
function recuperarClave(e) {
    e.preventDefault();
    var correo = document.getElementById("rec-correo").value;
    var nuevaClave = document.getElementById("rec-pass").value;
    var correoReal = localStorage.getItem("usr_correo");

    if (correo !== correoReal) {
        mostrarAviso("msg-rec", "Correo no coincide.", "red"); return;
    }
    if (!validarClave(nuevaClave)) {
        mostrarAviso("msg-rec", "La clave nueva es muy débil.", "red"); return;
    }

    localStorage.setItem("usr_clave", nuevaClave);
    localStorage.setItem("usr_bloqueado", "no");
    localStorage.setItem("usr_intentos", "0");

    mostrarAviso("msg-rec", "Clave actualizada. Ve al Login.", "#238636");
    setTimeout(function() { window.location.href = "index.html"; }, 2000);
}