/* ============================================
   ECHO — Dark Mode Toggle
   MANUAL FEATURE (No AI assistance)
   
   Features:
   - data-theme attribute on <html>
   - CSS custom properties for all tokens
   - localStorage persistence
   - System preference detection via prefers-color-scheme
   - Smooth transitions on all tokens
   - Accessible toggle with aria-pressed
   ============================================ */

(function() {
  'use strict';

  const STORAGE_KEY = 'echo-theme';
  const THEME_LIGHT = 'light';
  const THEME_DARK = 'dark';

  // Get saved theme or detect system preference
  function getInitialTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === THEME_LIGHT || saved === THEME_DARK) {
      return saved;
    }
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return THEME_DARK;
    }
    return THEME_LIGHT;
  }

  // Apply theme to document
  function applyTheme(theme) {
    const html = document.documentElement;
    html.setAttribute('data-theme', theme);
    
    // Update meta theme-color for mobile browsers
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.setAttribute('content', theme === THEME_DARK ? '#15202b' : '#1a7a5e');
    }
  }

  // Update toggle button state
  function updateToggleButton(theme) {
    const toggles = document.querySelectorAll('#theme-toggle');
    toggles.forEach(toggle => {
      if (toggle) {
        const isDark = theme === THEME_DARK;
        toggle.setAttribute('aria-pressed', isDark ? 'true' : 'false');
        toggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
      }
    });
  }

  // Save theme to localStorage
  function saveTheme(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {
      // localStorage might be disabled
      console.warn('Unable to save theme preference:', e);
    }
  }

  // Toggle between light and dark
  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || THEME_LIGHT;
    const next = current === THEME_DARK ? THEME_LIGHT : THEME_DARK;
    
    applyTheme(next);
    saveTheme(next);
    updateToggleButton(next);
    
    // Dispatch custom event for other components
    document.dispatchEvent(new CustomEvent('themechange', { 
      detail: { theme: next } 
    }));
  }

  // Initialize theme on page load
  function init() {
    const theme = getInitialTheme();
    applyTheme(theme);
    updateToggleButton(theme);

    // Bind toggle buttons
    const toggles = document.querySelectorAll('#theme-toggle');
    toggles.forEach(toggle => {
      toggle.addEventListener('click', toggleTheme);
      // Allow keyboard activation
      toggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleTheme();
        }
      });
    });

    // Listen for system preference changes
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', (e) => {
        // Only auto-switch if user hasn't manually set a preference
        if (!localStorage.getItem(STORAGE_KEY)) {
          const newTheme = e.matches ? THEME_DARK : THEME_LIGHT;
          applyTheme(newTheme);
          updateToggleButton(newTheme);
        }
      });
    }
  }

  // Run initialization when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();