let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

let cartTableBody = document.querySelector("tbody");
let cartForm = document.querySelector(".cart-form");
let OrderBtn = document.querySelector(".order-btn");

window.addEventListener("load", function () {
  var preloader = document.getElementById("preloader");
  preloader.style.visibility = "hidden"; // Hide the preloader initially

  // Show the preloader for a minimum duration of 2 seconds
  setTimeout(function () {
    // Hide the preloader
    preloader.style.visibility = "hidden";
  }, 2000);
});

OrderBtn.addEventListener("click", function (event) {
  if (cartItems.length === 0) {
    event.preventDefault();
    console.log("Please add products to the cart before submitting the form.");
    return false;
  }
});

let totalPriceElement = document.querySelector(".total");
let subTotalPriceElement = document.querySelector(".sub-total");
let TaxesPriceElement = document.querySelector(".taxes");
let cartItemCountElement = document.querySelector(".badge");

function updateCartItemCount() {
  const cartItemCount = cartItems.length;

  cartItemCountElement.innerHTML = cartItemCount.toString();
}

function deleteCartItem(row, index) {
  cartTableBody.removeChild(row);

  cartItems.splice(index, 1);

  localStorage.setItem("cartItems", JSON.stringify(cartItems));

  calculateTotalPrice();
  updateCartItemCount();
}

function deleteCartItems(cartProduct, index) {
  cartContainer.removeChild(cartProduct);

  cartItems.splice(index, 1);

  localStorage.setItem("cartItems", JSON.stringify(cartItems));

  calculateTotalPrice();
  updateCartItemCount();
}

function calculateTotalPrice() {
  let subTotalPrice = 0;

  cartItems.forEach((cartItem) => {
    subTotalPrice += cartItem.price * cartItem.quantity;
  });

  let taxes = ((subTotalPrice * 10) / 100).toFixed(2);

  subTotalPriceElement.innerHTML = `$${subTotalPrice.toFixed(2)}`;
  TaxesPriceElement.innerHTML = `$${taxes}`;
  totalPriceElement.innerHTML = `$${(Number(subTotalPrice) + Number(taxes)).toFixed(2)}`;
}

let cartContainer = document.querySelector(".cartItem");

cartItems.forEach((cartItem, index) => {
  let cartTableRow = document.createElement("tr");

  let cartItemImageCell = document.createElement("td");
  let cartItemImage = document.createElement("img");

  if (cartItem.image && cartItem.image.trim() !== "") {
    cartItemImage.src = cartItem.image;

    cartItemImage.addEventListener("error", () => {
      console.error(`Error loading image for item ${cartItem.title}: ${cartItem.image}`);
    });

    cartItemImageCell.appendChild(cartItemImage);
  } else {
    console.warn(`No image found for item ${cartItem.title}`);
  }

  let cartItemTitleCell = document.createElement("td");
  cartItemTitleCell.classList.add("title");
  cartItemTitleCell.innerHTML = cartItem.title.length > 15 ? cartItem.title.substr(0, 37) : cartItem.title;
  let cartItemPriceCell = document.createElement("td");
  cartItemPriceCell.innerHTML = `$${cartItem.price * cartItem.quantity}`;
  let cartItemQuantityCell = document.createElement("td");
  cartItemQuantityCell.innerHTML = cartItem.quantity;
  let cartItemSizeCell = document.createElement("td");
  cartItemSizeCell.innerHTML = cartItem.category == "jewelery" || cartItem.category == "electronics" ? "_" : cartItem.size;
  let cartActionCell = document.createElement("td");
  let deleteButton = document.createElement("button");
  deleteButton.classList.add("cartAction", "btn", "btn-danger");
  deleteButton.innerHTML = "Delete";
  deleteButton.addEventListener("click", function () {
    deleteCartItem(cartTableRow, index);
  });
  cartActionCell.appendChild(deleteButton);

  cartTableRow.appendChild(cartItemImageCell);
  cartTableRow.appendChild(cartItemTitleCell);
  cartTableRow.appendChild(cartItemPriceCell);
  cartTableRow.appendChild(cartItemQuantityCell);
  cartTableRow.appendChild(cartItemSizeCell);
  cartTableRow.appendChild(cartActionCell);

  cartTableBody.appendChild(cartTableRow);

  let cartProduct = document.createElement("div");
  cartProduct.classList.add("cartProduct");

  let cartProductImage = document.createElement("img");

  if (cartItem.image && cartItem.image.trim() !== "") {
    cartProductImage.src = cartItem.image;

    cartProductImage.addEventListener("error", () => {
      console.error(`Error loading image for item ${cartItem.title}: ${cartItem.image}`);
    });

    cartProduct.appendChild(cartProductImage);
  } else {
    console.warn(`No image found for item ${cartItem.title}`);
  }

  let cartProductTitle = document.createElement("h4");
cartProductTitle.innerHTML = cartItem.title.length > 15 ? cartItem.title.substr(0, 37) : cartItem.title;
let cartProductPrice = document.createElement("p");
cartProductPrice.innerHTML = `$${cartItem.price * cartItem.quantity}`;
let cartProductQuantity = document.createElement("p");
cartProductQuantity.innerHTML = cartItem.quantity;
let cartProductSize = document.createElement("p");
cartProductSize.innerHTML = cartItem.category == "jewelery" || cartItem.category == "electronics" ? "_" : cartItem.size;
let cartProductDelete = document.createElement("button");
cartProductDelete.innerHTML = "Delete";
cartProductDelete.classList.add("btn", "btn-danger");
cartProductDelete.addEventListener("click", function () {
  deleteCartItems(cartProduct, index);
});

cartProduct.appendChild(cartProductTitle);
cartProduct.appendChild(cartProductPrice);
cartProduct.appendChild(cartProductQuantity);
cartProduct.appendChild(cartProductSize);
cartProduct.appendChild(cartProductDelete);

cartContainer.appendChild(cartProduct);

calculateTotalPrice();
updateCartItemCount();
});

calculateTotalPrice();
updateCartItemCount();
