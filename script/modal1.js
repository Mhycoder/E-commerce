document.addEventListener("DOMContentLoaded", function () {
  // Modal Elements
  const modalOverlay = document.getElementById("modalOverlay");
  const closeBtn = document.querySelector(".close-btn");
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");
  const title = document.getElementById("modal-title");

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

function openAddCard() {
  document.querySelector(".payment-modal").style.display = "flex";
}

function closeAddCard() {
  document.querySelector(".payment-modal").style.display = "none";
}

function openTransaction() {
  document.querySelector(".transaction-modal").style.display = "block";
}

function closeTransaction() {
  document.querySelector(".transaction-modal").style.display = "none";
}

const subscriptionForm = document.querySelector(".subscription-form button");
const emailInput = document.getElementById("email");

subscriptionForm.addEventListener("click", function () {
  if (emailInput.value.trim() !== "") {
    alert("Thank you for subscribing!");
  } else {
    alert("Please Enter your Email First.");
  }
});

/*Cart Quantity*/

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

loadCartQuantity();

const style = document.createElement("style");
style.textContent = `
  .modal-edit {
    display: none;
    position: fixed;
    z-index: 9999;
    left: 0; top: 0;
    width: 100%; height: 100%;
    background: rgba(0,0,0,0.5);
  }
  .modal-content-edit {
    background: white;
    width: 400px;
    padding: 20px;
    margin: 10% auto;
    border-radius: 10px;
    position: relative;
    text-align: center;
  }
  .close-edit {
    position: absolute;
    top: 10px; right: 15px;
    font-size: 18px;
    cursor: pointer;
  }
  .modal-content-edit input {
    width: 95%;
    margin: 0 auto;
    margin-bottom: 16px;
    padding: 8px;
  }
  .modal-content-edit button {
    width: 100%;
    padding: 10px;
    background-color: var(--accent);
    color: white;
    border: none;
    padding: 0.8rem 2rem;
    border-radius: 4px;
    font-size: 1rem;
    letter-spacing: 0.5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  .modal-content-edit button:hover {
    background-color: var(--accent-dark);
  }
  
`;
document.head.appendChild(style);

// Inject modal HTML into the page
const modalHTML = `
  <div class="modal-edit" id="profileModal">
    <div class="modal-content-edit">
      <span class="close-edit" id="closeModal">&times;</span>
      <h2>Edit Profile</h2>
      <form id="profileForm">
        <input type="text" id="name" placeholder="New Name" required>
        <input type="tel" id="phone" placeholder="New Phone Number" required>
        <input type="text" id="address" placeholder="New Address" required>
        <input type="email" id="email-edit" placeholder="New Email" required>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  </div>
`;
document.body.insertAdjacentHTML("beforeend", modalHTML);

// JavaScript to handle modal logic
const editProfile = document.querySelector("edit-profile");
const modalForm = document.getElementById("profileModal");
const closeModal = document.getElementById("closeModal");
const profileForm = document.getElementById("profileForm");

function modalEdit() {
  modalForm.style.display = "block";
}

closeModal.addEventListener("click", function () {
  modalForm.style.display = "none";
});

window.addEventListener("click", function (e) {
  if (e.target === modalForm) {
    modalForm.style.display = "none";
  }
});

profileForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();
  const email = document.getElementById("email-edit").value.trim();

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

  let userData = JSON.parse(localStorage.getItem("userData"));

  if (name && phone && address && email) {
    alert("Profile updated successfully!");
    modalForm.style.display = "none";
    usernameDisplay.textContent = name;
    mobileNumberValue.textContent = phone;
    addressValue.textContent = address;
    emailValue.textContent = email;

    userData.username = name;
    userData.mobile = phone;
    userData.address = address;
    userData.email = email;

    localStorage.setItem("userData", JSON.stringify(userData));
  } else {
    alert("Please fill out all fields.");
  }
});
