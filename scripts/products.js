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
    console.log(categories);
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

loadAllCategories();



// Load all poducts by category
const loadAllProductsByCategory = async (category) => {
    try {
        const res = await fetch(`https://fakestoreapi.com/products/category/${category}`);
        const data = await res.json();
        const allProducts = data;
        // console.log(allProducts);
    } catch (error) {
        console.error('Error fetching all products: ', error);
    }
}


loadAllProductsByCategory('jewelery');