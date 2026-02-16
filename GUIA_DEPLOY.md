# 🚀 Guía de Despliegue y Conexión

Esta guía te llevará paso a paso para guardar tu código en **GitHub** y publicar tu página web en internet usando **Firebase Hosting**.

---

## 🛠️ Parte 1: Preparación (Instalar Herramientas)

Para poder subir tu web, necesitas instalar dos programas en tu computadora si no los tienes:

1.  **Git** (Para guardar el historial de cambios y subir a GitHub)
    *   Descarga e instala desde: [git-scm.com](https://git-scm.com/downloads)
    *   Durante la instalación, dale "Siguiente" a todo.

2.  **Node.js** (Necesario para las herramientas de Firebase)
    *   Descarga e instala la versión "LTS" desde: [nodejs.org](https://nodejs.org/)

---

## 🐙 Parte 2: Subir código a GitHub

GitHub guardará una copia segura de tu código en la nube.

### 1. Crear repositorio en GitHub
1.  Ve a [github.com](https://github.com) e inicia sesión (o crea una cuenta).
2.  Haz clic en el botón **New** (o el icono `+` arriba a la derecha -> New repository).
3.  Nombre del repositorio: `don-segurito-web`.
4.  Deja lo demás como está (Público, sin README, sin .gitignore).
5.  Haz clic en **Create repository**.
6.  ¡No cierres esa página! Copia la URL que sale (ej: `https://github.com/tu-usuario/don-segurito-web.git`).

### 2. Guardar tu código localmente
Abre una terminal (PowerShell o CMD) en la carpeta de tu proyecto (`don-segurito`):

```bash
# 1. Iniciar Git
git init

# 2. Agregar todos los archivos
git add .

# 3. Guardar el primer cambio
git commit -m "Primera versión: Sitio web Don Segurito completo"

# 4. Cambiar el nombre de la rama principal a 'main'
git branch -M main
```

### 3. Subir a GitHub
Reemplaza `TU_URL_DE_GITHUB` con la que copiaste en el paso 1:

```bash
# 1. Conectar con GitHub
git remote add origin TU_URL_DE_GITHUB

# 2. Subir archivos
git push -u origin main
```

¡Listo! Recarga la página de GitHub y verás tus archivos.

---

## 🔥 Parte 3: Publicar en Internet (Firebase Hosting)

Firebase es un servicio de Google que hospedará tu web gratis, rápida y segura (con candadito HTTPS).

### 1. Instalar herramientas de Firebase
En tu terminal, ejecuta:

```bash
npm install -g firebase-tools
```

### 2. Iniciar sesión
```bash
firebase login
```
Esto abrirá tu navegador. Inicia sesión con tu cuenta de Google y permite el acceso.

### 3. Configurar el proyecto
En la carpeta de tu proyecto (`don-segurito`), ejecuta:

```bash
firebase init
```

Te hará varias preguntas. Usa las flechas para moverte y `Enter` para confirmar:

1.  **Which Firebase features do you want to set up?**
    *   Mueve con flechas hasta `Hosting: Configure files for Firebase Hosting...`
    *   Presiona `Espacio` para seleccionar.
    *   Presiona `Enter`.

2.  **Please select an option:**
    *   Selecciona `Create a new project`.
    *   Escribe un nombre único (ej: `don-segurito-web-tunombre`).
    *   Dale un nombre o ID del proyecto si te lo pide.

3.  **What do you want to use as your public directory?**
    *   Escribe: `.` (solo un punto).
    *   Explicación: Esto le dice que los archivos de tu web (index.html, etc) están en la carpeta actual.
    *   Presiona `Enter`.

4.  **Configure as a single-page app (rewrite all urls to /index.html)?**
    *   Escribe: `N` y presiona `Enter`.

5.  **Set up automatic builds and deploys with GitHub?**
    *   Escribe: `N` y presiona `Enter` (lo haremos manual por ahora).

6.  **File index.html already exists. Overwrite?**
    *   ⚠️ IMPORANTE: Escribe `N` (No). ¡No queremos borrar tu web!

### 4. ¡Desplegar! 🚀
Ya está todo configurado. Para subir tu web a internet, solo ejecuta:

```bash
firebase deploy
```

Al finalizar, te dará una **Hosting URL** (ej: `https://don-segurito-web.web.app`).

---

## 🤝 Conectar con un Desarrollador (Yo)

Si quieres compartirme el código para que yo (como IA o si fuera humano) pueda verlo:
1.  En tu repositorio de GitHub, ve a **Settings** -> **Collaborators**.
2.  Añade el correo o usuario de la persona.

Para Firebase:
1.  Ve a la [Consola de Firebase](https://console.firebase.google.com/).
2.  Entra a tu proyecto.
3.  Ve a Configuración (engranaje) -> **Usuarios y permisos**.
4.  Añade el correo del colaborador.

---

## ✅ Resumen de Comandos Diarios

Cada vez que hagas un cambio en tu web y quieras actualizarla:

**1. Guardar en GitHub:**
```bash
git add .
git commit -m "Descripción del cambio"
git push
```

**2. Actualizar la web en internet:**
```bash
firebase deploy
```
