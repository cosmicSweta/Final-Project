const productsContainer = document.getElementById("products-container");
const searchInput = document.getElementById("search-input");
const filterButtons = document.querySelectorAll(".filter-section button");

console.log(products);
console.log(productsContainer);

function displayProducts(productList = products) {
    productsContainer.innerHTML = "";
    updateProductCount(productList);

    productList.forEach(function(product) {
        productsContainer.innerHTML += `
    <div class="product-card">
        <img src="${product.image}" alt="${product.name}">

        <span class="product-category">${product.category}</span>

        <h5>${product.name}</h5>
        <p>₹${product.price}</p>

        <button onclick="addToCart(${product.id})">🛒 Add to Cart</button>
    </div>
`;
    });
}

    displayProducts(products);

    searchInput.addEventListener("input", function (){
        const searchText = searchInput.value.toLowerCase();

        const filteredProducts = products.filter(function (product) {
            return product.name.toLowerCase().includes(searchText);
        });

    displayProducts(filteredProducts);

});

    filterButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        const category = button.getAttribute("data-category");

        if (category === "All") {
            displayProducts(products);
        } else {
            const filteredProducts = products.filter(function(product) {
                return product.category === category;
            });

            displayProducts(filteredProducts);
        }
    });

});

window.addToCart = function(productId) {
    const selectedProduct = products.find(function(product) {
        return product.id === productId;
    });

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push(selectedProduct);

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert("Product added to cart!");
};

function updateCartCount() {
    const cartCount = document.getElementById("cart-count");

    if (cartCount) {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        cartCount.textContent = cart.length;
    }
}

updateCartCount();

function updateProductCount(productList) {
    const productCount = document.getElementById("product-count");

    if (productCount) {
        productCount.textContent =
            `${productList.length} Products Available`;
    }
}