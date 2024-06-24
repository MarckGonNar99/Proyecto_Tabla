 // Arreglo para almacenar todas las estrellas obtenidas
 var estrellas = [];
 var filaSeleccionada = null;

 // Función para cargar las estrellas desde la base de datos al cargar la página
 document.addEventListener('DOMContentLoaded', function() {
     cargarEstrellas();
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

 // Función para mostrar la ventana lista y guardar la fila seleccionada
 function mostrarVentanaLista(fila) {
     filaSeleccionada = fila;
     var ventana = document.getElementById('ventanaLista');
     ventana.classList.remove('hidden');
 }

 // Función para cerrar la ventana lista
 function cerrarVentanaLista() {
     var ventana = document.getElementById('ventanaLista');
     ventana.classList.add('hidden');
 }

 // Evento click en el botón para cerrar la ventana lista
 document.getElementById('btnCerrar').addEventListener('click', ()=>{
    var ventana = document.getElementById('ventanaLista');
     ventana.classList.add('hidden');
 });

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
     var row = tabla.rows[filaSeleccionada - 1];
     var cell2 = row.cells[1];
     var cell3 = row.cells[2];

     cell2.textContent = estrella.nombre + ' - ' + estrella.categoria;
     cell3.innerHTML = '<button onclick="eliminarFila(this)">Eliminar</button>';

     cerrarVentanaLista();
 }

 // Función para eliminar una fila de la tabla
 function eliminarFila(btn) {
     var row = btn.parentNode.parentNode;
     var cell2 = row.cells[1];
     var cell3 = row.cells[2];

     cell2.textContent = '';
     cell3.innerHTML = '<button onclick="mostrarVentanaLista(' + (row.rowIndex) + ')">Agregar Estrella</button>';
 }
