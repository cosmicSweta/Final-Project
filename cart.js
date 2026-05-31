const cartItemsContainer = document.getElementById("cart-items");
const cartSummary = document.getElementById("cart-summary");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function displayCart() {
    
    if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
        <div class="cart-item">
            <h4>Your cart is empty</h4>
            <p>Add some products to continue shopping.</p>
        </div>
    `;

    cartSummary.innerHTML = `
        <h3>Order Summary</h3>
        <p>Total Items: 0</p>
        <p>Total Price: ₹0</p>
    `;

    return;
}
    cartItemsContainer.innerHTML = "";

    cart.forEach(function(product) {
        cartItemsContainer.innerHTML += `
            <div class="cart-item">
                <h4>${product.name}</h4>
                <p>Price: ₹${product.price}</p>
                <p>Quantity: 1</p>
                <button onclick="removeItem(${product.id})">Remove</button>
            </div>
        `;
    });

    let totalPrice = 0;

    cart.forEach(function(product) {
        totalPrice += product.price;
    });

    cartSummary.innerHTML = `
        <h3>Order Summary</h3>
        <p>Total Items: ${cart.length}</p>
        <p>Total Price: ₹${totalPrice}</p>
        <button>Checkout</button>
    `;
}

window.removeItem = function(productId) {
    const confirmRemove = confirm("Are you sure you want to remove this product?");

    if (!confirmRemove) {
        return;
    }
    
    cart = cart.filter(function(product) {
        return product.id !== productId;
    });

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();
};

displayCart();