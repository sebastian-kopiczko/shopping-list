// product constructor
function Product(name, amount, category){
  this.name = name;
  this.amount = amount;
  this.category = category;
}

// ui constructor
function UserInterface(){
  UserInterface.prototype.addProductToList = function(product){
    const list = document.getElementById('product-list');
    // create table row element
    const tableRow = document.createElement('tr');
    tableRow.innerHTML = `
      <td>${product.name}</td>
      <td>${product.amount}</td>
      <td>${product.category}</td>
      <td><a class="button is-danger is-outlined delete-product">Delete</a><td>
    `
    list.appendChild(tableRow);
  }
  // showing alerts
  UserInterface.prototype.showAlert = function(message, className){
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
  // delete product
  UserInterface.prototype.deleteProduct = function(target){
    if(target.classList.contains('delete-product')){
      target.parentElement.parentElement.remove();
    }
  }

  // clearing inputs
  UserInterface.prototype.clearFields = function(){
    document.getElementById('product-name').value = '';
    document.getElementById('product-amount').value = '';
    document.getElementById('product-category').value = '';
  }
}

// event listeners for subbmiting a product
document.getElementById('shopping-form').addEventListener('submit', function(e){
  // getting form values
  const productName = document.getElementById('product-name').value,
        productAmount = document.getElementById('product-amount').value,
        productCategory = document.getElementById('product-category').value;
  const product = new Product(productName, productAmount, productCategory);
  // instance ui
  const ui = new UserInterface();
  // validation
  if(productName === '' || productAmount === '' || productCategory === ''){
    // show error
    ui.showAlert('Fill all the fields', 'is-danger');
  } else {
    // add product to shopping list
    ui.addProductToList(product);

    // inform about success
    ui.showAlert('product added successfully', 'is-success');

    // clear inputs after submitting
    ui.clearFields();
  }
  e.preventDefault();
})

// event listener for deleting a product from list
document.getElementById('product-list').addEventListener('click', function(e){
  const ui = new UserInterface;
  ui.deleteProduct(e.target);
  ui.showAlert(`deleted`, 'is-primary')
});