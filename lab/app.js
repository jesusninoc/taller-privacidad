// ==========================================
// TALLER: PRIVACIDAD Y FINGERPRINTING
// ==========================================

// --- FUNCIONES EXTRA PARA LOS TODOs ---

// TODO 1.1: Extraer información de la GPU (WebGL)
function obtenerWebGLInfo() {
    try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (!gl) return 'No disponible';
        
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
            return gl.getParameter(debugInfo.UNMASKED_RENDERER_REG) || gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
        }
        return 'Soportado (Info oculta)';
    } catch (e) {
        return 'Error al obtener WebGL';
    }
}

// TODO 1.2: Generar una huella mediante Canvas
function obtenerCanvasFingerprint() {
    try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 200;
        canvas.height = 50;
        
        // Dibujamos texto y formas únicas según la renderización del SO/GPU
        ctx.textBaseline = "top";
        ctx.font = "14px 'Arial'";
        ctx.fillStyle = "#f60";
        ctx.fillRect(125, 1, 62, 20);
        ctx.fillStyle = "#069";
        ctx.fillText("Privacidad, DAW/DAM/ASIR!", 2, 15);
        ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
        ctx.fillText("Privacidad, DAW/DAM/ASIR!", 4, 17);

        // Convertimos el gráfico rendered a una cadena Base64
        return canvas.toDataURL().slice(-50); // Tomamos los últimos 50 caracteres
    } catch (e) {
        return 'Error Canvas';
    }
}


// --- RECOPILACIÓN GENERAL DE DATOS ---

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
    zonaHoraria: Intl.DateTimeFormat().resolvedOptions().timeZone,
    
    // NUEVOS DATOS EXTRAÍDOS (TODO 1 COMPLETADO)
    tarjetaGrafica: obtenerWebGLInfo(),
    canvasFingerprint: obtenerCanvasFingerprint()
};

// Muestra en consola
console.log("=== DATOS EXTRAÍDOS DEL NAVEGADOR ===");
console.table(datos);

// Mostrar datos en el HTML
document.getElementById('data-display').textContent = JSON.stringify(datos, null, 2);


// --- GENERACIÓN Y PERSISTENCIA DEL HASH ---

async function generarFingerprint(objetoDatos) {
    const cadenaPerfil = Object.values(objetoDatos).join('|');
    const bufferDatos = new TextEncoder().encode(cadenaPerfil);
    const hashBuffer = await crypto.subtle.digest("SHA-256", bufferDatos);
    
    return [...new Uint8Array(hashBuffer)]
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");
}

// TODO 2 COMPLETADO: Generar hash y guardar/comprobar en localStorage
generarFingerprint(datos).then(hashActual => {
    console.log("Fingerprint SHA-256 Generado:", hashActual);
    document.getElementById('hash-display').textContent = hashActual;

    // 1. Leemos si ya existía un hash guardado de una visita previa
    const hashPrevio = localStorage.getItem('usuario_hash');

    if (hashPrevio) {
        if (hashPrevio === hashActual) {
            console.log("%c¡RECONOCIDO! Ya has visitado esta página anteriormente con la misma huella.", "color: #00ff66; font-size: 14px; font-weight: bold;");
            alert("¡Te hemos reconocido! Tu huella digital coincide con tu visita anterior.");
        } else {
            console.log("Tu huella ha cambiado desde tu última visita.");
        }
    } else {
        console.log("Primera vez que visitas la página. Guardando huella en localStorage...");
    }

    // 2. Guardamos o actualizamos la huella actual en el almacenamiento local
    localStorage.setItem('usuario_hash', hashActual);
    localStorage.setItem('ultima_visita', new Date().toISOString());
});
