// Retrieve the cart items from local storage
let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

// Function to update the cart item count in the navbar
function updateCartItemCount() {
  // Get the number of cart items
  const cartItemCount = cartItems.length;

  // Select the cart item count element
  let cartItemCountElement = document.querySelector(".badge");

  // Update the cart item count element
  if (cartItemCountElement) {
    cartItemCountElement.textContent = cartItemCount.toString();
  }
}

// Update the cart item count initially
updateCartItemCount();