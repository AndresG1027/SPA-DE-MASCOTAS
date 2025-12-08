/* LÓGICA DEL SISTEMA SPA Y TIENDA
   Maneja: Agenda, Grooming, Catálogo y WhatsApp.
   No requiere login.
*/

// --- VARIABLES GLOBALES SIMPLES ---
var carrito = [];
var total = 0;

// Lista de productos (Simulación de base de datos básica)
// Catálogo con variantes simples.
// ¡ASEGÚRATE QUE TUS IMÁGENES ESTÉN EN LA CARPETA 'imagenes' Y TENGAN ESTOS NOMBRES!
var productos = [
    { 
        nombre: "Shampoo Avena", 
        precio: 50, 
        imagen: "imagenes/shampoo.jpg" 
    },
    { 
        nombre: "Juguete Hueso", 
        precio: 25, 
        imagen: "imagenes/juguete.jpg" 
    },
    { 
        nombre: "Alimento 1kg", 
        precio: 40, 
        imagen: "imagenes/alimento.jpg" 
    },
    { 
        nombre: "Correa Paseo", 
        precio: 60, 
        imagen: "imagenes/correa.jpg" 
    }
];

// --- FUNCIONES DE NAVEGACIÓN ---
// Función simple para ocultar todo y mostrar solo lo que queremos ver
function mostrarSeccion(id) {
    // Ocultar todas las secciones
    document.getElementById("sec-agenda").style.display = "none";
    document.getElementById("sec-grooming").style.display = "none";
    document.getElementById("sec-tienda").style.display = "none";
    
    // Mostrar la sección elegida
    document.getElementById(id).style.display = "block";
}

// --- 1. AGENDA DE CITAS ---
function agendarCita(e) {
    e.preventDefault(); // Evita que se recargue la página
    var fecha = document.getElementById("cita-fecha").value;
    var hora = document.getElementById("cita-hora").value;
    var servicio = document.getElementById("cita-servicio").value;

    // Validación básica
    if(fecha === "" || hora === "") {
        alert("Por favor selecciona fecha y hora.");
        return;
    }

    // Simulación de guardado (En un sistema real, esto iría a una base de datos)
    alert("¡Cita Agendada con Éxito!\n\nFecha: " + fecha + "\nHora: " + hora + "\nServicio: " + servicio);
}

// --- 2. GROOMING (FICHA TÉCNICA) ---
function guardarFicha(e) {
    e.preventDefault();
    var mascota = document.getElementById("ficha-mascota").value;
    
    // Verificamos qué checkboxes están marcados usando el operador ternario simple (? :)
    var banio = document.getElementById("check-banio").checked ? "Sí" : "No";
    var corte = document.getElementById("check-corte").checked ? "Sí" : "No";
    var unias = document.getElementById("check-unias").checked ? "Sí" : "No";
    var oidos = document.getElementById("check-oidos").checked ? "Sí" : "No";

    alert("Ficha Guardada para: " + mascota + "\n\n--- Detalles ---\nBaño: " + banio + "\nCorte: " + corte + "\nUñas: " + unias + "\nOídos: " + oidos);
}

// --- 3. TIENDA Y WHATSAPP ---

// Función para dibujar los productos en la pantalla usando un bucle simple
function cargarProductos() {
    var contenedor = document.getElementById("lista-productos");
    contenedor.innerHTML = ""; // Limpiar el contenedor antes de cargar

    for(var i=0; i<productos.length; i++) {
        var p = productos[i];
        
        // Crear el elemento visual (tarjeta) del producto
        var div = document.createElement("div");
        div.className = "producto-card";
        
        // Insertamos el HTML simple con la imagen, nombre, precio y botón
        div.innerHTML = "<img src='" + p.imagen + "' alt='" + p.nombre + "'>" +
                        "<h4>" + p.nombre + "</h4>" +
                        "<p>Precio: " + p.precio + " Bs</p>" +
                        // Al hacer click, llamamos a la función agregarAlCarrito con los datos de este producto
                        "<button onclick='agregarAlCarrito(\"" + p.nombre + "\", " + p.precio + ")'>Agregar al Carrito</button>";
        
        contenedor.appendChild(div);
    }
}

// Función para añadir un producto al array del carrito
function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre: nombre, precio: precio });
    actualizarTotal();
    alert("¡" + nombre + " agregado al carrito!");
}

// Función para recalcular el total a pagar
function actualizarTotal() {
    total = 0;
    // Bucle simple para sumar los precios
    for(var i=0; i<carrito.length; i++) {
        total = total + carrito[i].precio;
    }
    document.getElementById("carrito-total").innerText = total + " Bs";
}

// Generar el enlace funcional de WhatsApp 
function comprarWhatsApp() {
    if(carrito.length === 0) {
        alert("El carrito está vacío. Agrega productos primero.");
        return;
    }

    var mensaje = "Hola, me gustaría realizar el siguiente pedido en el Pet Spa:\n";
    // Recorremos el carrito para armar la lista del mensaje
    for(var i=0; i<carrito.length; i++) {
        mensaje = mensaje + "- " + carrito[i].nombre + " (" + carrito[i].precio + " Bs)\n";
    }
    mensaje = mensaje + "\n*Total a Pagar: " + total + " Bs*";

    // NOTA: Reemplaza las X con tu número real si quieres probarlo (ej: 59170000000)
    var numeroWhatsapp = "591XXXXXXXX"; 
    
    // Codificamos el mensaje para que sea válido en una URL
    var url = "https://wa.me/" + numeroWhatsapp + "?text=" + encodeURIComponent(mensaje);
    
    // Abrir WhatsApp en una nueva pestaña
    window.open(url, "_blank");
}

// Ejecutamos esta función al iniciar para que se vean los productos
cargarProductos();
