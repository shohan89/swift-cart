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
// Display all categories
const displayCategories = categories => {
    // console.log(categories);
    const categoryContainer = document.getElementById('categoryContainer');
    categories.forEach(category => {
        const categoryBtn = document.createElement('button');
        categoryBtn.classList.add('btn', 'rounded-full', 'btn-outline', 'btn-primary');
        categoryBtn.textContent = `
            ${category}
        `;
        categoryContainer.appendChild(categoryBtn);
    });
}

// Load all poducts by category
const loadAllProductsByCategory = async (category) => {
    try {
        const res = await fetch(`https://fakestoreapi.com/products/category/${category}`);
        const data = await res.json();
        const allProducts = data;
        displayCategoryProducts(allProducts);
    } catch (error) {
        console.error('Error fetching all products: ', error);
    }
}

// Display category products
const displayCategoryProducts = allProducts => {
    console.log(allProducts);
    const categoryProductContainer = document.getElementById('categoryProductContainer');
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
            <h2 class="card-title">${product.title.slice(0, 30)}...</h2>
            <p>
              ${product.description.slice(0, 100)}...
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
        categoryProductContainer.appendChild(productCardDiv);
    });
}

loadAllCategories();
loadAllProductsByCategory("women's clothing");