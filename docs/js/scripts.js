// Función para obtener una línea específica de prueba.txt
async function obtenerLinea(lineaNumero) {
    const response = await fetch('../prueba.txt');
    const text = await response.text();
    const lineas = text.split('\n');
    if (lineas[lineaNumero - 1]) {
        return lineas[lineaNumero - 1];
    } else {
        return 'Línea no encontrada';
    }
}

// Muestra la línea en el div con id "linea"
async function mostrarLinea() {
    const lineaNumero = 3; // Cambia este número para mostrar una línea diferente
    const linea = await obtenerLinea(lineaNumero);
    document.getElementById('linea').innerText = linea;
}

mostrarLinea();
