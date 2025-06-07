document.addEventListener("DOMContentLoaded", function () {
  // Modal Elements
  const modalOverlay = document.getElementById("modalOverlay");
  const closeBtn = document.querySelector(".close-btn");
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");
  const title = document.getElementById("modal-title");
  const showSignupBtn = document.getElementById("showSignupBtn");
  const showLoginBtn = document.getElementById("showLoginBtn");
  const loginSidebar = document.querySelector(".login-sidebar");
  const signupSidebar = document.querySelector(".signup-sidebar");

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
    if (modalOverlay) {
      modalOverlay.style.display = "flex";
      if (loginForm) loginForm.style.display = "block";
      if (signupForm) signupForm.style.display = "none";
      if (title) title.textContent = "LOGIN";
    }
  }

  // Close Login Modal
  function closeLoginModal() {
    if (modalOverlay) {
      modalOverlay.style.display = "none";
    }
  }

  // Show User Profile Modal
  function showUserProfile() {
    if (userProfileModal) {
      userProfileModal.style.display = "block";
    }
  }

  // Close User Profile Modal
  function closeUserProfile() {
    if (userProfileModal) {
      userProfileModal.style.display = "none";
    }
  }

  // Handle Login Form Submission
  function handleLoginSubmit(e) {
    e.preventDefault();

    const emailOrUsername =
      loginForm.querySelector('input[type="text"]')?.value;
    const password = loginForm.querySelector('input[type="password"]')?.value;

    if (!emailOrUsername || !password) {
      alert("Please fill in all fields");
      return;
    }

    // Update user profile data
    if (usernameDisplay) usernameDisplay.textContent = emailOrUsername;
    if (emailValue) emailValue.textContent = emailOrUsername;

    // Store user data (Note: In production, avoid storing sensitive data in localStorage)
    const userData = {
      username: emailOrUsername,
      email: emailOrUsername,
      mobile: mobileNumberValue?.textContent || "",
      address: addressValue?.textContent || "",
      isLoggedIn: true,
    };

    try {
      localStorage.setItem("userData", JSON.stringify(userData));
    } catch (error) {
      console.error("Error saving user data:", error);
      alert("Error saving login data. Please try again.");
      return;
    }

    // Close login modal and show profile
    closeLoginModal();
    showUserProfile();
  }

  // Handle Signup Form Submission
  function handleSignupSubmit(e) {
    e.preventDefault();

    const fullName = signupForm.querySelector('input[type="text"]')?.value;
    const password = signupForm.querySelector('input[type="password"]')?.value;
    const confirmPassword = signupForm.querySelectorAll(
      'input[type="password"]'
    )[1]?.value;

    if (!fullName || !password || !confirmPassword) {
      alert("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Update user profile data
    if (usernameDisplay) usernameDisplay.textContent = fullName;

    // Store user data
    const userData = {
      username: fullName,
      email: "",
      mobile: mobileNumberValue?.textContent || "",
      address: addressValue?.textContent || "",
      isLoggedIn: true,
    };

    try {
      localStorage.setItem("userData", JSON.stringify(userData));
    } catch (error) {
      console.error("Error saving user data:", error);
      alert("Error saving signup data. Please try again.");
      return;
    }

    // Close login modal and show profile
    closeLoginModal();
    showUserProfile();
  }

  // Handle Logout
  function handleLogout() {
    try {
      localStorage.removeItem("userData");
    } catch (error) {
      console.error("Error removing user data:", error);
    }
    closeUserProfile();
  }

  // Check login status on page load
  function checkLoginStatus() {
    try {
      const userData = JSON.parse(localStorage.getItem("userData"));

      if (userData && userData.isLoggedIn) {
        if (usernameDisplay)
          usernameDisplay.textContent = userData.username || "";
        if (emailValue) emailValue.textContent = userData.email || "";
        if (mobileNumberValue)
          mobileNumberValue.textContent = userData.mobile || "";
        if (addressValue) addressValue.textContent = userData.address || "";
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  }

  // Event Listeners
  if (userIconNav) {
    userIconNav.addEventListener("click", function (e) {
      e.preventDefault();
      try {
        const userData = JSON.parse(localStorage.getItem("userData"));
        if (userData && userData.isLoggedIn) {
          showUserProfile();
        } else {
          showLoginModal();
        }
      } catch (error) {
        console.error("Error checking login status:", error);
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

  // Toggle between Login and Signup forms
  if (showSignupBtn) {
    showSignupBtn.addEventListener("click", function () {
      if (loginForm) loginForm.style.display = "none";
      if (signupForm) signupForm.style.display = "block";
      if (loginSidebar) loginSidebar.style.display = "none";
      if (signupSidebar) signupSidebar.style.display = "block";
      if (title) title.textContent = "SIGN UP";
    });
  }

  if (showLoginBtn) {
    showLoginBtn.addEventListener("click", function () {
      if (signupForm) signupForm.style.display = "none";
      if (loginForm) loginForm.style.display = "block";
      if (signupSidebar) signupSidebar.style.display = "none";
      if (loginSidebar) loginSidebar.style.display = "block";
      if (title) title.textContent = "LOGIN";
    });
  }

  // Run on page load
  checkLoginStatus();
});

// Menu Functions
function openMenu() {
  const navColumn = document.getElementById("nav-column");
  const navColumn1 = document.getElementById("nav-column1");
  const menuToggle = document.getElementById("menu-toggle");
  const menuToggle1 = document.getElementById("menu-toggle1");

  if (navColumn) navColumn.style.display = "flex";
  if (navColumn1) navColumn1.style.display = "flex";
  if (menuToggle) menuToggle.style.display = "none";
  if (menuToggle1) menuToggle1.style.display = "flex";
}

function closeMenu() {
  const navColumn = document.getElementById("nav-column");
  const navColumn1 = document.getElementById("nav-column1");
  const menuToggle = document.getElementById("menu-toggle");
  const menuToggle1 = document.getElementById("menu-toggle1");

  if (navColumn) navColumn.style.display = "none";
  if (navColumn1) navColumn1.style.display = "none";
  if (menuToggle) menuToggle.style.display = "flex";
  if (menuToggle1) menuToggle1.style.display = "none";
}

// Payment Modal Functions
function openAddCard() {
  const paymentModal = document.querySelector(".payment-modal");
  if (paymentModal) paymentModal.style.display = "flex";
}

function closeAddCard() {
  const paymentModal = document.querySelector(".payment-modal");
  if (paymentModal) paymentModal.style.display = "none";
}

// Transaction Modal Functions
function openTransaction() {
  const transactionModal = document.querySelector(".transaction-modal");
  if (transactionModal) transactionModal.style.display = "block";
}

function closeTransaction() {
  const transactionModal = document.querySelector(".transaction-modal");
  if (transactionModal) transactionModal.style.display = "none";
}

// Subscription Form Handler
document.addEventListener("DOMContentLoaded", function () {
  const subscriptionForm = document.querySelector(".subscription-form button");
  const emailInput = document.getElementById("email");

  if (subscriptionForm && emailInput) {
    subscriptionForm.addEventListener("click", function () {
      if (emailInput.value.trim() !== "") {
        alert("Thank you for subscribing!");
        emailInput.value = ""; // Clear the input after successful subscription
      } else {
        alert("Please Enter your Email First.");
      }
    });
  }
});

// Profile Edit Modal
document.addEventListener("DOMContentLoaded", function () {
  // Inject modal styles
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
        border: 1px solid #ddd;
        border-radius: 4px;
      }
      .modal-content-edit button {
        width: 100%;
        padding: 10px;
        background-color: var(--accent, #007bff);
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
        background-color: var(--accent-dark, #0056b3);
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

  // Modal logic
  const modalForm = document.getElementById("profileModal");
  const closeModal = document.getElementById("closeModal");
  const profileForm = document.getElementById("profileForm");

  // Global function to open modal (can be called from HTML)
  window.modalEdit = function () {
    if (modalForm) modalForm.style.display = "block";
  };

  if (closeModal) {
    closeModal.addEventListener("click", function () {
      if (modalForm) modalForm.style.display = "none";
    });
  }

  window.addEventListener("click", function (e) {
    if (e.target === modalForm) {
      if (modalForm) modalForm.style.display = "none";
    }
  });

  if (profileForm) {
    profileForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name")?.value.trim() || "";
      const phone = document.getElementById("phone")?.value.trim() || "";
      const address = document.getElementById("address")?.value.trim() || "";
      const email = document.getElementById("email-edit")?.value.trim() || "";

      if (!name || !phone || !address || !email) {
        alert("Please fill out all fields.");
        return;
      }

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

      try {
        let userData = JSON.parse(localStorage.getItem("userData")) || {};

        // Update DOM elements
        if (usernameDisplay) usernameDisplay.textContent = name;
        if (mobileNumberValue) mobileNumberValue.textContent = phone;
        if (addressValue) addressValue.textContent = address;
        if (emailValue) emailValue.textContent = email;

        // Update localStorage
        userData.username = name;
        userData.mobile = phone;
        userData.address = address;
        userData.email = email;

        localStorage.setItem("userData", JSON.stringify(userData));

        alert("Profile updated successfully!");
        if (modalForm) modalForm.style.display = "none";

        // Clear form
        profileForm.reset();
      } catch (error) {
        console.error("Error updating profile:", error);
        alert("Error updating profile. Please try again.");
      }
    });
  }
});

document.querySelector(".edit-profile").addEventListener("click", function () {
  modalEdit();
});

function loadCartQuantity() {
  try {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let quantity = 0;

    cart.forEach((item) => {
      quantity += item.quantity;
    });

    const cartCountElement = document.querySelector(".cart-count");
    if (cartCountElement) {
      if (quantity > 0) {
        cartCountElement.textContent = quantity;
        cartCountElement.style.display = "block";
      } else {
        cartCountElement.style.display = "none";
      }
    }
  } catch (error) {
    console.error("Error loading cart quantity:", error);
  }
}

loadCartQuantity();
