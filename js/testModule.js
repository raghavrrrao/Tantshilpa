// testModule.js

import { products } from './data.js';  // Import products data

// Function to display products based on selected category
export function displayProducts(category) {
    let productList = document.getElementById('productList');
    productList.innerHTML = '';  // Clear any previous products

    // Get products for the selected category
    let categoryProducts = products[category];

    // Loop through products and display them
    categoryProducts.forEach(product => {
        let productCard = document.createElement('div');
        productCard.classList.add('col-3', 'mb-4');

        productCard.innerHTML = `
            <div class="card">
                <img src="${product.image}" class="card-img-top" loading="lazy" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                </div>
            </div>
        `;

        productList.appendChild(productCard);
    });
}


