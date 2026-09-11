# 🚩 Mini-CTF Educativo: Privacidad & Fingerprinting

Este mini-CTF está diseñado para ejecutarse durante los últimos 45 minutos del taller por equipos mixtos (**DAW + DAM + ASIR**).

---

## 🏆 Retos y Banderas

### Reto 1: El Espía del User-Agent (100 pts)
- **Instrucción:** Usa `curl` para enviar una petición al servidor Python simulando ser un dispositivo móvil "iPhone en iOS 16" sin usar un navegador real.
- **Validación:** El log del servidor debe mostrar el User-Agent modificado.

### Reto 2: Extracción GPU (150 pts)
- **Instrucción (DAW/DAM):** Modifica `app.js` para extraer el modelo exacto de la tarjeta gráfica del alumno utilizando la API de Canvas/WebGL de JavaScript.

### Reto 3: Inspección de Storage (100 pts)
- **Instrucción:** Encuentra qué dato sensible ha dejado simuladamente la aplicación en `localStorage` o en las `cookies` no protegidas con `HttpOnly`.

### Reto 4: Análisis de Tráfico Third-Party (200 pts)
- **Instrucción (ASIR):** Abre las DevTools (pestaña Network), filtra por peticiones externas y determina cuántos dominios distintos está contactando una web dada durante la carga.

---

## 📊 Tabla de Puntuación

| Equipo | Retos Completados | Puntos Totales |
|---|---|---|
| Equipo DAW | | |
| Equipo DAM | | |
| Equipo ASIR | | |
