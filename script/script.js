document.addEventListener("DOMContentLoaded", function () {
  // Modal Elements
  const modalOverlay = document.getElementById("modalOverlay");
  const closeBtn = document.querySelector(".close-btn");
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");
  const modalTitle = document.getElementById("modal-title");

  // User Profile Elements
  const userProfileModal = document.querySelector(".user-profile-modal");
  const profileCloseButton = document.querySelector(
    ".user-profile-modal .close-button"
  );
  const usernameDisplay = document.querySelector(
    ".user-profile-modal .username"
  );
  const mobileNumberValue = document.querySelector(
    ".detail-item:nth-child(1) .detail-value"
  );
  const emailValue = document.querySelector(
    ".detail-item:nth-child(2) .detail-value"
  );
  const addressValue = document.querySelector(
    ".detail-item:nth-child(3) .detail-value"
  );
  const logoutButton = document.querySelector(
    ".user-profile-modal .btn-modal-outline"
  );

  // User Icon in Navigation
  const userIconNav = document.querySelector(".user-icon");

  // Show Login Modal
  function showLoginModal() {
    modalOverlay.style.display = "flex";
    loginForm.style.display = "block";
    signupForm.style.display = "none";
  }

  // Close Login Modal
  function closeLoginModal() {
    modalOverlay.style.display = "none";
  }

  // Show User Profile Modal
  function showUserProfile() {
    userProfileModal.style.display = "block";
  }

  // Close User Profile Modal
  function closeUserProfile() {
    userProfileModal.style.display = "none";
  }

  // Toggle between Login and Signup forms
  function toggleForm() {
    if (loginForm.style.display === "block") {
      loginForm.style.display = "none";
      signupForm.style.display = "block";
      modalTitle.textContent = "SIGN UP";
    } else {
      loginForm.style.display = "block";
      signupForm.style.display = "none";
      modalTitle.textContent = "LOGIN";
    }
  }

  // Handle Login Form Submission
  function handleLoginSubmit(e) {
    e.preventDefault();

    const emailOrUsername = loginForm.querySelector('input[type="text"]').value;
    const password = loginForm.querySelector('input[type="password"]').value;

    if (!emailOrUsername || !password) {
      alert("Please fill in all fields");
      return;
    }

    // Update user profile data
    usernameDisplay.textContent = emailOrUsername;
    emailValue.textContent = emailOrUsername;

    // Store user data
    const userData = {
      username: emailOrUsername,
      email: emailOrUsername,
      mobile: mobileNumberValue.textContent,
      address: addressValue.textContent,
      isLoggedIn: true,
    };

    localStorage.setItem("userData", JSON.stringify(userData));

    // Close login modal and show profile
    closeLoginModal();
    showUserProfile();
  }

  // Handle Signup Form Submission
  function handleSignupSubmit(e) {
    e.preventDefault();

    const fullName = signupForm.querySelector('input[type="text"]').value;
    const password = signupForm.querySelector('input[type="password"]').value;
    const confirmPassword = signupForm.querySelectorAll(
      'input[type="password"]'
    )[1].value;

    if (!fullName || !password || !confirmPassword) {
      alert("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Update user profile data
    usernameDisplay.textContent = fullName;

    // Store user data
    const userData = {
      username: fullName,
      email: "",
      mobile: mobileNumberValue.textContent,
      address: addressValue.textContent,
      isLoggedIn: true,
    };

    localStorage.setItem("userData", JSON.stringify(userData));

    // Close login modal and show profile
    closeLoginModal();
    showUserProfile();
  }

  // Handle Logout
  function handleLogout() {
    localStorage.removeItem("userData");
    closeUserProfile();
  }

  // Check login status on page load
  function checkLoginStatus() {
    const userData = JSON.parse(localStorage.getItem("userData"));

    if (userData && userData.isLoggedIn) {
      usernameDisplay.textContent = userData.username;
      emailValue.textContent = userData.email || "";
      mobileNumberValue.textContent = userData.mobile || "";
      addressValue.textContent = userData.address || "";
    }
  }

  // Event Listeners
  if (userIconNav) {
    userIconNav.addEventListener("click", function (e) {
      e.preventDefault();
      const userData = JSON.parse(localStorage.getItem("userData"));

      if (userData && userData.isLoggedIn) {
        showUserProfile();
      } else {
        showLoginModal();
      }
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", closeLoginModal);
  }

  if (profileCloseButton) {
    profileCloseButton.addEventListener("click", closeUserProfile);
  }

  if (loginForm) {
    loginForm.addEventListener("submit", handleLoginSubmit);
  }

  if (signupForm) {
    signupForm.addEventListener("submit", handleSignupSubmit);
  }

  if (logoutButton) {
    logoutButton.addEventListener("click", handleLogout);
  }

  showSignupBtn.addEventListener("click", function () {
    loginForm.style.display = "none";
    signupForm.style.display = "block";

    loginSidebar.style.display = "none";
    signupSidebar.style.display = "block";

    title.textContent = "SIGN UP";
  });

  showLoginBtn.addEventListener("click", function () {
    signupForm.style.display = "none";
    loginForm.style.display = "block";

    signupSidebar.style.display = "none";
    loginSidebar.style.display = "block";

    title.textContent = "LOGIN";
  });

  // Run on page load
  checkLoginStatus();
});

function goToSchedule() {
  document.getElementById("time").style.display = "flex";
  document.getElementById("calendar").style.display = "none";
}

function goBackCalendar() {
  document.getElementById("time").style.display = "none";
  document.getElementById("calendar").style.display = "flex";
}

function openMenu() {
  document.getElementById("nav-column").style.display = "flex";
  document.getElementById("nav-column1").style.display = "flex";
  document.getElementById("menu-toggle").style.display = "none";
  document.getElementById("menu-toggle1").style.display = "flex";
}

function closeMenu() {
  document.getElementById("nav-column").style.display = "none";
  document.getElementById("nav-column1").style.display = "none";
  document.getElementById("menu-toggle").style.display = "flex";
  document.getElementById("menu-toggle1").style.display = "none";
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

function activeOption1(element) {
  document.getElementById("option2").classList.remove("active");
  document.getElementById("option3").classList.remove("active");
  document.getElementById("option4").classList.remove("active");
  element.classList.toggle("active");
}

function activeOption2(element) {
  document.getElementById("option1").classList.remove("active");
  document.getElementById("option3").classList.remove("active");
  document.getElementById("option4").classList.remove("active");
  element.classList.toggle("active");
}

function activeOption3(element) {
  document.getElementById("option1").classList.remove("active");
  document.getElementById("option2").classList.remove("active");
  document.getElementById("option4").classList.remove("active");
  element.classList.toggle("active");
}

function activeOption4(element) {
  document.getElementById("option1").classList.remove("active");
  document.getElementById("option2").classList.remove("active");
  document.getElementById("option3").classList.remove("active");
  element.classList.toggle("active");
}

function addToCart(name, price, link, variant) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let existing = cart.find((item) => item.name === name);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      name: name,
      price: price,
      quantity: 1,
      link: link,
      variant: variant,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(name + " added to cart!");
}

function buyNow(name, price, variant) {
  let confirmCheckout = confirm(
    `Are you sure you want to purchase ${name} ${variant} for ₱${price}`
  );
  if (confirmCheckout) {
    alert("Thank you for your purchase! Your order has been placed.");
  }
}

function loadCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let cartItems = document.getElementById("cart-container");

  cartItems.innerHTML = "";
  let total = 0;
  let cartHTML = "";

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
  document.getElementById("total").innerText = "₱" + total;
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

function changeQuantity(index, change) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart[index].quantity += change;

  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

loadCart();

/* Check Out */

function checkOut() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    alert("Your cart is empty. Please add items before checking out.");
    return;
  }

  let confirmCheckout = confirm(
    "Are you sure you want to proceed to checkout?"
  );
  if (confirmCheckout) {
    localStorage.removeItem("cart");
    loadCart();

    alert("Thank you for your purchase! Your order has been placed.");
  }
}

/*Contact*/
function selectNumber(selectedId) {
  const numbers = document.querySelectorAll(".number");

  numbers.forEach((number) => {
    // Reset styles
    number.style.backgroundColor = "white";
    number.style.transform = "scale(1)";
    number.style.color = "black";
  });

  // Apply active styles
  const selected = document.getElementById(selectedId);
  selected.style.backgroundColor = "#BD8C7D";
  selected.style.transform = "scale(1.1)";
  selected.style.color = "white";
}

function bookNow(event) {
  const userData = JSON.parse(localStorage.getItem("userData"));
  event.preventDefault(); // Prevent actual form submission

  // Get field values
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const staff = document.getElementById("staff").value;
  const service = document.getElementById("service").value;

  // Check if all fields are filled
  if (name && email && phone && staff && service) {
    alert("Thank you for booking an appointment, " + userData.username);
  } else {
    alert("Please fill out all fields.");
  }
}
