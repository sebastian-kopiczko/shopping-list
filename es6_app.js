class Product {
  constructor(name, amount, category){
    this.name = name;
    this.amount = amount;
    this.category = category;
  }
}

class UserInterface{
  addProductToList(product) {
    const list = document.getElementById('product-list');

    // create table row element
    const tableRow = document.createElement('tr');
    tableRow.innerHTML = `
      <td>${product.name}, ${product.amount}</td>
      <td class="has-text-centered">${product.category}</td>
      <td class="has-text-right"><a class="button is-danger is-outlined delete-product">&times;</a></td>
    `;
    list.appendChild(tableRow);
  }

  showAlert(message, className){
    // create div for alert message (bulma notifications)
    const notificationDiv = document.createElement('div');

    // add classname
    notificationDiv.className = `notification ${className}`;

    // apend alert message to notifiaction div
    notificationDiv.appendChild(document.createTextNode(message));

    // get container and form
    const container = document.querySelector('.container'),
          form = document.querySelector('.shopping__form');

    // insert alert before form within container
    container.insertBefore(notificationDiv, form);

    setTimeout(function(){
      document.querySelector('.notification').remove();
    }, 2500)
  }

  deleteProduct(target){
    target.parentElement.parentElement.remove();
  }

  clearFields(){
    document.getElementById('product-name').value = '';
    document.getElementById('product-amount').value = '';
    document.getElementById('product-category').value = '';
  }
}

// local storage class
class Store {
  static getProducts(){
    let products;
    if(localStorage.getItem('products') === null){
      products = [];
    } else {
      products = JSON.parse(localStorage.getItem('products'));
    }
    return products;
  }

  static displayProducts(){
    const products = Store.getProducts();
    products.forEach(function(product){
      const ui = new UserInterface;
      ui.addProductToList(product);
    })
  }

  static addProduct(product){
    const products = Store.getProducts();
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));
  }

  static removeProduct(name, index){
    const products = Store.getProducts();
    products.forEach(function(product, index){
      if(product.name === name) {
        products.splice(index, 1);
      }
    });
    localStorage.setItem('products', JSON.stringify(products));
  }
}

// DOM load event
document.addEventListener('DOMContentLoaded', Store.displayProducts);

// event listener for subbmiting a product
document.getElementById('shopping-form').addEventListener('submit', function(e){
  // getting form values
  const selectField = document.getElementById('product-category');
  const productName = document.getElementById('product-name').value,
        productAmount = document.getElementById('product-amount').value,
        productCategory = selectField.options[selectField.selectedIndex].value;
  const product = new Product(productName, productAmount, productCategory);
  // instance ui
  const ui = new UserInterface();
  // console.log(ui);
  // validation
  if(productName === '' || productAmount === '' || productCategory === ''){
    // show error
    ui.showAlert('Fill all the fields', 'is-danger');
  } else {
    // add product to shopping list
    ui.addProductToList(product);

    // add product to localStorage
    Store.addProduct(product);

    // inform about success
    ui.showAlert('product added successfully', 'is-success');

    // clear inputs after submitting
    ui.clearFields();
  }
  e.preventDefault();
})

// event listener for deleting a product from list
document.getElementById('product-list').addEventListener('click', function(e){
  if(e.target.classList.contains('delete-product')){
    const ui = new UserInterface;

    // remove from the ui
    ui.deleteProduct(e.target);

    // remove from local storage
    const itemToRemove = e.target.parentElement.parentElement.firstElementChild.textContent;
    Store.removeProduct(itemToRemove.substr(0, itemToRemove.indexOf(',')));

    ui.showAlert('deleted', 'is-primary');
  }
  e.preventDefault();
});