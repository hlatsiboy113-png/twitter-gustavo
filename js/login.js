document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('login-form');
  const emailInput = document.getElementById('login-email');
  const passwordInput = document.getElementById('login-password');
  const emailError = document.getElementById('email-error');
  const passwordError = document.getElementById('password-error');
  const toggleBtn = document.getElementById('password-toggle');
  const toggleIcon = document.getElementById('password-toggle-icon');
  const rememberMe = document.getElementById('remember-me');
  const forgotLink = document.getElementById('forgot-link');
  const signupLink = document.getElementById('signup-link');

  /**
   * Remember Me Feature
   * Prefills the email if previously saved to localStorage.
   */
  const savedEmail = localStorage.getItem('echo_remember_email');
  if (savedEmail) {
    emailInput.value = savedEmail;
    rememberMe.checked = true;
  }

  /**
   * Password Visibility Toggle
   * Switches input type between password and text.
   * Updates icon and ARIA label for accessibility.
   */
  toggleBtn.addEventListener('click', () => {
    const isPassword = passwordInput.type === 'password';
    passwordInput.type = isPassword ? 'text' : 'password';
    toggleIcon.className = isPassword ? 'bi bi-eye' : 'bi bi-eye-slash';
    toggleBtn.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
    toggleBtn.setAttribute('title', isPassword ? 'Hide password' : 'Show password');
  });

  /**
   * Validation Helpers
   */
  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function showError(input, errorEl, message) {
    const group = input.closest('.form-group');
    if (group) group.classList.add('has-error');
    errorEl.textContent = message;
    errorEl.classList.add('visible');
    input.setAttribute('aria-invalid', 'true');
  }

  function clearError(input, errorEl) {
    const group = input.closest('.form-group');
    if (group) group.classList.remove('has-error');
    errorEl.textContent = '';
    errorEl.classList.remove('visible');
    input.setAttribute('aria-invalid', 'false');
  }

  // Clear errors on input
  emailInput.addEventListener('input', () => clearError(emailInput, emailError));
  passwordInput.addEventListener('input', () => clearError(passwordInput, passwordError));

  /**
   * Form Submission Handler
   * Validates fields, persists Remember Me state, and simulates login.
   */
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // Email validation
    if (!email) {
      showError(emailInput, emailError, 'Email address is required.');
      isValid = false;
    } else if (!validateEmail(email)) {
      showError(emailInput, emailError, 'Please enter a valid email address (e.g., user@example.com).');
      isValid = false;
    } else {
      clearError(emailInput, emailError);
    }

    // Password validation
    if (!password) {
      showError(passwordInput, passwordError, 'Password is required.');
      isValid = false;
    } else if (password.length < 6) {
      showError(passwordInput, passwordError, 'Password must be at least 6 characters long.');
      isValid = false;
    } else {
      clearError(passwordInput, passwordError);
    }

    if (isValid) {
      // Persist or clear Remember Me
      if (rememberMe.checked) {
        localStorage.setItem('echo_remember_email', email);
      } else {
        localStorage.removeItem('echo_remember_email');
      }

      showToast('Login successful! Redirecting...', 'success');

      // Simulate network delay then redirect
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1200);
    }
  });

  /**
   * Forgot Password Handler
   */
  forgotLink.addEventListener('click', (e) => {
    e.preventDefault();
    showToast('Password reset feature is coming soon!', 'info');
  });

  /**
   * Sign Up Handler
   */
  signupLink.addEventListener('click', (e) => {
    e.preventDefault();
    showToast('Sign up feature is coming soon!', 'info');
  });

  /**
   * Toast Notification Helper
   * Self-contained for the standalone login page.
   */
  function showToast(message, type = 'info') {
    const container = document.querySelector('.toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.setAttribute('role', 'alert');
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('removing');
      toast.addEventListener('animationend', () => toast.remove());
    }, 3000);
  }
});
