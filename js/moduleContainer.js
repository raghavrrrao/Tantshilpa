import { products } from './data.js';

onload = function () {
    let navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            // Remove 'active' class from all links
            navLinks.forEach(nav => nav.classList.remove("active"));

            // Add 'active' class to the clicked link
            link.classList.add("active");
        });
    });

    let productList = document.getElementById("productList");

    // Populate products dynamically
    products.forEach(product => {
        let productCard = document.createElement('section');
        productCard.classList.add('col-md-3', 'fade-slide-up'); // Ensure fade-slide-up is added

        productCard.innerHTML = `
            <div class="box" data-id="${product.id}">
                <div class="imgOuter">
                    <img src="${product.image}" class="img-fluid" alt="${product.name}">
                </div>
                <p class="fontPoppinsRegular fontSize25  font-color_data mt-3">${product.name}</p>
            </div>
        `;

        productList.appendChild(productCard);
    });

    // Select all elements you want to animate (after adding products)
    let elements = document.querySelectorAll('.fade-slide-up');

    // Define the observer options
    let options = {
        threshold: 0.0 // Trigger when 10% of the element is in view
    };

    // Callback function to handle intersection
    let observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible'); // Add the class to start animation
                observer.unobserve(entry.target); // Stop observing after animation starts
            }
        });
    };

    // Initialize the Intersection Observer
    let observer = new IntersectionObserver(observerCallback, options);

    // Observe each element
    elements.forEach(element => {
        observer.observe(element);
    });

    // Modal functionality
    let boxes = document.querySelectorAll(".box");
    let modal = new bootstrap.Modal(document.getElementById("productModal"));
    let modalTitle = document.getElementById("productModalLabel");
    let modalImage = document.getElementById("modalImage");
    let modalDescription = document.getElementById("modalDescription");
    let whatsappBtn = document.getElementById("whatsappBtn");

    boxes.forEach(box => {
        box.addEventListener("click", () => {
            let productId = box.getAttribute("data-id");
            let product = products.find(p => p.id == productId);

            if (product) {
                modalTitle.textContent = product.name;
                modalImage.src = product.image;
                modalDescription.textContent = product.description;

                // Generate WhatsApp message
                let message = encodeURIComponent(`Hello, I am interested in the "${product.name}". Can you provide more details?`);
                let whatsappURL = `https://wa.me/9152161323?text=${message}`;

                // Update WhatsApp button
                whatsappBtn.href = whatsappURL;

                modal.show();
            }
        });
    });

    // Get the button
    let mybutton = document.getElementById("backToTopBtn");

    // When the user scrolls down 20px from the top of the document, show the button
    window.onscroll = function() {
        scrollFunction();
    };

    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            mybutton.style.display = "block";
        } else {
            mybutton.style.display = "none";
        }
    }

    // When the user clicks on the button, scroll to the top of the document
    mybutton.onclick = function() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    };
};
