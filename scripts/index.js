// Load all poducts
const loadAllProducts = async () => {
    try {
        const res = await fetch('https://fakestoreapi.com/products');
        const data = await res.json();
        const allProducts = data;
        displayAllProducts(allProducts);
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
            <figure>
            <img
            class="h-[200px] md:h-[500px] w-full"
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
            <h2 class="card-title">${product.title}</h2>
            <p>
              ${product.description}
            </p>
            <h4 class="text-xl font-bold">$${product.price}</h4>
            <div class="flex gap-4 pt-8">
              <button class="btn btn-soft flex-1">
                <i class="fa-regular fa-eye"></i> Details
              </button>
              <button class="btn btn-primary flex-1">
                <i class="fa-solid fa-cart-shopping"></i> Add
              </button>
            </div>
          </div>
        `;
        productsContainer.appendChild(productCardDiv);
    });
}

loadAllProducts();