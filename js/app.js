/* LÓGICA DEL SISTEMA SPA Y TIENDA
   Maneja: Navegación, Formularios, Lógica del Carrito y WhatsApp.
*/

// --- VARIABLES GLOBALES SIMPLES ---
var carrito = [];
var total = 0;

// NOTA: La lista de productos y sus imágenes ahora están
// directamente en el archivo index.html, no aquí.

// --- FUNCIONES DE NAVEGACIÓN ---
function mostrarSeccion(id) {
    // Ocultar todas las secciones
    document.getElementById("sec-agenda").style.display = "none";
    document.getElementById("sec-grooming").style.display = "none";
    document.getElementById("sec-tienda").style.display = "none";
    
    // Mostrar la sección elegida
    document.getElementById(id).style.display = "block";
}

// --- 1. LOGICA DE AGENDA ---
function agendarCita(e) {
    e.preventDefault(); // Evita recarga
    var fecha = document.getElementById("cita-fecha").value;
    var hora = document.getElementById("cita-hora").value;
    var servicio = document.getElementById("cita-servicio").value;

    if(fecha === "" || hora === "") {
        alert("Por favor selecciona fecha y hora.");
        return;
    }

    alert("¡Cita Agendada!\nFecha: " + fecha + "\nHora: " + hora + "\nServicio: " + servicio);
}

// --- 2. LOGICA DE GROOMING ---
function guardarFicha(e) {
    e.preventDefault();
    var mascota = document.getElementById("ficha-mascota").value;
    
    // Operador ternario simple para ver si está marcado o no
    var banio = document.getElementById("check-banio").checked ? "Sí" : "No";
    var corte = document.getElementById("check-corte").checked ? "Sí" : "No";
    var unias = document.getElementById("check-unias").checked ? "Sí" : "No";
    var oidos = document.getElementById("check-oidos").checked ? "Sí" : "No";

    alert("Ficha Guardada: " + mascota + "\nBaño: " + banio + ", Corte: " + corte + ", Uñas: " + unias + ", Oídos: " + oidos);
}

// --- 3. LOGICA DEL CARRITO Y WHATSAPP ---

// Esta función es llamada directamente desde los botones en el HTML
function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre: nombre, precio: precio });
    actualizarTotal();
    alert("¡" + nombre + " agregado al carrito!");
}

// Función para recalcular el total
function actualizarTotal() {
    total = 0;
    // Bucle simple para sumar precios
    for(var i=0; i<carrito.length; i++) {
        total = total + carrito[i].precio;
    }
    document.getElementById("carrito-total").innerText = total + " Bs";
}

// Generar enlace de WhatsApp
function comprarWhatsApp() {
    if(carrito.length === 0) {
        alert("El carrito está vacío. Agrega productos primero.");
        return;
    }

    var mensaje = "Hola, quiero pedir en el Pet Spa:\n";
    for(var i=0; i<carrito.length; i++) {
        mensaje = mensaje + "- " + carrito[i].nombre + " (" + carrito[i].precio + " Bs)\n";
    }
    mensaje = mensaje + "\n*Total: " + total + " Bs*";
   
    var numeroWhatsapp = "59163141333"; 
    
    var url = "https://wa.me/" + numeroWhatsapp + "?text=" + encodeURIComponent(mensaje);
    window.open(url, "_blank");
}
