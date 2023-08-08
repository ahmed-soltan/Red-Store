
window.addEventListener("load", function() {
  var preloader = document.getElementById("preloader");
  preloader.style.visibility = "hidden"; // Hide the preloader initially

  // Show the preloader for a minimum duration of 2 seconds
  setTimeout(function() {
    // Hide the preloader
    preloader.style.visibility = "hidden";
  }, 2000);
});
// Retrieve the cart items from local storage
let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

// Select the HTML table body where the cart items will be displayed
let cartTableBody = document.querySelector("tbody");

// Select the HTML element to display the total price
let totalPriceElement = document.querySelector(".total");
let subTotalPriceElement = document.querySelector(".sub-total");
let TaxesPriceElement = document.querySelector(".taxes");
let cartItemCountElement = document.querySelector(".badge");

function updateCartItemCount() {
  // Get the number of cart items
  const cartItemCount = cartItems.length;

  // Update the cart item count element
  cartItemCountElement.textContent = cartItemCount.toString();
}

function deleteCartItem(row, index) {
  // Remove the table row from the table body
  cartTableBody.removeChild(row);

  // Remove the cart item from the array
  cartItems.splice(index, 1);

  // Update the cart items in local storage
  if (cartItems.length === 0) {
    // If there are no remaining cart items, remove the "cartItems" key from local storage
    localStorage.removeItem("cartItems");
  } else {
    // Otherwise, update the cart items in local storage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }

  // Recalculate and update the total price and cart item count
  calculateTotalPrice();
  updateCartItemCount();
}

// Function to delete a cart item from the cart container
function deleteCartItems(cartProduct, index) {
  // Remove the table row from the table body
  cartContainer.removeChild(cartProduct);

  // Remove the cart item from the array
  cartItems.splice(index, 1);

  // Update the cart items in local storage
  if (cartItems.length === 0) {
    // If there are no remaining cart items, remove the "cartItems" key from local storage
    localStorage.removeItem("cartItems");
  } else {
    // Otherwise, update the cart items in local storage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }

  // Recalculate and update the total price and cart item count
  calculateTotalPrice();
  updateCartItemCount();
}

// Function to delete a cart item from both the HTML table and the cart container
function deleteCartItemAndCartProduct(row, cartProduct, index) {
  deleteCartItem(row, index);
  deleteCartItems(cartProduct, index);
}

// Function to calculate and update the total price
function calculateTotalPrice() {
  let subTotalPrice = 0;
  
  // Calculate the sum of the prices of all cart items
  cartItems.forEach(cartItem => {
    subTotalPrice += cartItem.price * cartItem.quantity;
  });
  
  let taxes=((subTotalPrice*10)/100).toFixed(2)
  
  // Update the content of the total price elements
  subTotalPriceElement.textContent = `$${subTotalPrice.toFixed(2)}`;
  TaxesPriceElement.textContent = `$${taxes}`;
  totalPriceElement.textContent = `$${(Number(subTotalPrice)+Number(taxes)).toFixed(2)}`;
}

// Select the HTML element where the cart items will be displayed
let cartContainer = document.querySelector(".cartItem");

// Loop through the cart items and add them to the HTML table and the cart container
cartItems.forEach((cartItem, index) => {
  // Create a new table row for each cart item
  let cartTableRow = document.createElement("tr");

  // Create table cells for each cart item property (image, title, price, quantity, size, total)
  let cartItemImageCell = document.createElement("td");
  let cartItemImage = document.createElement("img");

  // Check that the image URL is defined and not empty
  if (cartItem.image && cartItem.image.trim() !== "") {
    cartItemImage.src = cartItem.image;

    // Add an event listener to the image to log any errors
    cartItemImage.addEventListener("error", () => {
      console.error(`Error loading image for item ${cartItem.title}: ${cartItem.image}`);
    });

    cartItemImageCell.appendChild(cartItemImage);
  } else {
    console.warn(`No image found for item ${cartItem.title}`);
  }

  let cartItemTitleCell = document.createElement("td");
  cartItemTitleCell.classList.add("title")
  cartItemTitleCell.textContent = cartItem.title.length > 15 ? cartItem.title.substr(0, 37) : cartItem.title;
  let cartItemPriceCell = document.createElement("td");
  cartItemPriceCell.textContent = `$${cartItem.price * cartItem.quantity}`;
  let cartItemQuantityCell = document.createElement("td");
  cartItemQuantityCell.textContent = cartItem.quantity;
  let cartItemSizeCell = document.createElement("td");
  cartItemSizeCell.textContent = cartItem.category == "jewelery" || cartItem.category == "electronics" ? "_" : cartItem.size;
  let cartActionCell = document.createElement("td");
  let deleteButton = document.createElement("button");
  deleteButton.classList.add("cartAction", "btn", "btn-danger");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => {
    deleteCartItem(cartTableRow,index)
  });
  cartActionCell.appendChild(deleteButton);

  // Append the table cells to the table row
  cartTableRow.appendChild(cartItemImageCell);
  cartTableRow.appendChild(cartItemTitleCell);
  cartTableRow.appendChild(cartItemPriceCell);
  cartTableRow.appendChild(cartItemQuantityCell);
  cartTableRow.appendChild(cartItemSizeCell);
  cartTableRow.appendChild(cartActionCell);

  // Append the table row to the table body
  cartTableBody.appendChild(cartTableRow);

  // Create a new div for each cart item to be displayed in the cart container
  let cartProduct = document.createElement("div");
  cartProduct.classList.add("cartProduct");

  // Create an image element for the cart item image
  let cartProductImage = document.createElement("img");

  if (cartItem.image && cartItem.image.trim() !== "") {
    cartProductImage.src = cartItem.image;

    // Add an event listener to the image to log any errors
    cartProductImage.addEventListener("error", () => {
      console.error(`Error loading image for item ${cartItem.title}: ${cartItem.image}`);
    });

    cartProduct.appendChild(cartProductImage);
  } else {
    console.warn(`No image found for item ${cartItem.title}`);
  }

  // Create a div for the cart item details
  let cartProductDetails = document.createElement("div");
  cartProductDetails.classList.add("cartProductDetails");

  // Create a heading element for the cart item title
  let cartProductTitle = document.createElement("h3");
  cartProductTitle.textContent = cartItem.title;
  cartProductDetails.appendChild(cartProductTitle);

  // Create a paragraph element for the cart item price and quantity
  let cartProductPriceQuantity = document.createElement("p");
  cartProductPriceQuantity.textContent = `$${cartItem.price * cartItem.quantity}`;
  cartProductDetails.appendChild(cartProductPriceQuantity);
  
  // Create a paragraph element for the cart item price and quantity
  let cartProductQuantity = document.createElement("p");
  cartProductQuantity.textContent = `${cartItem.quantity}`;
  cartProductDetails.appendChild(cartProductQuantity);

  // Create a paragraph element for the cart item size
  let cartProductSize = document.createElement("p");
  cartProductSize.textContent = `Size: ${cartItem.category == "jewelery" || cartItem.category == "electronics" ? "_" : cartItem.size}`;
  cartProductDetails.appendChild(cartProductSize);

  // Append the cart item details to the cart product div
  cartProduct.appendChild(cartProductDetails);

  // Create a delete button for the cart item
  let cartProductDeleteButton = document.createElement("button");
  cartProductDeleteButton.classList.add("cartProductDeleteButton", "btn", "btn-danger");
  cartProductDeleteButton.textContent = "Delete";
  cartProductDeleteButton.addEventListener("click", () => {
    deleteCartItems(cartProduct, index);
  });

  // Append the delete button to the cart product div
  cartProduct.appendChild(cartProductDeleteButton);

  // Append the cart product div to the cart container
  cartContainer.appendChild(cartProduct);
});

// Calculate and update the total price on page load
calculateTotalPrice();

// Update the cart item count on page load
updateCartItemCount();
