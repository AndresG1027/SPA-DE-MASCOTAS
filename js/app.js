/* LÓGICA DEL SISTEMA SPA Y TIENDA 
   Maneja: Agenda, Grooming, Carrito y WhatsApp.
*/

// --- VARIABLES GLOBALES SIMPLES ---
var carrito = [];
var total = 0;

// --- FUNCIONES DE NAVEGACIÓN ---
function mostrarSeccion(id) {
    // Ocultar todas
    document.getElementById("sec-agenda").style.display = "none";
    document.getElementById("sec-grooming").style.display = "none";
    document.getElementById("sec-tienda").style.display = "none";
    
    // Mostrar la elegida
    document.getElementById(id).style.display = "block";
}

// --- 1. AGENDA DE CITAS ---
function agendarCita(e) {
    e.preventDefault();
    var fecha = document.getElementById("cita-fecha").value;
    var hora = document.getElementById("cita-hora").value;
    var servicio = document.getElementById("cita-servicio").value;

    if(fecha === "" || hora === "") {
        alert("Por favor selecciona fecha y hora.");
        return;
    }

    // Simulación de guardado
    alert("Cita agendada para el " + fecha + " a las " + hora + " hrs.\nServicio: " + servicio);
}

// --- 2. GROOMING (FICHA) ---
function guardarFicha(e) {
    e.preventDefault();
    var mascota = document.getElementById("ficha-mascota").value;
    
    // Verificar checkboxes
    var corte = document.getElementById("check-corte").checked ? "Sí" : "No";
    var unias = document.getElementById("check-unias").checked ? "Sí" : "No";
    var banio = document.getElementById("check-banio").checked ? "Sí" : "No";

    alert("Ficha guardada para: " + mascota + "\nCorte: " + corte + "\nUñas: " + unias + "\nBaño: " + banio);
}

// --- 3. CARRITO Y WHATSAPP ---

function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre: nombre, precio: precio });
    actualizarTotal();
    alert("Agregado: " + nombre);
}

function actualizarTotal() {
    total = 0;
    for(var i=0; i<carrito.length; i++) {
        total = total + carrito[i].precio;
    }
    document.getElementById("carrito-total").innerText = total + " Bs";
}

// Generar enlace de WhatsApp 
function comprarWhatsApp() {
    if(carrito.length === 0) {
        alert("El carrito está vacío.");
        return;
    }

    var mensaje = "Hola, quiero pedir: ";
    for(var i=0; i<carrito.length; i++) {
        mensaje = mensaje + " - " + carrito[i].nombre + " (" + carrito[i].precio + "Bs)";
    }
    mensaje = mensaje + " Total: " + total + "Bs";

    // Codificar para URL
    var url = "https://wa.me/591XXXXXXXX?text=" + encodeURIComponent(mensaje);
    
    // Abrir en nueva pestaña
    window.open(url, "_blank");
}