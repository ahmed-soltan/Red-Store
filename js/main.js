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
function DisplayProducts(data, category = '') {
  container.innerHTML = '';
  var randomIndices = getRandomIndices(4, data.length);

  for (let i = 0; i < randomIndices.length; i++) {
    const randomIndex = randomIndices[i];

    if (category === '' || data[randomIndex].category === category) {
      container.innerHTML += `
        <div class="product wow fadeInUp" data-wow-duration="2s" data-wow-delay=".5s" onclick='Product(${data[randomIndex].id})'>
          <img class="image" src=${data[randomIndex].image} alt="">
          <h5 class="title">${data[randomIndex].title.length > 50 ? data[randomIndex].title.substr(0, 40) + "<span>  .......<span>" : data[randomIndex].title}</h5>
          <div class="stars">
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
          </div>
          <div>
            <span class="price">$${data[randomIndex].price}</span>
            <a class="btn" href="#">SEE MORE</a>
          </div>
        </div>
      `;
    }
  }
}

function getRandomIndices(count, maxIndex) {
  var indices = [];

  while (indices.length < count) {
    var randomIndex = Math.floor(Math.random() * maxIndex);

    if (!indices.includes(randomIndex)) {
      indices.push(randomIndex);
    }
  }

  return indices;
}
  
function Product(i){
  console.log(i);
  fetch(`https://fakestoreapi.com/products/${i}`)
  .then(res => res.json())
  .then(data => {
      console.log(data.id);
      let selectedProduct = {id: data.id};

      localStorage.setItem("selectedProductID", JSON.stringify(selectedProduct.id));

      window.location.href = "product.html";
  });
}

function fetchAPI() {
  
  fetch('https://fakestoreapi.com/products')
  .then(res => res.json())
  .then(data => {
        console.log(data)
  
        DisplayProducts(data);
      });
  }
