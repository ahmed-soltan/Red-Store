let container = document.querySelector(".product-container");

window.addEventListener("DOMContentLoaded", function () {
  fetchAPI();
});
window.addEventListener("load", function() {
  var preloader = document.getElementById("preloader");
  preloader.style.visibility = "hidden"; // Hide the preloader initially

  // Show the preloader for a minimum duration of 2 seconds
  setTimeout(function() {
    // Hide the preloader
    preloader.style.visibility = "hidden";
  }, 2000);
});
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function DisplayProducts(data, category = '') {
  container.innerHTML = '';

  const shuffledData = shuffleArray(data);

  for (let i = 0; i < shuffledData.length; i++) {
    if (category === '' || shuffledData[i].category === category) {
      container.innerHTML += `
        <div class="product" onclick='Product(${shuffledData[i].id})'>
          <img class="image" src=${shuffledData[i].image} alt="">
          <h5 class="title">${shuffledData[i].title.length>50?shuffledData[i].title.substr(0,50):shuffledData[i].title}</h5>
          <div class="stars">
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
          </div>
          <div>
            <span class="price">$${shuffledData[i].price}</span>
            <a class="btn" href="#">SEE MORE</a>
          </div>
        </div>
      `;
    }
  }
}

function filterProducts() {
  const category = document.getElementById('category').value;
  fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(data => {
      DisplayProducts(data, category);
    });
}

function Product(i) {
  fetch(`https://fakestoreapi.com/products/${i}`)
    .then(res => res.json())
    .then(data => {
      let selectedProduct = {id: data.id};
      localStorage.setItem("selectedProductID", JSON.stringify(selectedProduct.id));
      
      window.location.href = `product.html?id=${data.id}`;
    });
}

function fetchAPI() {
  document.getElementById('preloader').style.display = 'block';

  fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(data => {
      document.getElementById('preloader').style.display = 'none';

      DisplayProducts(data);
    });
}
