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

// Función para obtener una línea aleatoria de prueba.txt
async function obtenerLineaAleatoria() {
    const url = 'languaje/prueba.txt';
    const existe = await archivoExiste(url);
    
    if (!existe) {
        console.error('Archivo no encontrado:', url);
        return 'Archivo no encontrado';
    }

    try {
        const response = await fetch(url);
        const text = await response.text();
        const lineas = text.split('\n');
        const totalLineas = lineas.length;

        if (totalLineas === 0) {
            return 'El archivo está vacío';
        }

        const lineaAleatoria = Math.floor(Math.random() * totalLineas);
        return lineas[lineaAleatoria];
       
        // Extraer el contenido entre comillas
        const contenidoEntreComillas = linea.match(/"([^"]*)"/);
        return contenidoEntreComillas ? contenidoEntreComillas[1] : 'No se encontró contenido entre comillas';
    } catch (error) {
        console.error('Error al obtener el archivo:', error);
        return 'Error al obtener el archivo';
    }
}


// Muestra una línea aleatoria en el div con id "linea"
async function mostrarLineaAleatoria() {
    const linea = await obtenerLineaAleatoria();
    document.getElementById('linea').innerText = linea;
}

mostrarLineaAleatoria();
