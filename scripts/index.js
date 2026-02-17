let allProducts = [];
// Load all poducts
const loadAllProducts = async () => {
    try {
        const res = await fetch('https://fakestoreapi.com/products');
        const data = await res.json();
        allProducts = data;
        // get top 3 rated products
        const topRatedProducts = allProducts
            .sort((a, b) => b.rating.rate - a.rating.rate)
            .slice(0, 3);

        displayAllProducts(topRatedProducts);
    } catch (error) {
        console.error('Error fetching all products: ', error);
    }
}

// Display all products
const displayAllProducts = allProducts => {
    // console.log(allProducts);
    const productsContainer = document.getElementById('productsContainer');
    allProducts.forEach(product => {
        const productCardDiv = document.createElement('div');
        productCardDiv.classList.add('card', 'bg-base-100', 'shadow-sm');
        productCardDiv.innerHTML = `
            <figure class='h-96'>
            <img
              class='h-full'
              src=${product.image}
              alt=${product.title}
            />
          </figure>
          <div class="card-body">
            <div class="body-header flex justify-between py-5">
              <div class="badge badge-soft badge-primary">${product.category}</div>
              <div class="reviews">
                <i class="fa-solid fa-star text-yellow-400"></i> ${product.rating.rate} (${product.rating.count})
              </div>
            </div>
            <h2 class="card-title">${product.title.length > 30 ? product.title.slice(0, 30) + '...' :
            product.title
          }</h2>
            <p>
              ${product.description.slice(0, 200)}...
            </p>
            <h4 class="text-xl font-bold">$${product.price}</h4>
            <div class="flex gap-4 pt-8">
              <button onclick="loadProductDetails(${product.id})" class="btn btn-soft flex-1">
                <i class="fa-regular fa-eye"></i> Details
              </button>
              <button onclick='storeAddToCart(${product.id})' class="btn btn-primary flex-1">
                <i class="fa-solid fa-cart-shopping"></i> Add
              </button>
            </div>
          </div>
        `;
        productsContainer.appendChild(productCardDiv);
    });
}

let cart = []; // Global cart
const storeAddToCart = productId => {

  // get the product via id
  const product = allProducts.find(p => p.id === productId);

  // check if the product id already in the cart
  if (cart.some(product => product.id === productId)) {
    alert("This product is already added!!");
    return; // stop execution here
  }

  const updatedCart = [...cart, product];
  cart = updatedCart;
  // console.log(cart.length);
  updateCart(cart);
}

// update the cart and show how many item added
const updateCart = currentCart => {
  const cartContainer = document.getElementById('cartContainer');

  if (currentCart.length === 0) {
    return;
  }

  const cartBadgeDiv = document.createElement('div');
    cartBadgeDiv.classList.add('badge', 'badge-primary', 'absolute', '-top-2', '-right-5');
    cartBadgeDiv.innerHTML = `
      <span>${currentCart.length}</span>
    `;
    cartContainer.appendChild(cartBadgeDiv);
}
// Load Product details
const loadProductDetails = async productId => {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${productId}`);
    const data = await res.json();
    displayProductDetailsModal(data);
  } catch (error) {
    console.error('Error fetching product detail: ', error);
  }
}

// display product details modal
const displayProductDetailsModal = singleProduct => {
  const productDetailsContainer = document.getElementById('productDetailsContainer');
  productDetailsContainer.innerHTML = `
      <div class="card bg-base-100 shadow-sm">
        <figure class='h-96'>
          <img
            class='h-full'
            src=${singleProduct.image}
            alt=${singleProduct.title} />
        </figure>
        <div class="card-body">
          <h2 class="card-title">${singleProduct.title.length > 30 ? singleProduct.title.slice(0, 30) + '...' :
            singleProduct.title
          }</h2>
          <p>${singleProduct.description.slice(0, 50)}</p>
        </div>
      </div>
  `;
  document.getElementById('product_details_modal').showModal();
}

loadAllProducts();