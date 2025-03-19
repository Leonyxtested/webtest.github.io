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

// Función para obtener una línea aleatoria de un archivo específico
async function obtenerLineaAleatoriaDeArchivo(urlArchivo) {
    const existe = await archivoExiste(urlArchivo);
    
    if (!existe) {
        console.error('Archivo no encontrado:', urlArchivo);
        return 'Archivo no encontrado';
    }

    try {
        const response = await fetch(urlArchivo);
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
        const contenidoFueraComillas = linea.replace(/"[^"]*"/, '').trim();
        const contenido = {
            entreComillas: contenidoEntreComillas ? contenidoEntreComillas[1] : 'No se encontró contenido entre comillas',
            fueraComillas: contenidoFueraComillas ? contenidoFueraComillas : 'No se encontró contenido fuera de las comillas'
        };
        return contenido;
    } catch (error) {
        console.error('Error al obtener el archivo:', error);
        return 'Error al obtener el archivo';
    }
}

// Función para obtener una línea aleatoria de cualquiera de los archivos en una carpeta
async function obtenerLineaAleatoria() {
    const carpeta = 'languaje/';
    const archivos = ['prueba.txt', 'prueba2.txt']; // Lista predefinida de archivos

    if (archivos.length === 0) {
        return 'No se encontraron archivos en la carpeta';
    }

    const archivoAleatorio = archivos[Math.floor(Math.random() * archivos.length)];
    const urlArchivo = carpeta + archivoAleatorio;
    return await obtenerLineaAleatoriaDeArchivo(urlArchivo);
}

// Muestra una línea aleatoria en el div con id "linea"
async function mostrarLineaAleatoria() {
    const linea = await obtenerLineaAleatoria();
    document.getElementById('linea').innerText = contenido.entreComillas;
    document.getElementById('codigo').innerText = contenido.fueraComillas;
}

mostrarLineaAleatoria();
