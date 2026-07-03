/* ============================================
   ECHO — Modal System (Cursor-assisted)
   Tweet Modal + Login Modal shared utilities
   ============================================ */

(function() {
  'use strict';

  const Modal = {
    // Focus trap elements
    focusableSelectors: 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    
    open(backdropId) {
      const backdrop = document.getElementById(backdropId);
      if (!backdrop) return;
      
      backdrop.classList.add('modal-backdrop--visible');
      document.body.style.overflow = 'hidden';
      
      // Focus first focusable element
      setTimeout(() => {
        const focusable = backdrop.querySelectorAll(this.focusableSelectors);
        if (focusable.length) {
          focusable[0].focus();
        }
      }, 100);
      
      // Store trigger for focus return
      this.activeTrigger = document.activeElement;
    },
    
    close(backdropId) {
      const backdrop = document.getElementById(backdropId);
      if (!backdrop) return;
      
      backdrop.classList.remove('modal-backdrop--visible');
      document.body.style.overflow = '';
      
      // Return focus to trigger
      if (this.activeTrigger) {
        this.activeTrigger.focus();
        this.activeTrigger = null;
      }
    },
    
    trapFocus(backdropId) {
      const backdrop = document.getElementById(backdropId);
      if (!backdrop) return;
      
      const focusable = Array.from(backdrop.querySelectorAll(this.focusableSelectors));
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      
      backdrop.addEventListener('keydown', (e) => {
        if (e.key !== 'Tab') return;
        
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      });
    }
  };

  // Global escape handler for all modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-backdrop--visible').forEach(backdrop => {
        backdrop.classList.remove('modal-backdrop--visible');
      });
      document.body.style.overflow = '';
    }
  });

  // Expose for other modules
  window.EchoModal = Modal;
})();