// 1. MODELO DE DATOS
class Venta {
    constructor(id, cliente, telefono, pelicula, precio, fecha, vendedor, detalles) {
      this.id = id; // Identificador de la venta
      this.cliente = cliente; // Nombre del cliente
      this.telefono = telefono; // Teléfono del cliente
      this.pelicula = pelicula; // Fecha de la venta
      this.precio = precio; // Vendedor
      this.fecha = fecha; // Referencia al modelo de la casa vendida
      this.vendedor = vendedor; // Precio de la venta
      this.detalles = detalles; // Información adicional sobre la venta
    }
  }

function mapAPIToSales(data) {
    return data.map(item => {
      return new Venta(
        item.id,
        item.cliente,
        item.telefono,
        item.pelicula,
        item.precio,
        new Date(item.fecha),
        item.vendedor,
        item.detalles
      );
    });
  }

// Definir clase Pelicula
  class Pelicula {

    constructor(id, nombre, precio) {
      this.id = id;
      this.nombre = nombre;
      this.precio = precio;
    }
  
  }

// 2. VIEW DE VENTAS

function displaySalesView(ventas) {

  clearTable();

  showLoadingMessage();
  console.log(ventas.length)

  if (ventas.length === 0) {

    showNotFoundMessage();

  } else {

    hideMessage();

    displaySalesTable(ventas);
  }

}

function displayClearSalesView() {
  clearTable();

  showInitialMessage();
}

// Funcion para agregar datos de las peliculas a la tabla
function displaySalesTable(ventas) {

  const tablaBody = document.getElementById('data-table-body');

  ventas.forEach(venta => {

    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${venta.id}</td>
      <td>${venta.cliente}</td>
      <td>${venta.telefono}</td>
      <td>${venta.pelicula}</td>
      <td>${venta.vendedor}</td>
      <td>${formatDate2(venta.fecha)}</td>
      <td class="text-right">${formatCurrency(venta.precio)}</td>
      <td>${venta.detalles}</td>
      <td>
        <button class="btn-delete  fa-solid fa-trash" data-sale-id="${venta.id}"></button>
      </td>
    `;

    tablaBody.appendChild(row);

  });

  initDeleteSaleButtonHandler();
}

// Funcion que limpia la tabla
function clearTable() {
  const tableBody = document.getElementById('data-table-body');

  tableBody.innerHTML = '';
}

// Funcion que muestra mensaje de carga
function showLoadingMessage() {
  const message = document.getElementById('message');

  message.innerHTML = 'Cargando...';

  message.style.display = 'block';
}

// Funcion que muestra mensaje de carga
function showInitialMessage() {
  const message = document.getElementById('message');

  message.innerHTML = 'No se ha realizado una consulta de ventas.';

  message.style.display = 'block';
}


// Funcion que muestra mensaje de que no se encuentraron datos
function showNotFoundMessage() {
  const message = document.getElementById('message');

  message.innerHTML = 'No se encontraron casas con el filtro proporcionado.';

  message.style.display = 'block';
}

// Funcion que oculta mensaje
function hideMessage() {
  const message = document.getElementById('message');

  message.style.display = 'none';
}

  initAddSaleButtonsHandler();

  initFilterButtonsHandler();
  
  getSalesData();
