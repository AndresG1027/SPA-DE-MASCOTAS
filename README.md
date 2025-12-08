# Sistema Web Pet Spa & Autenticación

Este proyecto es una aplicación web para la gestión de un Spa de Mascotas, que incluye un módulo completo de seguridad (Registro, Login, Recuperación) y un panel de administración para Agenda, Grooming y Tienda.

El sistema fue desarrollado utilizando **HTML, CSS y JavaScript** puro (Nivel Básico), empleando `localStorage` para la persistencia de datos.

## 🔗 Enlaces del Proyecto (OBLIGATORIO)

* **Repositorio en GitHub:** https://github.com/AndresG1027/SPA-DE-MASCOTAS.git
* **Página Publicada (GitHub Pages):** https://andresg1027.github.io/SPA-DE-MASCOTAS/

---

## 📘 Documentación Técnica

A continuación se detalla la lógica de seguridad implementada en el archivo `js/auth.js`.

### 1. Validaciones con Expresiones Regulares (Regex)

Para asegurar que los datos sean correctos, se aplican las siguientes reglas:

| Campo | Regex | Descripción |
|-------|-------|-------------|
| Nombre | `/^[A-Za-zÁÉÍÓÚÑáéíóúñ ]+$/` | Solo letras y espacios |
| Correo | `/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/` | Formato estándar de email |
| Celular | `/^[0-9]{7,12}$/` | Entre 7 y 12 dígitos |
| Contraseña | `/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/` | Mayúscula, minúscula, número, símbolo, mín 6 caracteres |

### 2. Manejo del Bloqueo de Cuenta

El sistema protege contra intentos fallidos de inicio de sesión:

1. Se utiliza la variable `usr_intentos` en `localStorage`.
2. Cada vez que la contraseña es incorrecta, el contador aumenta +1.
3. Si el contador llega a **3**, la variable `usr_bloqueado` cambia a `"si"`.
4. Una vez bloqueado, el sistema impide el acceso y muestra un enlace para recuperar la contraseña.

### 3. Recuperación de Contraseña

El módulo de recuperación permite restablecer el acceso:

1. Verifica que el correo ingresado coincida con el registrado (`usr_correo`).
2. Solicita una nueva contraseña válida (debe cumplir el regex).
3. Al actualizar, el sistema realiza tres acciones automáticas:
   * Guarda la nueva clave en `usr_clave`.
   * Desbloquea la cuenta (`usr_bloqueado` = "no").
   * Reinicia los intentos fallidos a 0.

---

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
├── index.html          # Pantalla de Inicio de Sesión
├── registro.html       # Formulario de creación de cuenta
├── recuperar.html      # Módulo de recuperación de contraseña
├── dashboard.html      # Sistema principal del Spa
├── css/
│   └── estilos.css     # Hoja de estilos (diseño profesional)
├── js/
│   ├── auth.js         # Lógica de seguridad y validaciones
│   └── app.js          # Lógica operativa del Spa y Tienda
└── imagenes/           # Recursos gráficos del catálogo
```

---

## 🛠️ Tecnologías Utilizadas

* **HTML5** - Estructura de las páginas
* **CSS3** - Estilos y diseño responsivo
* **JavaScript (ES5)** - Lógica del sistema (sin frameworks)
* **localStorage** - Persistencia de datos en el navegador

---

## 🚀 Cómo Usar

1. Abre `index.html` en tu navegador.
2. Si no tienes cuenta, ve a **Registrarse**.
3. Completa el formulario con datos válidos.
4. Inicia sesión con tu correo y contraseña.
5. Explora el Dashboard: Agenda, Grooming y Tienda.
