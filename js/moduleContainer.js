import { products } from './data.js';

onload = function () {
    let navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navLinks.forEach(nav => nav.classList.remove("active"));
            link.classList.add("active");
        });
    });

    let productList = document.getElementById("productList");
    let initialDisplayCount = 8;
    let showAllProducts = false;

    function displayProducts() {
        productList.innerHTML = '';

        const productsToShow = showAllProducts ? products : products.slice(0, initialDisplayCount);

        productsToShow.forEach(product => {
            let productCard = document.createElement('section');
            productCard.classList.add('col-md-3', 'fade-slide-up');

            productCard.innerHTML = `
                <div class="box" data-id="${product.id}">
                    <div class="imgOuter">
                        <img src="${product.image}" class="img-fluid" alt="${product.name}">
                    </div>
                    <p class="fontPoppinsRegular fontSize25 font-color_data mt-3">${product.name}</p>
                </div>
            `;

            productList.appendChild(productCard);
        });

        // Add toggle button
        if (products.length > initialDisplayCount) {
            const toggleButtonContainer = document.createElement('div');
            toggleButtonContainer.classList.add('col-12', 'text-center', 'mt-4');
            toggleButtonContainer.innerHTML = `
                <button id="toggleViewBtn" class="btn px-4 py-2">
                    ${showAllProducts ? 'View Less' : 'View More'}
                </button>
            `;
            productList.appendChild(toggleButtonContainer);

            document.getElementById('toggleViewBtn').addEventListener('click', () => {
                showAllProducts = !showAllProducts;
                displayProducts();
                // Smooth scroll to maintain position
                setTimeout(() => {
                    toggleButtonContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 100);
            });
        }

        initIntersectionObserver();
    }

    function initIntersectionObserver() {
        let elements = document.querySelectorAll('.fade-slide-up');
        let observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.0 });

        elements.forEach(element => observer.observe(element));
    }

    // Initial display
    displayProducts();

    // Modal functionality using event delegation
    document.addEventListener('click', function (e) {
        if (e.target.closest('.box')) {
            let box = e.target.closest('.box');
            let productId = box.getAttribute("data-id");
            let product = products.find(p => p.id == productId);

            if (product) {
                document.getElementById("productModalLabel").textContent = product.name;
                document.getElementById("modalImage").src = product.image;
                document.getElementById("modalDescription").textContent = product.description;
                document.getElementById("whatsappBtn").href = `https://wa.me/9152161323?text=${encodeURIComponent(`Hello, I am interested in the "${product.name}". Can you provide more details?`)}`;

                new bootstrap.Modal(document.getElementById("productModal")).show();
            }
        }
    });

    // Back to top button
    let mybutton = document.getElementById("backToTopBtn");
    window.onscroll = function () {
        mybutton.style.display = (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) ? "block" : "none";
    };
    mybutton.onclick = function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
};