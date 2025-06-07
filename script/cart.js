// Cart Management Functions

// Utility function to check if user is logged in
function isUserLoggedIn() {
  try {
    const userData = JSON.parse(localStorage.getItem("userData"));
    return userData && userData.isLoggedIn;
  } catch (error) {
    console.error("Error checking login status:", error);
    return false;
  }
}

// Add item to cart
function addToCart(name) {
  if (!isUserLoggedIn()) {
    alert("Please login first.");
    return;
  }

  const mainImage = document.querySelector(".main-image img");
  const optionElement = document.querySelector(".meta-label");
  const variantElement = document.querySelector(".size-option.active");
  const quantityElement = document.getElementById("quantity");
  const priceElement = document.getElementById("price");

  if (
    !mainImage ||
    !optionElement ||
    !variantElement ||
    !quantityElement ||
    !priceElement
  ) {
    alert("Missing product information. Please refresh the page.");
    return;
  }

  const link = mainImage.src;
  const label = optionElement.textContent;
  const variant = variantElement.textContent;
  const quantity = parseInt(quantityElement.value) || 1;
  const price = parseFloat(priceElement.value) || 0;

  if (quantity <= 0) {
    alert("Please select a valid quantity.");
    return;
  }

  if (price <= 0) {
    alert("Invalid price information.");
    return;
  }

  try {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const variantKey = `${label} ${variant}`;

    let existing = cart.find(
      (item) => item.name === name && item.variant === variantKey
    );

    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({
        name: name,
        price: price,
        quantity: quantity,
        link: link,
        variant: variantKey,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(
      `${quantity} pcs. of ${name} for ₱${(price * quantity).toFixed(
        2
      )} has been added to cart.`
    );
    loadCartQuantity();
  } catch (error) {
    console.error("Error adding to cart:", error);
    alert("Error adding item to cart. Please try again.");
  }
}

// Buy now function
function buyNow(name) {
  if (!isUserLoggedIn()) {
    alert("Please login first.");
    return;
  }

  const variantElement = document.querySelector(".size-option.active");
  const optionElement = document.querySelector(".meta-label");
  const quantityElement = document.getElementById("quantity");
  const priceElement = document.getElementById("price");

  if (!variantElement || !optionElement || !quantityElement || !priceElement) {
    alert("Missing product information. Please refresh the page.");
    return;
  }

  const variant = variantElement.textContent;
  const label = optionElement.textContent;
  const quantity = parseInt(quantityElement.value) || 1;
  const price = parseFloat(priceElement.value) || 0;

  if (quantity <= 0) {
    alert("Please select a valid quantity.");
    return;
  }

  const total = (price * quantity).toFixed(2);
  const confirmCheckout = confirm(
    `Are you sure you want to purchase ${quantity} pcs. of ${name} ${label} ${variant} for ₱${total}?`
  );

  if (confirmCheckout) {
    alert("Thank you for your purchase! Your order has been placed.");
  }
}

// Load and display cart items
function loadCart() {
  try {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItems = document.getElementById("cart-container");

    if (!cartItems) return;

    if (cart.length === 0) {
      cartItems.innerHTML = `
          <div class="empty-cart">
            <h3>Your cart is empty</h3>
            <p>Add items to your cart to begin the checkout process</p>
            <a href="prod-list/prod-list1.html" class="shop-now-btn">SHOP NOW</a>
          </div>  
        `;
      return;
    }

    let cartHTML = "";
    cart.forEach((item, index) => {
      const productTotal = (item.price * item.quantity).toFixed(2);
      cartHTML += `            
          <div class="cart-item">
            <label>
              <input type="checkbox" class="item-checkbox" data-index="${index}" onchange="selectBox()">
              <span class="select-box"></span>
            </label>
            <div class="product-info">
              <img src="${item.link}" alt="Product Image" class="product-image">
              <div>
                <h3 class="product-name">${item.name}</h3>
                <p class="product-variant">Option: ${item.variant}</p>
              </div>
            </div>
            <div class="price-actions">
              <div class="unit-price">₱${item.price.toFixed(2)}</div>
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
    });

    cartItems.innerHTML = cartHTML;
  } catch (error) {
    console.error("Error loading cart:", error);
    const cartItems = document.getElementById("cart-container");
    if (cartItems) {
      cartItems.innerHTML =
        "<p>Error loading cart. Please refresh the page.</p>";
    }
  }
}

// Calculate and update cart totals
function selectBox() {
  try {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const checkboxes = document.querySelectorAll(".item-checkbox");
    let subtotal = 0;
    let shippingFee = 0;

    checkboxes.forEach((checkbox) => {
      const index = parseInt(checkbox.getAttribute("data-index"));
      if (checkbox.checked && cart[index]) {
        subtotal += cart[index].price * cart[index].quantity;
        shippingFee += 50 * cart[index].quantity;
      }
    });

    const totalDisplay = document.getElementById("total");
    const totalDisplay2 = document.getElementById("total2");
    const subTotalElement = document.getElementById("subtotal");
    const shippingElement = document.getElementById("shipping");
    const discountElement = document.getElementById("discount");

    if (subTotalElement)
      subTotalElement.textContent = `₱${subtotal.toFixed(2)}`;
    if (shippingElement)
      shippingElement.textContent = `₱${shippingFee.toFixed(2)}`;

    const discountAmount = Math.round(subtotal * 0.15);
    const finalTotal = subtotal + shippingFee - discountAmount;

    if (discountElement)
      discountElement.textContent = `₱${discountAmount.toFixed(2)} (15% OFF)`;
    if (totalDisplay) totalDisplay.textContent = `₱${finalTotal.toFixed(2)}`;
    if (totalDisplay2) totalDisplay2.textContent = `₱${finalTotal.toFixed(2)}`;
  } catch (error) {
    console.error("Error calculating totals:", error);
  }
}

// Toggle select all items
function toggleSelectAll(source) {
  const itemCheckboxes = document.querySelectorAll(".item-checkbox");
  itemCheckboxes.forEach((checkbox) => {
    checkbox.checked = source.checked;
  });
  selectBox();
}

// Change item quantity
function changeQuantity(index, change) {
  try {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (!cart[index]) return;

    cart[index].quantity += change;

    if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
    loadCartQuantity();
    selectBox();
  } catch (error) {
    console.error("Error changing quantity:", error);
    alert("Error updating quantity. Please try again.");
  }
}

// Remove item from cart
function removeItem(index) {
  try {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
    loadCartQuantity();
    selectBox();
  } catch (error) {
    console.error("Error removing item:", error);
    alert("Error removing item. Please try again.");
  }
}

// Checkout function
function checkOut() {
  if (!isUserLoggedIn()) {
    alert("Please login first.");
    return;
  }

  try {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const checkboxes = document.querySelectorAll(".item-checkbox");
    const card = JSON.parse(localStorage.getItem("card"));

    if (!card || card.length === 0) {
      alert("Add payment method first.");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty. Please add items before checking out.");
      return;
    }

    const isAnyChecked = Array.from(checkboxes).some(
      (checkbox) => checkbox.checked
    );
    if (!isAnyChecked) {
      alert("Please select at least one item to checkout.");
      return;
    }

    const confirmCheckout = confirm(
      "Are you sure you want to proceed to checkout?"
    );
    if (!confirmCheckout) return;

    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    let newCart = [...cart];

    // Process checked items
    checkboxes.forEach((checkbox) => {
      const index = parseInt(checkbox.getAttribute("data-index"));
      if (checkbox.checked && cart[index]) {
        const item = cart[index];
        orders.push({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          variant: item.variant,
          orderDate: new Date().toISOString(),
        });
        newCart[index] = null; // Mark for removal
      }
    });

    // Remove processed items from cart
    newCart = newCart.filter((item) => item !== null);

    localStorage.setItem("orders", JSON.stringify(orders));
    localStorage.setItem("cart", JSON.stringify(newCart));

    const orderSummary = document.querySelector(".order-summary");
    if (orderSummary) orderSummary.style.display = "none";

    loadCart();
    loadCartQuantity();
    alert("Thank you for your purchase! Your order has been placed.");
  } catch (error) {
    console.error("Error during checkout:", error);
    alert("Error processing checkout. Please try again.");
  }
}

// Load default payment method
function loadDefault() {
  try {
    const card = JSON.parse(localStorage.getItem("card")) || [];
    const defaultCard = localStorage.getItem("defaultCard");
    const dropdown = document.getElementById("card-option");

    if (!dropdown) return;

    dropdown.innerHTML = "";

    // Add default card first
    card.forEach((item, index) => {
      const isDefault = index == defaultCard;
      if (isDefault) {
        dropdown.innerHTML += `<option value="${index}">${item.cardcategory} - ${item.cardname}</option>`;
      }
    });

    // Add other cards
    card.forEach((item, index) => {
      const isDefault = index == defaultCard;
      if (!isDefault) {
        dropdown.innerHTML += `<option value="${index}">${item.cardcategory} - ${item.cardname}</option>`;
      }
    });
  } catch (error) {
    console.error("Error loading default payment method:", error);
  }
}

// Responsive design handler
function handleScreenChange(e) {
  const unitPriceElement = document.getElementById("unit-price");
  const quantityElement = document.getElementById("quantity");

  if (e.matches) {
    if (unitPriceElement) unitPriceElement.textContent = "";
    if (quantityElement) quantityElement.textContent = "";
  } else {
    if (unitPriceElement) unitPriceElement.textContent = "UNIT PRICE";
    if (quantityElement) quantityElement.textContent = "QUANTITY";
  }
}

// Event Listeners
document.addEventListener("DOMContentLoaded", function () {
  // Load cart data
  loadCart();
  loadCartQuantity();
  loadDefault();

  // Responsive design
  const mediaQuery = window.matchMedia("(max-width: 768px)");
  handleScreenChange(mediaQuery);
  mediaQuery.addListener(handleScreenChange);

  // Proceed to checkout button
  const proceedCheckoutBtn = document.getElementById("proceedCheckout");
  if (proceedCheckoutBtn) {
    proceedCheckoutBtn.addEventListener("click", function () {
      if (!isUserLoggedIn()) {
        alert("Please login first.");
        return;
      }

      const card = JSON.parse(localStorage.getItem("card"));
      if (!card || card.length === 0) {
        alert("Please Add Payment Method First.");
        return;
      }

      const orderSummary = document.querySelector(".order-summary");
      if (orderSummary) orderSummary.style.display = "flex";
    });
  }

  // Order summary exit button
  const orderExitBtn = document.getElementById("order-exit");
  if (orderExitBtn) {
    orderExitBtn.addEventListener("click", function () {
      const orderSummary = document.querySelector(".order-summary");
      if (orderSummary) orderSummary.style.display = "none";
    });
  }
});
