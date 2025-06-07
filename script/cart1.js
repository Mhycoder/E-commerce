function addToCart(name) {
  let link = document.querySelector(".main-image").querySelector("img").src;
  let label = document.getElementById("option").textContent;
  let variant = document.querySelector(".size-option.active");
  let quantity = parseInt(document.getElementById("quantity").value) || 1;
  let price = document.getElementById("price").value;
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let userData = JSON.parse(localStorage.getItem("userData"));

  if (userData === null) {
    alert("Please login first.");
    return;
  }
  if (variant === null) {
    alert("Choose an option first.");
    return;
  } else {
    let existing = cart.find(
      (item) => item.name === name && item.variant === label + " " + variant
    );

    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({
        name: name,
        price: price,
        quantity: quantity,
        link: link,
        variant: label + " " + variant.textContent,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(
      `${quantity} pcs. of ${name} for ₱ ${
        price * quantity
      }.00 has been added to cart.`
    );
    loadCartQuantity();
  }
}

function buyNow(name) {
  let variant = document.querySelector(".size-option.active");
  let label = document.getElementById("option").textContent;
  let quantity = document.getElementById("quantity").value;
  let price = document.getElementById("price").value;

  let userData = JSON.parse(localStorage.getItem("userData"));

  if (userData === null) {
    alert("Please login first.");
    return;
  }

  if (variant === null) {
    alert("Choose an option first.");
    return;
  }
  let confirmCheckout = confirm(
    `Are you sure you want to purchase ${quantity} pcs. of ${name} ${label} ${
      variant.textContent
    } for ₱${price * quantity}`
  );
  if (confirmCheckout) {
    alert("Thank you for your purchase! Your order has been placed.");
  }
}

function loadCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let cartItems = document.getElementById("cart-container");

  cartItems.innerHTML = "";
  let cartHTML = "";

  cart.forEach((item, index) => {
    let productTotal = item.price * item.quantity;
    cartHTML += `            
        <div class="cart-item">
                <label>
                  <input type="checkbox" class="item-checkbox" data-index="${index}" onchange="selectBox()">
                  <span class="select-box"></span>
                </label>
                <div class="product-info">
                    <img src="${item.link}" alt="Product 1" class="product-image">
                    <div>
                        <h3 class="product-name">${item.name}</h3>
                        <p class="product-variant">Option: ${item.variant}</p>
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
  if (cart.length === 0) {
    cartItems.innerHTML = `
            <div class="empty-cart">
                <h3>Your cart is empty</h3>
                <p>Add items to your cart to begin the checkout process</p>
                <a href="prod-list/prod-list1.html" class="shop-now-btn">SHOP NOW</a>
            </div>  
        `;
  }
}

function selectBox() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let checkboxes = document.querySelectorAll(".item-checkbox");
  let total = 0;
  let discountAmount = 0;
  let shippingFee = 0;

  checkboxes.forEach((checkbox) => {
    let index = checkbox.getAttribute("data-index");
    if (checkbox.checked && cart[index]) {
      total += cart[index].price * cart[index].quantity;
      shippingFee += 50 * cart[index].quantity;
    }
  });

  let totalDisplay = document.getElementById("total");
  let totalDisplay2 = document.getElementById("total2");
  let subTotal = document.getElementById("subtotal");
  let shipping = document.getElementById("shipping");
  let discount = document.getElementById("discount");

  if (totalDisplay) {
    subTotal.textContent = `₱${total}`;
    shipping.textContent = `₱${shippingFee}`;
    discountAmount = Math.round(total * 0.15);
    total -= discountAmount;
    discount.textContent = `₱${discountAmount} (15% OFF)`;
    totalDisplay.textContent = `₱${total}`;
    totalDisplay2.textContent = `₱${total}`;
  }
}

function toggleSelectAll(source) {
  const itemCheckboxes = document.querySelectorAll(".item-checkbox");

  itemCheckboxes.forEach((checkbox) => {
    checkbox.checked = source.checked;
  });

  selectBox();
}

function changeQuantity(index, change) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart[index].quantity += change;

  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  loadCart();
  loadCartQuantity();
  selectBox();
}

function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  selectBox();
  loadCartQuantity();
  loadCart();
}

loadCart();

/* Check Out */

function checkOut() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let checkboxes = document.querySelectorAll(".item-checkbox");
  let orders = JSON.parse(localStorage.getItem("orders")) || [];

  let card = JSON.parse(localStorage.getItem("card"));

  if (card === null) {
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

  let confirmCheckout = confirm(
    "Are you sure you want to proceed to checkout?"
  );
  if (confirmCheckout) {
    checkboxes.forEach((checkbox) => {
      let index = checkbox.getAttribute("data-index");
      if (checkbox.checked && cart[index]) {
        let item = cart[index];
        orders.push({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          variant: item.variant,
        });
      }
    });

    localStorage.setItem("orders", JSON.stringify(orders));
    localStorage.removeItem("cart");
    document.querySelector(".order-summary").style.display = "none";
    loadCart();

    alert("Thank you for your purchase! Your order has been placed.");
  }
}

const mediaQuery = window.matchMedia("(max-width: 768px)");

function handleScreenChange(e) {
  if (e.matches) {
    document.getElementById("unit-price").textContent = "";
    document.getElementById("quantity").textContent = "";
  } else {
    document.getElementById("unit-price").textContent = "UNIT PRICE";
    document.getElementById("quantity").textContent = "QUANTITY";
  }
}

handleScreenChange(mediaQuery);
mediaQuery.addListener(handleScreenChange);

document
  .getElementById("proceedCheckout")
  .addEventListener("click", function () {
    let card = JSON.parse(localStorage.getItem("card"));

    let userData = JSON.parse(localStorage.getItem("userData"));

    if (userData === null) {
      alert("Please login first.");
      return;
    }
    if (card === null) {
      alert("Please Add Payment Method First.");
      return;
    }
    document.querySelector(".order-summary").style.display = "flex";
  });

document.getElementById("order-exit").addEventListener("click", function () {
  document.querySelector(".order-summary").style.display = "none";
});

/* Payment Option Cart */

function loadDefault() {
  let card = JSON.parse(localStorage.getItem("card")) || [];
  let defaultCard = localStorage.getItem("defaultCard");

  let dropdown = document.getElementById("card-option");

  dropdown.innerHTML = "";

  card.forEach((item, index) => {
    const isDefault = index == defaultCard;
    if (isDefault) {
      dropdown.innerHTML += `
        <option>${item.cardcategory} - ${item.cardname}</option>
      `;
    }
  });

  card.forEach((item, index) => {
    const isDefault = index == defaultCard;
    if (!isDefault) {
      dropdown.innerHTML += `
      <option>${item.cardcategory} - ${item.cardname}</option>
    `;
    }
  });
}

function loadCartQuantity() {
  let cart = JSON.parse(localStorage.getItem("cart"));
  let quantity = 0;

  cart.forEach((item, index) => {
    quantity += item.quantity;
  });
  if (quantity > 0) {
    document.querySelector(".cart-count").textContent = quantity;
  } else {
    document.querySelector(".cart-count").style.display = "none";
  }
}

loadDefault();
