## 🐶 Funcionalidades del Spa

El sistema cuenta con un Dashboard (`dashboard.html`) que incluye:

### 📅 Agenda

Formulario para reservar citas con:
* Selección de fecha
* Selección de hora
* Tipo de servicio (Baño Simple, Baño y Corte, Spa Completo)

### ✂️ Grooming

Ficha técnica para registrar:
* Nombre de la mascota
* Checklist de servicios: Baño, Corte de Pelo, Corte de Uñas

### 🛒 Tienda

Catálogo visual de productos con imágenes:
* Shampoo Avena - 50 Bs
* Juguete Hueso - 25 Bs
* Alimento 1kg - 40 Bs
* Correa Paseo - 60 Bs

Incluye un carrito de compras que genera un enlace automático para enviar el pedido por **WhatsApp**.

---

## 📂 Estructura del Proyecto

```
spa de mascotas/
├── index.html          
├── css/
│   └── estilos.css     # Hoja de estilos (diseño profesional)
├── js/
│   └── app.js          # Lógica operativa del Spa y Tienda
└── imagenes/           # Recursos gráficos del catálogo
```

---

## 🛠️ Tecnologías Utilizadas

* **HTML5** - Estructura de las páginas
* **CSS3** - Estilos y diseño responsivo
* **JavaScript (ES5)** - Lógica del sistema (sin frameworks)
* **localStorage** - Persistencia de datos en el navegador
