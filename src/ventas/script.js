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

  message.innerHTML = 'No se encontraron boletos vendidos.';

  message.style.display = 'block';
}

// Funcion que oculta mensaje
function hideMessage() {
  const message = document.getElementById('message');

  message.style.display = 'none';
}

// 3. FILTROS VIEW

function initFilterButtonsHandler() {

  console.log("entre 1")
  document.getElementById('filter-form').addEventListener('submit', event => {
    event.preventDefault();
    console.log("entre 1")
    searchSales();
  });

  document.getElementById('reset-filters').addEventListener('click', () => clearSales());

}


function clearSales() {
  document.querySelector('select.filter-field').selectedIndex = 0;
  document.querySelectorAll('input.filter-field').forEach(input => input.value = '');

  displayClearSalesView();
}

function resetSales() {
  document.querySelector('select.filter-field').selectedIndex = 0;
  document.querySelectorAll('input.filter-field').forEach(input => input.value = '');
  searchSales();
}

function searchSales() {
  const pelicula = document.getElementById('pelicula-filtro').value;
  const cliente = document.getElementById('cliente-filtro').value;
  const vendedor = document.getElementById('vendedor-filtro').value;
  const fecha = document.getElementById('fecha-filtro').value;

  getSalesData(pelicula, cliente, vendedor, fecha);
}


// 4. MANIPULAR MODAL
function initAddSaleButtonsHandler() {

    document.getElementById('addSale').addEventListener('click', () => {
      openAddSaleModal()
    });
  
    document.getElementById('modal-background').addEventListener('click', () => {
      closeAddSaleModal();
    });

    document.getElementById('sale-form').addEventListener('submit', event => {
      event.preventDefault();
      processSubmitSale();
    });
  
  }

  
function openAddSaleModal() {
  document.getElementById('sale-form').reset();
  document.getElementById('modal-background').style.display = 'block';
  document.getElementById('modal').style.display = 'block';
}

function closeAddSaleModal() {
  document.getElementById('sale-form').reset();
  document.getElementById('modal-background').style.display = 'none';
  document.getElementById('modal').style.display = 'none';
}

function processSubmitSale() {
  const nombre = document.getElementById('cliente').value;
  const telefono = document.getElementById('telefono').value;
  const pelicula = document.getElementById('pelicula').value;
  const precio = document.getElementById('precio').value;
  const fecha= document.getElementById('fecha').value;
  const vendedor = document.getElementById('vendedor').value;
  const detalles = document.getElementById('detalles').value;
  
  const saleToSave = new Venta(
    null,
    nombre,
    telefono,
    pelicula,
    parseFloat(precio),
    fecha,
    vendedor,
    detalles

  );

  createSale(saleToSave);
}


  function initDeleteSaleButtonHandler() {

    document.querySelectorAll('.btn-delete').forEach(button => {
  
      button.addEventListener('click', () => {
  
        const saleId = button.getAttribute('data-sale-id'); // Obtenemos el ID de la venta
        deleteSale(saleId); // Llamamos a la función para eleminar la venta
  
      });
  
    });
  
  }

// 5. CARGAR DATOS DE MODELOS PARA FORM

  function displayRealEstateOptions(peliculas) {

    const peliculaFiltro = document.getElementById('pelicula-filtro');
    const peliculaModal = document.getElementById('peliculas');
  
    peliculas.forEach(pelicula => {
  
      const optionFilter = document.createElement('option');
  
      optionFilter.value = pelicula.nombre;
      optionFilter.text = `${pelicula.nombre} - ${formatCurrency(pelicula.precio)}`;
  
      peliculaFiltro.appendChild(optionFilter);
  
      const optionModal = document.createElement('option');
  
      optionModal.value = pelicula.nombre;
      optionModal.text = `${pelicula.nombre} - ${formatCurrency(pelicula.precio)}`;
  
      peliculaModal.appendChild(optionModal);
    });
  
  }

// 6 . CONSUMO DE DATOS DESDE API

  function getSalesData(pelicula, cliente, vendedor, fecha) {

    const url = buildGetSalesDataUrl(pelicula, cliente, vendedor, fecha);
    console.log(url);
  
    fetchAPI(url, 'GET')
      .then(data => {
        const salesList = mapAPIToSales(data);
        console
        displaySalesView(salesList);
      });
  }

  function createSale(venta) {

    fetchAPI(`${apiURL}/ventas`, 'POST', venta)
      .then(venta => {
        closeAddSaleModal();
        resetSales();
        window.alert(`Venta: ${venta.id} creada correctamente.`);
      });
  
  }

  function deleteSale(saleId) {

  const confirm = window.confirm(`¿Estás seguro de que deseas eliminar la venta ${saleId}?`);

  if (confirm) {

    fetchAPI(`${apiURL}/ventas/${saleId}`, 'DELETE')
      .then(() => {
        resetSales();
        window.alert("Venta eliminada.");
      });

  }

}

function buildGetSalesDataUrl(pelicula, cliente, vendedor, fecha) {

  const url = new URL(`${apiURL}/ventas`);
  console.log(apiURL);

  if (pelicula) {
    url.searchParams.append('pelicula', pelicula);
  }

  if (cliente) {
    url.searchParams.append('cliente', cliente);
  }

  if (vendedor) {
    url.searchParams.append('vendedor', vendedor);
  }

  if (fecha) {
    url.searchParams.append('fecha', fecha);
  }

  return url;
}

// 7. INICIALIZAR CONTROLADORES

  initAddSaleButtonsHandler();

  initFilterButtonsHandler();
  
  getSalesData();

