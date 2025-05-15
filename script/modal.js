document.addEventListener('DOMContentLoaded', function() {
    // Modal Elements
    const modalOverlay = document.getElementById('modalOverlay');
    const closeBtn = document.querySelector('.close-btn');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const modalTitle = document.getElementById('modal-title');
    
    // User Profile Elements
    const userProfileModal = document.querySelector('.user-profile-modal');
    const profileCloseButton = document.querySelector('.user-profile-modal .close-button');
    const usernameDisplay = document.querySelector('.user-profile-modal .username');
    const mobileNumberValue = document.querySelector('.detail-item:nth-child(1) .detail-value');
    const emailValue = document.querySelector('.detail-item:nth-child(2) .detail-value');
    const addressValue = document.querySelector('.detail-item:nth-child(3) .detail-value');
    const logoutButton = document.querySelector('.user-profile-modal .btn-modal-outline');

    
    // User Icon in Navigation
    const userIconNav = document.querySelector('.user-icon');
    
    // Show Login Modal
    function showLoginModal() {
        modalOverlay.style.display = 'flex';
        loginForm.style.display = 'block';
        signupForm.style.display = 'none';
    }
    
    // Close Login Modal
    function closeLoginModal() {
        modalOverlay.style.display = 'none';
    }
    
    // Show User Profile Modal
    function showUserProfile() {
        userProfileModal.style.display = 'block';
    }
    
    // Close User Profile Modal
    function closeUserProfile() {
        userProfileModal.style.display = 'none';
    }
    
    // Toggle between Login and Signup forms
    function toggleForm() {
        if (loginForm.style.display === 'block') {
            loginForm.style.display = 'none';
            signupForm.style.display = 'block';
            modalTitle.textContent = 'SIGN UP';
        } else {
            loginForm.style.display = 'block';
            signupForm.style.display = 'none';
            modalTitle.textContent = 'LOGIN';
        }
    }
    
    // Handle Login Form Submission
    function handleLoginSubmit(e) {
        e.preventDefault();
        
        const emailOrUsername = loginForm.querySelector('input[type="text"]').value;
        const password = loginForm.querySelector('input[type="password"]').value;
        
        if (!emailOrUsername || !password) {
            alert('Please fill in all fields');
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
            isLoggedIn: true
        };
        
        localStorage.setItem('userData', JSON.stringify(userData));
        
        // Close login modal and show profile
        closeLoginModal();
        showUserProfile();
    }
    
    // Handle Signup Form Submission
    function handleSignupSubmit(e) {
        e.preventDefault();
        
        const fullName = signupForm.querySelector('input[type="text"]').value;
        const password = signupForm.querySelector('input[type="password"]').value;
        const confirmPassword = signupForm.querySelectorAll('input[type="password"]')[1].value;
        
        if (!fullName || !password || !confirmPassword) {
            alert('Please fill in all fields');
            return;
        }
        
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        
        // Update user profile data
        usernameDisplay.textContent = fullName;
        
        // Store user data
        const userData = {
            username: fullName,
            email: '',
            mobile: mobileNumberValue.textContent,
            address: addressValue.textContent,
            isLoggedIn: true
        };
        
        localStorage.setItem('userData', JSON.stringify(userData));
        
        // Close login modal and show profile
        closeLoginModal();
        showUserProfile();
    }
    
    // Handle Logout
    function handleLogout() {
        localStorage.removeItem('userData');
        closeUserProfile();
    }
    
    
    // Check login status on page load
    function checkLoginStatus() {
        const userData = JSON.parse(localStorage.getItem('userData'));
        
        if (userData && userData.isLoggedIn) {
            usernameDisplay.textContent = userData.username;
            emailValue.textContent = userData.email || '';
            mobileNumberValue.textContent = userData.mobile || '';
            addressValue.textContent = userData.address || '';
        }
    }
    
    // Event Listeners
    if (userIconNav) {
        userIconNav.addEventListener('click', function(e) {
            e.preventDefault();
            const userData = JSON.parse(localStorage.getItem('userData'));
            
            if (userData && userData.isLoggedIn) {
                showUserProfile();
            } else {
                showLoginModal();
            }
        });
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeLoginModal);
    }
    
    if (profileCloseButton) {
        profileCloseButton.addEventListener('click', closeUserProfile);
    }
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLoginSubmit);
    }
    
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignupSubmit);
    }
    
    if (logoutButton) {
        logoutButton.addEventListener('click', handleLogout);
    }

    showSignupBtn.addEventListener('click', function() {
        loginForm.style.display = 'none';
        signupForm.style.display = 'block';
                
        loginSidebar.style.display = 'none';
        signupSidebar.style.display = 'block';

        title.textContent = "SIGN UP";
    });
            
    showLoginBtn.addEventListener('click', function() {
        signupForm.style.display = 'none';
        loginForm.style.display = 'block';
                
        signupSidebar.style.display = 'none';
        loginSidebar.style.display = 'block';

        title.textContent = "LOGIN";
    });

    // Run on page load
    checkLoginStatus();
});

function openMenu() {
    document.getElementById('nav-column').style.display = 'flex';
    document.getElementById('nav-column1').style.display = 'flex';
    document.getElementById('menu-toggle').style.display = 'none';
    document.getElementById('menu-toggle1').style.display = 'flex';
}

function closeMenu() {
    document.getElementById('nav-column').style.display = 'none';
    document.getElementById('nav-column1').style.display = 'none';
    document.getElementById('menu-toggle').style.display = 'flex';
    document.getElementById('menu-toggle1').style.display = 'none';
}