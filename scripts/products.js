let allProducts = [];
// Load all poducts
const loadAllProducts = async () => {
    showLoading();
    try {
        const res = await fetch('https://fakestoreapi.com/products');
        const data = await res.json();
        allProducts = data;
        displayAllProducts(allProducts);
    } catch (error) {
        console.error('Error fetching all products: ', error);
    }
}

// Load all categories
const loadAllCategories = async () => {
    try {
        const res = await fetch('https://fakestoreapi.com/products/categories');
        const data = await res.json();
        const categories = data;
        displayCategories(categories);
    } catch (error) {
        console.error('Error fetching categories: ', error);
    }
}

// show Loading Spinner
const showLoading = () => {
    const spinner = document.getElementById('spinner');
    const categoryProductContainer = document.getElementById('categoryProductContainer');
    spinner.classList.remove('hidden');
    categoryProductContainer.classList.add('hidden');
}

// hide loading spinner
const hideLoading = () => {
    const spinner = document.getElementById('spinner');
    const categoryProductContainer = document.getElementById('categoryProductContainer');
    spinner.classList.add('hidden');
    categoryProductContainer.classList.remove('hidden');
}

// Display all products
const displayAllProducts = allProducts => {
    
    const categoryProductContainer = document.getElementById('categoryProductContainer');
    categoryProductContainer.innerHTML = ''; // clear the previous data
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
            <h2 class="card-title">${product.title.length > 30 ? product.title.slice(0, 30) + '...' : product.title}</h2>
            <p>
              ${product.description.slice(0, 100)}...
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
        categoryProductContainer.appendChild(productCardDiv);
    });
    hideLoading();
}
// Display all categories
const displayCategories = categories => {
    // console.log(categories);
    const categoryContainer = document.getElementById('categoryContainer');
    categories.forEach(category => {
        const categoryBtn = document.createElement('button');
        categoryBtn.addEventListener("click", () => {
            // remove active class from all button
        document.querySelectorAll('.category-btn')
            .forEach(btn => {
                btn.classList.remove('btn-primary');
                btn.classList.add('btn-outline');
            });

        // add active class on clicked button
        categoryBtn.classList.remove('btn-outline');
        categoryBtn.classList.add('btn-primary');

        // load category wise products
        loadAllProductsByCategory(category);
    });

        categoryBtn.classList.add('btn', 'rounded-full', 'btn-outline', 'btn-primary', 'category-btn');
        categoryBtn.textContent = `
            ${category}
        `;
        categoryContainer.appendChild(categoryBtn);
    });
}

// Load all poducts by category
const loadAllProductsByCategory = async (category) => {
    showLoading(); // show loading spinner
    try {
        const res = await fetch(`https://fakestoreapi.com/products/category/${category}`);
        const data = await res.json();
        allProducts = data;
        displayCategoryProducts(allProducts);
    } catch (error) {
        console.error('Error fetching all products: ', error);
    }
}

// Display category products
const displayCategoryProducts = allProducts => {

    const categoryProductContainer = document.getElementById('categoryProductContainer');
    categoryProductContainer.innerHTML = ''; // clear the product container
    
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
            <h2 class="card-title">${product.title.length > 30 ? product.title.slice(0, 30) + '...' : product.title}</h2>
            <p>
              ${product.description.slice(0, 100)}...
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
        categoryProductContainer.appendChild(productCardDiv);
    });
    hideLoading(); // hide loading spinner after load the content
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
          <p>${singleProduct.description.slice(0, 200)}</p>
        </div>
      </div>
  `;
  document.getElementById('product_details_modal').showModal();
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
//   cartContainer.innerHTML = ""; // Clear previous badge

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

loadAllProducts();
loadAllCategories();
// loadAllProductsByCategory("women's clothing");