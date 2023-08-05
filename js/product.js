let productTitle=document.querySelector(".title")
let productDesc=document.querySelector(".desc")
let productPrice=document.querySelector(".price")
let productImage=document.querySelector(".image")
let quantity=document.querySelector(".quantity")
let size=document.querySelector(".select")
let container = document.querySelector(".product-container");

document.getElementById('preloader').style.display = 'block';

const selectedProductID = JSON.parse(localStorage.getItem("selectedProductID"));

window.addEventListener("load", function() {
  var preloader = document.getElementById("preloader");
  preloader.style.visibility = "hidden"; // Hide the preloader initially

  // Show the preloader for a minimum duration of 2 seconds
  setTimeout(function() {
    // Hide the preloader
    preloader.style.visibility = "hidden";
  }, 2000);
});
fetch(`https://fakestoreapi.com/products/${selectedProductID}`)
  .then(res => res.json())
  .then(data => {
    document.getElementById('preloader').style.display = 'none';
    if (data.category=="electronics" || data.category=="jewelery") {
      size.style.display="none"
    }
    productTitle.innerHTML=data.title
    productDesc.innerHTML=data.description
    productPrice.innerHTML=`$${data.price}`
    productImage.src=data.image
    console.log(data.category)
    
  });

  function addToCart() {
    fetch(`https://fakestoreapi.com/products/${selectedProductID}`)
      .then(res => res.json())
      .then(data => {
        let cartItem = {
          id: data.id,
          title: data.title,
          image: data.image,
          category: data.category,
          price: data.price,
          quantity: quantity.value,
          size: size.value
        };
        let cartIcon=document.querySelectorAll(".badge")
        cartIcon.innerHTML=3
        let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  
        cartItems.push(cartItem);
  
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
  
        window.location.href = "cart.html";
      });
  }
  
  let addToCartButton = document.querySelector(".cart");
  addToCartButton.addEventListener("click", addToCart);

const productContainer = document.querySelector(".product-container");

fetch(`https://fakestoreapi.com/products/${selectedProductID}`)
  .then((response) => response.json())
  .then((selectedProduct) => {
    const category = selectedProduct.category;

    fetch(`https://fakestoreapi.com/products/category/${category}`)
      .then((response) => response.json())
      .then((products) => {

        products.forEach((product) => {
          const productCard = `
            <div class="product" onclick='Product(${product.id})'>
              <img src="${product.image}" class="img-top" alt="${product.title}">
                <h5 class="title">${product.title.length>50?product.title.substr(0,50):product.title}</h5>
                <div class="stars">
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                </div>
                <div>                
                <span class="price">$${product.price}</span>
                <a href="#" class="btn">SEE MORE</a></div>
              </div>
            </div>
          `;
          productContainer.insertAdjacentHTML("beforeend", productCard);
        });
        
        
      })
      
      .catch((error) => {
        console.error(error);
      });
  })
  .catch((error) => {
    console.error(error);
  });
  function Product(i) {
    fetch(`https://fakestoreapi.com/products/${i}`)
      .then(res => res.json())
      .then(data => {
        let selectedProduct = {id: data.id};
        localStorage.setItem("selectedProductID", JSON.stringify(selectedProduct.id));
        
        window.location.href = `product.html?id=${data.id}`;
      });
  }
