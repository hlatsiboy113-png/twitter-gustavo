/* ============================================
   ECHO — Login Page Logic (Cursor-assisted)
   Form validation, password toggle, loading states
   ============================================ */

(function() {
  'use strict';

  const Toast = {
    container: null,
    
    init() {
      this.container = document.getElementById('toast-container');
    },
    
    show(message, type = 'info', duration = 3000) {
      if (!this.container) return;
      
      const icons = {
        success: '<svg class="toast__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>',
        error: '<svg class="toast__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>',
        info: '<svg class="toast__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>'
      };
      
      const toast = document.createElement('div');
      toast.className = `toast toast--${type}`;
      toast.setAttribute('role', 'status');
      toast.setAttribute('aria-live', 'polite');
      toast.innerHTML = `${icons[type]}<span>${message}</span>`;
      
      this.container.appendChild(toast);
      
      setTimeout(() => {
        toast.style.animation = 'toastFadeOut 0.3s ease-in forwards';
        setTimeout(() => {
          if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
          }
        }, 300);
      }, duration);
    }
  };

  function initLoginForm() {
    const form = document.getElementById('login-form');
    if (!form) return;
    
    const emailInput = document.getElementById('login-email');
    const passwordInput = document.getElementById('login-password');
    const emailError = document.getElementById('login-email-error');
    const passwordError = document.getElementById('login-password-error');
    const submitBtn = document.getElementById('login-submit');
    const toggleBtn = document.getElementById('toggle-password');
    const eyeIcon = document.getElementById('eye-icon');
    const rememberMe = document.getElementById('remember-me');
    
    // Check for remembered email
    const rememberedEmail = localStorage.getItem('echo-remembered-email');
    if (rememberedEmail && emailInput) {
      emailInput.value = rememberedEmail;
      if (rememberMe) rememberMe.checked = true;
    }
    
    // Password visibility toggle
    if (toggleBtn && eyeIcon) {
      toggleBtn.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        if (type === 'text') {
          eyeIcon.innerHTML = '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line>';
          toggleBtn.setAttribute('aria-label', 'Hide password');
        } else {
          eyeIcon.innerHTML = '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>';
          toggleBtn.setAttribute('aria-label', 'Show password');
        }
      });
    }
    
    function validateEmail() {
      const email = emailInput.value.trim();
      const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      
      if (!isValid && email.length > 0) {
        emailInput.classList.add('form-input--error');
        emailError.style.display = 'flex';
        return false;
      } else {
        emailInput.classList.remove('form-input--error');
        emailError.style.display = 'none';
        return email.length > 0;
      }
    }
    
    function validatePassword() {
      const password = passwordInput.value;
      const isValid = password.length >= 6;
      
      if (!isValid && password.length > 0) {
        passwordInput.classList.add('form-input--error');
        passwordError.style.display = 'flex';
        return false;
      } else {
        passwordInput.classList.remove('form-input--error');
        passwordError.style.display = 'none';
        return password.length > 0;
      }
    }
    
    emailInput.addEventListener('blur', validateEmail);
    passwordInput.addEventListener('blur', validatePassword);
    
    emailInput.addEventListener('input', function() {
      if (this.classList.contains('form-input--error')) {
        validateEmail();
      }
    });
    
    passwordInput.addEventListener('input', function() {
      if (this.classList.contains('form-input--error')) {
        validatePassword();
      }
    });
    
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const emailValid = validateEmail();
      const passwordValid = validatePassword();
      
      if (!emailValid || !passwordValid) {
        if (!emailValid) {
          emailInput.focus();
          Toast.show('Please enter a valid email address', 'error');
        } else {
          passwordInput.focus();
          Toast.show('Password must be at least 6 characters', 'error');
        }
        return;
      }
      
      // Show loading state
      submitBtn.disabled = true;
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<span class="btn-login__spinner"></span><span>Signing in...</span>';
      
      // Save remember me
      if (rememberMe && rememberMe.checked) {
        localStorage.setItem('echo-remembered-email', emailInput.value.trim());
      } else {
        localStorage.removeItem('echo-remembered-email');
      }
      
      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        Toast.show('Welcome back, Mahlatse! 🎉', 'success');
        
        // Redirect to main page after brief delay
        setTimeout(() => {
          window.location.href = 'index.html';
        }, 1500);
      }, 1500);
    });
  }

  function init() {
    Toast.init();
    initLoginForm();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();