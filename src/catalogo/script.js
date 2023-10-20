
//Definicion de clase catalogo
class Catalogo {

    constructor(id, nombre, franquicia, lugar, fecha, descripcion, precio, imagen) {
        this.id = id;
        this.nombre = nombre;
        this.franquicia = franquicia;
        this.lugar = lugar;
        this.fecha = fecha;
        this.descripcion = descripcion;
        this.precio = precio;
        this.imagen = imagen;
    }

}

// Objetos peliculas
const pelicula1 = new Catalogo(1, "The Eras Tour", "Cinepolis", "Hermosillo", "2023-10-13", "Premiere", 150, "pelicula1.jpg");
const pelicula2 = new Catalogo(2, "Scream VI", "Cinemex", "Metro Centro", "2023-10-26", "Premium", 200, "pelicula3.jpg");
const pelicula3 = new Catalogo(3, "Coraline", "Cinepolis", "Galerias", "2023-11-9", "Premium", 180, "pelicula2.webp");

//Almacenar objetos en array
const catalogo = [pelicula1, pelicula2, pelicula3];

//Acceder a datos por indice
console.log(catalogo[0]);
console.log(catalogo[1]);
console.log(catalogo[2]);


//Ver modelos en HTML
function displayTable(peliculas) {

    clearTable();

    showLoadingMessage();

    setTimeout(() => {

        if (peliculas.length === 0) {

            showNotFoundMessage();

        } else {

            hideMessage();

            const tablaBody = document.getElementById('data-table-body');

            const imagePath = `../assets/img/catalogo/`;

            peliculas.forEach(pelicula => {

                const row = document.createElement('tr');

                row.innerHTML = `
              <td> <img src="${imagePath + pelicula.imagen}" alt="${pelicula.nombre}" width="100"> </td>
              <td>${pelicula.nombre}</td>
              <td>${pelicula.franquicia}</td>
              <td>${pelicula.lugar}</td>
              <td>${formatDate(pelicula.fecha)}</td>
              <td>${pelicula.descripcion}</td>
              <td>${formatCurrency(pelicula.precio)}</td>
            `;

                tablaBody.appendChild(row);

            });

        }

    }, 2000);

}

function clearTable() {
    const tableBody = document.getElementById('data-table-body');

    tableBody.innerHTML = '';
}

function showLoadingMessage() {
    const messageNotFound = document.getElementById('message-not-found');

    messageNotFound.innerHTML = 'Cargando...';

    messageNotFound.style.display = 'block';
}

function showNotFoundMessage() {
    const messageNotFound = document.getElementById('message-not-found');

    messageNotFound.innerHTML = 'No se encontraron casas con el filtro proporcionado.';

    messageNotFound.style.display = 'block';
}

function hideMessage() {
    const messageNotFound = document.getElementById('message-not-found');

    messageNotFound.style.display = 'none';
}

//FILTROS
// Mostrar filtros


function mostrar(id) {

    const nombre = document.getElementById("nombre");
    const franquicia = document.getElementById("franquicia");
    const lugar = document.getElementById("lugar");
    const fechamin = document.getElementById("fecha-min");
    const fechamax = document.getElementById("fecha-max");
    const descripcion = document.getElementById("descripcion");
    const preciomin = document.getElementById("precio-min");
    const preciomax = document.getElementById("precio-max");



    if (id == "nombre") {
        nombre.style.display = "initial";
    }

    if (id == "franquicia") {
        franquicia.style.display = "initial";
    }

    if (id == "lugar") {
        lugar.style.display = "initial";
    }

    if (id == "fecha") {
        fechamax.style.display = "initial";
        fechamin.style.display = "initial";
    }
    if (id == "descripcion") {
        descripcion.style.display = "initial";
    }
    if (id == "precio") {
        preciomin.style.display = "initial";
        preciomax.style.display = "initial";
    }
}

function initButtonsHandler() {

    document.getElementById('filter-form').addEventListener('submit', event => {
        event.preventDefault();
        applyFilters();
    });

    document.getElementById('reset-filters').addEventListener('click', () => {
        document.querySelectorAll('input.filter-field').forEach(input => input.value = '');
        applyFilters();
    });

    document.getElementById('delete-filters').addEventListener('click', () => {
        document.querySelectorAll('input.filter-field').forEach(input => input.value = '');
        applyFilters();
        quitarFiltros();
    });

}

function applyFilters() {
    const filtroNombre = document.getElementById('nombre').value.toLowerCase();
    const filtroFranquicia = document.getElementById('franquicia').value.toLowerCase();
    const filtroDescripcion = document.getElementById('descripcion').value.toLowerCase();
    const filtroLugar = document.getElementById('lugar').value.toLowerCase();
    const filtroFechaMin = document.getElementById('fecha-min').value;
    const filtroFechaMax = document.getElementById('fecha-max').value;
    const filtroPrecioMin = parseFloat(document.getElementById('precio-min').value);
    const filtroPrecioMax = parseFloat(document.getElementById('precio-max').value);

    const PeliculasFiltradas = filtrarPeliculas(catalogo, filtroNombre, filtroFranquicia, filtroDescripcion, filtroLugar, filtroFechaMin, filtroFechaMax, filtroPrecioMin, filtroPrecioMax);

    displayTable(PeliculasFiltradas);
}

function filtrarPeliculas(peliculas, nombre, franquicia, descripcion, lugar, fechaMin, fechaMax, precioMin, precioMax) {
    const fechaMin1 = Date.parse(fechaMin);
    const fechaMax1 = Date.parse(fechaMax);
    console.log(fechaMin1);
    console.log(fechaMax1);

    return peliculas.filter(pelicula =>
        (!fechaMin1 || Date.parse(pelicula.fecha) >= fechaMin1) &&
        (!fechaMax1 || Date.parse(pelicula.fecha) <= fechaMax1) &&
        (!precioMin || pelicula.price >= precioMin) &&
        (!precioMax || pelicula.price <= precioMax) &&
        (!nombre || pelicula.nombre.toLowerCase().includes(nombre)) &&
        (!franquicia || pelicula.franquicia.toLowerCase().includes(franquicia)) &&
        (!descripcion || pelicula.descripcion.toLowerCase().includes(descripcion)) &&
        (!lugar || pelicula.lugar.toLowerCase().includes(lugar))
    );
}

function quitarFiltros(){
    const nombre = document.getElementById("nombre");
    const franquicia = document.getElementById("franquicia");
    const lugar = document.getElementById("lugar");
    const fechamin = document.getElementById("fecha-min");
    const fechamax = document.getElementById("fecha-max");
    const descripcion = document.getElementById("descripcion");
    const preciomin = document.getElementById("precio-min");
    const preciomax = document.getElementById("precio-max");
    
    nombre.style.display = "none";
    franquicia.style.display = "none";
    lugar.style.display = "none";
    fechamax.style.display = "none";
    fechamin.style.display = "none";
    descripcion.style.display = "none";
    preciomin.style.display = "none";
    preciomax.style.display = "none";

}

initButtonsHandler();
displayTable(catalogo);

