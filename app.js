var estrellas = [];

// Función para cargar las estrellas desde la base de datos al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    cargarEstrellas();
    delegarEventoFila();
    configurarSelectorColor();
});

// Función para cargar las estrellas desde la base de datos
function cargarEstrellas() {
    // Hacer una solicitud fetch a un archivo PHP que obtenga las estrellas de la base de datos
    fetch('obtener_estrella.php')
    .then(response => response.json())
    .then(data => {
        estrellas = data; // Guardar todas las estrellas en el arreglo
        mostrarListaEstrellas();
    })
    .catch(error => {
        console.error('Error al obtener las estrellas:', error);
    });
}

// Función para mostrar la lista de estrellas en el div oculto
function mostrarListaEstrellas() {
    var listaEstrellas = document.getElementById('listaEstrellas');
    listaEstrellas.innerHTML = ''; // Limpiar lista de estrellas

    estrellas.forEach((estrella, index) => {
        var li = document.createElement('li');
        li.innerHTML = estrella.nombre + ' - ' + estrella.categoria + ' <button onclick="agregarEstrellaATabla(' + index + ')">Agregar</button>';
        listaEstrellas.appendChild(li);
    });
}

// Función para mostrar la ventana lista
function mostrarVentanaLista() {
    var ventana = document.getElementById('ventanaLista');
    ventana.classList.remove('hidden');
}

// Función para cerrar la ventana lista
function cerrarVentanaLista() {
    var ventana = document.getElementById('ventanaLista');
    ventana.classList.add('hidden');
}

// Evento click en el botón para mostrar la ventana lista
document.getElementById('btnAgregarEstrella').addEventListener('click', mostrarVentanaLista);

// Evento click en el botón para cerrar la ventana lista
document.getElementById('btnCerrar').addEventListener('click', cerrarVentanaLista);

// Función para filtrar estrellas por nombre o categoría
document.getElementById('busqueda').addEventListener('input', function() {
    var textoBusqueda = this.value.toLowerCase();
    var listaEstrellas = document.getElementById('listaEstrellas').getElementsByTagName('li');

    for (var i = 0; i < listaEstrellas.length; i++) {
        var li = listaEstrellas[i];
        var texto = li.textContent.toLowerCase();

        if (texto.includes(textoBusqueda)) {
            li.style.display = 'block';
        } else {
            li.style.display = 'none';
        }
    }
});

// Función para agregar estrella a la tabla
function agregarEstrellaATabla(index) {
    var estrella = estrellas[index];
    var tabla = document.getElementById('tablaEstrellas').getElementsByTagName('tbody')[0];
    var rowCount = tabla.rows.length;
    var row = tabla.insertRow(rowCount);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);

    cell1.textContent = rowCount + 1; // Número de fila
    cell2.textContent = estrella.nombre + ' - ' + estrella.categoria;
    cell3.innerHTML = '<button onclick="eliminarFila(this)">Eliminar</button>';
}

// Función para eliminar una fila de la tabla
function eliminarFila(btn) {
    var row = btn.parentNode.parentNode;
    row.parentNode.removeChild(row);
    actualizarNumeracion();
}

// Función para actualizar la numeración de las filas
function actualizarNumeracion() {
    var tabla = document.getElementById('tablaEstrellas').getElementsByTagName('tbody')[0];
    for (var i = 0; i < tabla.rows.length; i++) {
        tabla.rows[i].cells[0].textContent = i + 1;
    }
}

function configurarSelectorColor() {
    var colores = document.querySelectorAll('input[type="radio"]');
    colores.forEach((color) => {
        color.addEventListener("click", () => {
            colorSeleccionado = color.id;
        });
    });
}

// Función para elegir color
function elegirColor(fila) {
    if (colorSeleccionado) {
        fila.classList.remove("azul", "rojo"); // Remover otras clases de color
        if (fila.classList.contains(colorSeleccionado)) {
            fila.classList.remove(colorSeleccionado); // Quitar clase si ya la tiene
        } else {
            fila.classList.add(colorSeleccionado); // Añadir clase si no la tiene
        }
    }
}

// Función para delegar evento de fila
function delegarEventoFila() {
    var tabla = document.getElementById('tablaEstrellas').getElementsByTagName('tbody')[0];
    tabla.addEventListener('click', function(event) {
        var target = event.target;
        while (target && target.nodeName !== 'TR') {
            target = target.parentNode;
        }
        if (target) {
            console.log('Fila clickeada', target.rowIndex);
            elegirColor(target);
        }
    });
}




