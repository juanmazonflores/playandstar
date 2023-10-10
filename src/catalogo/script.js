
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
const pelicula1 = new Catalogo(1, "The Eras Tour", "Cinepolis", "Cinepolis Hermosillo", "13/Octubre/2023", "", 150, "pelicula1.jpg");
const pelicula2 = new Catalogo(2, "Scream VI", "Cinemex", "Cinemex Metro Centro", "26/octubre/2023", "", 200, "pelicula2.webp");
const pelicula3 = new Catalogo(3, "Coraline", "Cinepolis", "Cinepolis Galerias", "9/noviembre/2023", "", 180, "pelicula3.jpg");

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
              <td> ${pelicula.id} </td>
              <td> <img src="${imagePath + pelicula.imagen}" alt="${pelicula.nombre}" width="100"> </td>
              <td>${pelicula.nombre}</td>
              <td>${pelicula.franquicia}</td>
              <td>${pelicula.lugar}</td>
              <td>${pelicula.fecha}</td>
              <td>${pelicula.descripcion}</td>
              <td>${pelicula.precio}</td>
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

displayTable(catalogo);