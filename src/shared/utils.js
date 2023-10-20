// Formatea un número como una cadena en formato de moneda (MXN).
function formatCurrency(number) {
  if (typeof number !== 'number') {
    throw new Error('El valor proporcionado no es un número.');
  }

  return number.toLocaleString('en-US', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

// Formatea un número con dos decimales.
function formatDecimal(number) {
  if (typeof number !== 'number') {
    throw new Error('El valor proporcionado no es un número.');
  }

  return number.toFixed(2);
}

// Formatea una fecha
function formatDate(date){
  array=date.split("-")
  console.log(array[0],array[1],array[2],array[3],array[4]);
  const event = new Date(Date.UTC(array[0], array[1]-1, array[2]));
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
  return event.toLocaleDateString('es-ES', options)
}

function formatDate2(date) {
  if (!(date instanceof Date)) {
    throw new Error('El valor proporcionado no es una instancia de Date.');
  }

  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1; // Sumamos 1 ya que los meses son base 0.
  const year = date.getUTCFullYear();

  // Aseguramos que los componentes de la fecha tengan al menos dos dígitos.
  const formattedDay = String(day).padStart(2, '0');
  const formattedMonth = String(month).padStart(2, '0');

  return `${formattedDay}/${formattedMonth}/${year}`;
}