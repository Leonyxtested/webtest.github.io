// Función para verificar si un archivo existe
async function archivoExiste(url) {
    try {
        const response = await fetch(url, { method: 'HEAD' });
        return response.ok;
    } catch (error) {
        console.error('Error al verificar el archivo:', error);
        return false;
    }
}

// Función para obtener la lista de archivos en una carpeta específica
async function obtenerListaDeArchivos(carpeta) {
    try {
        const response = await fetch(carpeta);
        if (!response.ok) {
            throw new Error('Error al obtener la lista de archivos');
        }
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(txt, 'text/txt');
        const archivos = Array.from(doc.querySelectorAll('a'))
            .map(a => a.getAttribute('href'))
            .filter(href => href && href.endsWith('.txt'))
            .map(href => carpeta + href);
        return archivos;
    } catch (error) {
        console.error('Error al obtener la lista de archivos:', error);
        return [];
    }
}

// Función para obtener una línea aleatoria de un archivo específico
async function obtenerLineaAleatoriaDeArchivo(url) {
    const existe = await archivoExiste(url);
    
    if (!existe) {
        console.error('Archivo no encontrado:', url);
        return 'Archivo no encontrado';
    }

    try {
        const response = await fetch(url);
        const text = await response.text();
        const lineas = text.split('\n').filter(linea => linea.trim() !== ''); // Filtra líneas vacías
        const totalLineas = lineas.length;

        if (totalLineas === 0) {
            return 'El archivo está vacío';
        }

        const lineaAleatoria = Math.floor(Math.random() * totalLineas);
        let linea = lineas[lineaAleatoria];

        // Extraer el contenido entre comillas antes de devolverlo
        const contenidoEntreComillas = linea.match(/"([^"]*)"/);
        linea = contenidoEntreComillas ? contenidoEntreComillas[1] : 'No se encontró contenido entre comillas';
        return linea;
    } catch (error) {
        console.error('Error al obtener el archivo:', error);
        return 'Error al obtener el archivo';
    }
}

// Función para obtener una línea aleatoria de cualquiera de los archivos en una carpeta
async function obtenerLineaAleatoria() {
    const carpeta = 'languaje/';
    const archivos = await obtenerListaDeArchivos(carpeta);
    if (archivos.length === 0) {
        return 'No se encontraron archivos en la carpeta';
    }
    const archivoAleatorio = archivos[Math.floor(Math.random() * archivos.length)];
    return await obtenerLineaAleatoriaDeArchivo(archivoAleatorio);
}

// Muestra una línea aleatoria en el div con id "linea"
async function mostrarLineaAleatoria() {
    const linea = await obtenerLineaAleatoria();
    document.getElementById('linea').innerText = linea;
}

mostrarLineaAleatoria();
