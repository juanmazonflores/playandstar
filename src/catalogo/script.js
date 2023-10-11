
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
              <td> ${pelicula.id} </td>
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



displayTable(catalogo);

