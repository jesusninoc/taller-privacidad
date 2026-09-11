// ==========================================
// TALLER: PRIVACIDAD Y FINGERPRINTING
// ==========================================

// 1. Recopilación de información expuesta por defecto
const datos = {
    navegador: navigator.userAgent,
    idioma: navigator.language,
    idiomas: navigator.languages ? navigator.languages.join(', ') : 'N/A',
    plataforma: navigator.platform,
    cookiesHabilitadas: navigator.cookieEnabled,
    nucleosCPU: navigator.hardwareConcurrency || 'N/A',
    memoriaRAM: navigator.deviceMemory ? `~${navigator.deviceMemory} GB` : 'N/A',
    resolucion: `${screen.width} × ${screen.height}`,
    profundidadColor: `${screen.colorDepth}-bit`,
    touchPoints: navigator.maxTouchPoints || 0,
    zonaHoraria: Intl.DateTimeFormat().resolvedOptions().timeZone
};

// Muestra en consola en formato tabla
console.log("=== DATOS EXTRAÍDOS DEL NAVEGADOR ===");
console.table(datos);

// Mostrar datos en la interfaz de usuario
document.getElementById('data-display').textContent = JSON.stringify(datos, null, 2);

// 2. Función para generar Fingerprint SHA-256
async function generarFingerprint(objetoDatos) {
    // Convertimos los valores en una cadena única concatenada
    const cadenaPerfil = Object.values(objetoDatos).join('|');
    
    // Convertimos la cadena en buffer de texto
    const bufferDatos = new TextEncoder().encode(cadenaPerfil);
    
    // Calculamos el hash SHA-256 mediante Web Crypto API
    const hashBuffer = await crypto.subtle.digest("SHA-256", bufferDatos);
    
    // Convertimos el buffer a representación hexadecimal
    return [...new Uint8Array(hashBuffer)]
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");
}

// Ejecutar el hashing
generarFingerprint(datos).then(hash => {
    console.log("Fingerprint SHA-256 Generado:", hash);
    document.getElementById('hash-display').textContent = hash;
});

// ==========================================
// TAREAS PARA LOS ALUMNOS (RETO DE CÓDIGO)
// ==========================================
// TODO 1: Agrega 3 datos adicionales a 'datos' (ej. WebGL, Canvas, AudioContext).
// TODO 2: Almacena el hash en LocalStorage para detectar si la persona regresa.
