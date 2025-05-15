function addToCart(name) {
    let link = document.getElementById('main-image').querySelector('img').src;
    let variant = document.querySelector('.size-option.active').textContent;
    let quantity = parseInt(document.getElementById('quantity').value) || 1;
    let price = document.getElementById('price').value;
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    let existing = cart.find(item => item.name === name && item.variant === 'Color: ' + variant);

    if(existing) {
        existing.quantity += quantity;
    } else {
        cart.push({ name: name, price: price, quantity: quantity, link: link, variant: 'Color: ' + variant });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${quantity} pcs. of ${name} for ₱ ${price * quantity}.00 has been added to cart.`);
}

function buyNow(name) {
    let variant = document.querySelector('.size-option.active');textContent;
    let quantity = parseInt(document.getElementById('quantity').value) || 1;
    let price = document.getElementById('price').value;
    let confirmCheckout = confirm(`Are you sure you want to purchase ${quantity} pcs. of ${name} Color: ${variant} for ₱${price * quantity}`);
    if (confirmCheckout) {

        alert("Thank you for your purchase! Your order has been placed.");
        
    }
}

function loadCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartItems = document.getElementById('cart-container');

    cartItems.innerHTML = '';
    let total = 0;
    let cartHTML = ''; 

    cart.forEach((item, index) => {
        let productTotal = item.price * item.quantity;
        total += productTotal;
        cartHTML += `            
        <div class="cart-item">
                <label>
                  <input type="checkbox">
                  <span class="select-box"></span>
                </label>
                <div class="product-info">
                    <img src="${item.link}" alt="Product 1" class="product-image">
                    <div>
                        <h3 class="product-name">${item.name}</h3>
                        <p class="product-variant">${item.variant}</p>
                    </div>
                </div>
                <div class="price-actions">
                    <div class="unit-price">₱${item.price}</div>
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="changeQuantity(${index}, -1)">-</button>
                        <span class="quantity-value">${item.quantity}</span>
                        <button class="quantity-btn" onclick="changeQuantity(${index}, 1)">+</button>
                    </div>
                    <div class="total-price">₱${productTotal}</div>
                    <button class="delete-btn" onclick="removeItem(${index})">REMOVE</button>                   
                </div>

            </div>
            `;
        cartItems.innerHTML = cartHTML;    
    });
    document.getElementById('total').innerText = "₱" + total;
    if(cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <h3>Your cart is empty</h3>
                <p>Add items to your cart to begin the checkout process</p>
                <a href="prod-list/prod-list1.html" class="shop-now-btn">SHOP NOW</a>
            </div>  
        `
    }
}

function changeQuantity(index, change) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart[index].quantity += change;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

loadCart();

/* Check Out */

function checkOut() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        alert("Your cart is empty. Please add items before checking out.");
        return;
    }

    let confirmCheckout = confirm("Are you sure you want to proceed to checkout?");
    if (confirmCheckout) {

        localStorage.removeItem('cart');
        loadCart(); 

        alert("Thank you for your purchase! Your order has been placed.");
        
    }
}