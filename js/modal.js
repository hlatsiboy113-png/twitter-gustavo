export function initModal(onTweetSubmit) {
  const modal = document.getElementById('tweet-modal');
  if (!modal) return;

  const backdrop = modal.querySelector('.modal-backdrop');
  const closeBtn = modal.querySelector('.modal-close');
  const textarea = document.getElementById('modal-tweet-input');
  const counter = document.getElementById('modal-counter');
  const submitBtn = document.getElementById('modal-submit');
  const openTriggers = [
    document.getElementById('btn-sidebar-tweet'),
    document.getElementById('btn-fab-tweet')
  ];

  const MAX_CHARS = 280;
  let lastFocusedElement = null;

  // Wire up open triggers (Sidebar button + Mobile FAB)
  openTriggers.forEach((btn) => {
    if (btn) btn.addEventListener('click', openModal);
  });

  // Close triggers
  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);

  // Keyboard: Escape to close
  modal.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // Real-time character counter, auto-resize, and draft persistence
  textarea.addEventListener('input', () => {
    updateCounter();
    autoResize(textarea);
    localStorage.setItem('echo_tweet_draft', textarea.value);
  });

  // Submit from modal
  submitBtn.addEventListener('click', () => {
    const text = textarea.value.trim();
    if (!text || text.length > MAX_CHARS) return;

    if (typeof onTweetSubmit === 'function') {
      onTweetSubmit(text);
    }

    localStorage.removeItem('echo_tweet_draft');
    textarea.value = '';
    updateCounter();
    autoResize(textarea);
    closeModal();
    showToast('Tweet sent!', 'success');
  });

  /**
   * Opens the modal, saves focus, restores draft, and traps focus.
   */
  function openModal() {
    lastFocusedElement = document.activeElement;
    modal.hidden = false;
    document.body.style.overflow = 'hidden';

    const draft = localStorage.getItem('echo_tweet_draft');
    if (draft) {
      textarea.value = draft;
    } else {
      textarea.value = '';
    }
    updateCounter();
    autoResize(textarea);

    setTimeout(() => textarea.focus(), 50);
    trapFocus();
  }

  /**
   * Closes the modal with an animation, restores focus and scrolling.
   */
  function closeModal() {
    modal.classList.add('closing');
    setTimeout(() => {
      modal.hidden = true;
      modal.classList.remove('closing');
      document.body.style.overflow = '';
      if (lastFocusedElement) lastFocusedElement.focus();
      if (trapFocusHandler) {
        modal.removeEventListener('keydown', trapFocusHandler);
        trapFocusHandler = null;
      }
    }, 200);
  }

  /**
   * Updates the character counter and button state.
   */
  function updateCounter() {
    const length = textarea.value.length;
    counter.textContent = `${length}/${MAX_CHARS}`;
    submitBtn.disabled = length === 0 || length > MAX_CHARS;

    counter.classList.remove('warning', 'danger');
    if (length > MAX_CHARS) {
      counter.classList.add('danger');
    } else if (length >= 260) {
      counter.classList.add('warning');
    }
  }

  /**
   * Auto-resizes a textarea to fit its content.
   */
  function autoResize(el) {
    el.style.height = 'auto';
    el.style.height = el.scrollHeight + 'px';
  }

  let trapFocusHandler = null;

  /**
   * Focus trap for keyboard accessibility inside the modal.
   */
  function trapFocus() {
    const focusable = modal.querySelectorAll(
      'button, [href], input, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    trapFocusHandler = (e) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    modal.addEventListener('keydown', trapFocusHandler);
  }
}

/**
 * Self-contained Toast helper for modal notifications.
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
