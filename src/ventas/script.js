//MANIPULAR MODAL
function initAddSaleButtonHandler() {

    document.getElementById('addSale').addEventListener('click', () => {
        document.getElementById('modalBackground').style.display = 'block';
        document.getElementById('modal').style.display = 'block';
    });
  
    modalBackground.addEventListener('click', () => {
        document.getElementById('modalBackground').style.display = 'none';
        document.getElementById('modal').style.display = 'none';
    });
  
  }

initAddSaleButtonHandler();
