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
      <td><a class="button is-danger is-outlined">Delete</a><td>
    `
    list.appendChild(tableRow);
  }

  UserInterface.prototype.clearFields = function(){
    document.getElementById('product-name').value = '';
    document.getElementById('product-amount').value = '';
    document.getElementById('product-category').value = '';
  }
}

// event listeners
document.getElementById('shopping-form').addEventListener('submit', function(e){
  // getting form values
  const productName = document.getElementById('product-name').value,
        productAmount = document.getElementById('product-amount').value,
        productCategory = document.getElementById('product-category').value;
  const product = new Product(productName, productAmount, productCategory);
  // instance ui
  const ui = new UserInterface();
  // add product to shopping list
  ui.addProductToList(product);
  // clear inputs after submitting
  ui.clearFields();
  e.preventDefault();
})