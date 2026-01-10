// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeLoginPage();
});

// Initialize all login page functionality
function initializeLoginPage() {
    initializeFormValidation();
    initializePasswordToggle();
    initializeSocialLogin();
    initializeNavbar();
    setupForgotPassword();
}

// Form validation and submission
function initializeFormValidation() {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const loginBtn = document.getElementById('loginBtn');
    
    // Real-time validation
    emailInput.addEventListener('blur', () => validateEmail());
    passwordInput.addEventListener('blur', () => validatePassword());
    
    // Form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        
        if (isEmailValid && isPasswordValid) {
            handleLogin();
        }
    });
    
    // Clear errors on input
    emailInput.addEventListener('input', () => clearError('emailError'));
    passwordInput.addEventListener('input', () => clearError('passwordError'));
}

// Email validation
function validateEmail() {
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    const email = emailInput.value.trim();
    
    if (!email) {
        showError('emailError', 'Email address is required');
        return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showError('emailError', 'Please enter a valid email address');
        return false;
    }
    
    clearError('emailError');
    return true;
}

// Password validation
function validatePassword() {
    const passwordInput = document.getElementById('password');
    const passwordError = document.getElementById('passwordError');
    const password = passwordInput.value;
    
    if (!password) {
        showError('passwordError', 'Password is required');
        return false;
    }
    
    if (password.length < 6) {
        showError('passwordError', 'Password must be at least 6 characters long');
        return false;
    }
    
    clearError('passwordError');
    return true;
}

// Show error message
function showError(errorId, message) {
    const errorElement = document.getElementById(errorId);
    errorElement.textContent = message;
    errorElement.classList.add('show');
}

// Clear error message
function clearError(errorId) {
    const errorElement = document.getElementById(errorId);
    errorElement.textContent = '';
    errorElement.classList.remove('show');
}

// Handle login process
function handleLogin() {
    const loginBtn = document.getElementById('loginBtn');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const rememberMe = document.getElementById('rememberMe').checked;
    
    // Show loading state
    loginBtn.classList.add('loading');
    loginBtn.disabled = true;
    
    // Simulate login API call
    setTimeout(() => {
        // Mock validation - in real app, this would be server-side
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        
        // Simple mock validation (in real app, validate against server)
        if (email && password.length >= 6) {
            // Successful login
            showSuccessModal();
            
            // Store user data (mock)
            if (rememberMe) {
                // In real app, use secure token storage
                console.log('Remember me selected');
            }
        } else {
            // Failed login
            showError('passwordError', 'Invalid email or password');
            loginBtn.classList.remove('loading');
            loginBtn.disabled = false;
        }
    }, 2000);
}

// Password toggle functionality
function initializePasswordToggle() {
    const passwordToggle = document.getElementById('passwordToggle');
    const passwordInput = document.getElementById('password');
    
    passwordToggle.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        const icon = this.querySelector('i');
        icon.classList.toggle('fa-eye');
        icon.classList.toggle('fa-eye-slash');
    });
}

// Social login functionality
function initializeSocialLogin() {
    const googleBtn = document.getElementById('googleLogin');
    const facebookBtn = document.getElementById('facebookLogin');
    
    googleBtn.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
        
        showNotification('Google login will be implemented soon!', 'info');
    });
    
    facebookBtn.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
        
        showNotification('Facebook login will be implemented soon!', 'info');
    });
}

// Success modal
function showSuccessModal() {
    const modal = document.getElementById('successModal');
    const progressFill = document.getElementById('progressFill');
    
    modal.classList.add('show');
    
    // Animate progress bar
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += 2;
        progressFill.style.width = progress + '%';
        
        if (progress >= 100) {
            clearInterval(progressInterval);
            setTimeout(() => {
                modal.classList.remove('show');
                // Redirect to home page
                window.location.href = 'index.html';
            }, 500);
        }
    }, 50);
}

// Navbar functionality
function initializeNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            navbar.style.background = 'linear-gradient(135deg, rgba(102, 126, 234, 0.95) 0%, rgba(118, 75, 162, 0.95) 100%)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            navbar.style.backdropFilter = 'none';
        }
        
        lastScrollY = currentScrollY;
    });
}

// Forgot password functionality
function setupForgotPassword() {
    const forgotPasswordLink = document.querySelector('.forgot-password');
    
    forgotPasswordLink.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Create modal for forgot password
        const modal = createForgotPasswordModal();
        document.body.appendChild(modal);
        modal.classList.add('show');
    });
}

// Create forgot password modal
function createForgotPasswordModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Reset Password</h3>
                <button class="modal-close" onclick="this.closest('.modal').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <form class="forgot-form">
                <p>Enter your email address and we'll send you a link to reset your password.</p>
                <div class="form-group">
                    <input type="email" placeholder="Enter your email address" required>
                </div>
                <button type="submit" class="reset-btn">Send Reset Link</button>
            </form>
        </div>
    `;
    
    // Add styles for the modal
    const modalStyle = document.createElement('style');
    modalStyle.textContent = `
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            padding-bottom: 15px;
            border-bottom: 1px solid #e1e8ed;
        }
        .modal-close {
            background: none;
            border: none;
            font-size: 1.2rem;
            cursor: pointer;
            color: #666;
            padding: 5px;
            border-radius: 50%;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .modal-close:hover {
            background: #f1f1f1;
        }
        .forgot-form p {
            margin-bottom: 20px;
            color: #666;
        }
        .reset-btn {
            width: 100%;
            padding: 12px;
            background: linear-gradient(45deg, #667eea, #764ba2);
            color: white;
            border: none;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
        }
    `;
    document.head.appendChild(modalStyle);
    
    // Handle form submission
    const form = modal.querySelector('.forgot-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        
        if (email) {
            showNotification('Password reset link sent to your email!', 'success');
            modal.remove();
        }
    });
    
    return modal;
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        font-weight: 600;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// Demo credentials helper
function showDemoCredentials() {
    showNotification('Demo: Use any email and password (min 6 chars)', 'info');
}

// Add demo button after page loads
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const demoBtn = document.createElement('button');
        demoBtn.textContent = 'Show Demo Credentials';
        demoBtn.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            background: rgba(102, 126, 234, 0.9);
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 12px;
            z-index: 1000;
        `;
        demoBtn.onclick = showDemoCredentials;
        document.body.appendChild(demoBtn);
    }, 2000);
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Enter key to submit form
    if (e.key === 'Enter' && !e.shiftKey) {
        const activeElement = document.activeElement;
        if (activeElement.tagName === 'INPUT' && activeElement.closest('#loginForm')) {
            e.preventDefault();
            document.getElementById('loginForm').dispatchEvent(new Event('submit'));
        }
    }
    
    // Escape key to close modals
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => modal.remove());
    }
});

// Auto-focus email input
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const emailInput = document.getElementById('email');
        if (emailInput) {
            emailInput.focus();
        }
    }, 500);
});