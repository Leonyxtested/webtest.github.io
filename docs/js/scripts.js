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

// Función para obtener una línea específica de prueba.txt
async function obtenerLinea(lineaNumero) {
    const url = '../../languaje/prueba.txt';
    const existe = await archivoExiste(url);
    
    if (!existe) {
        console.error('Archivo no encontrado:', url);
        return 'Archivo no encontrado';
    }

    try {
        const response = await fetch(url);
        const text = await response.text();
        const lineas = text.split('\n');
        if (lineas[lineaNumero - 1]) {
            return lineas[lineaNumero - 1];
        } else {
            return 'Línea no encontrada';
        }
    } catch (error) {
        console.error('Error al obtener el archivo:', error);
        return 'Error al obtener el archivo';
    }
}

// Muestra la línea en el div con id "linea"
async function mostrarLinea() {
    const lineaNumero = 2; // Cambia este número para mostrar una línea diferente
    const linea = await obtenerLinea(lineaNumero);
    document.getElementById('linea').innerText = linea;
}

mostrarLinea();
