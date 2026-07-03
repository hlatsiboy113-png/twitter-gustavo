/* ============================================
   ECHO — Main Application Logic
   Feed, Composer, Interactions, Toast System
   ============================================ */

(function() {
  'use strict';

  // ============================================
  // TWEET DATA
  // ============================================
  const TWEET_DATA = [
    {
      id: 1,
      name: 'Alex Rivera',
      handle: '@arivera_dev',
      time: '2h',
      text: 'Just spent 3 hours debugging a CSS grid issue only to realize I had a typo in `grid-template-columns`. The frontend life is a beautiful chaos. #CSS #Frontend',
      avatar: 'linear-gradient(135deg, #1a7a5e, #7c3aed)',
      likes: 42,
      retweets: 12,
      replies: 5,
      liked: false,
      retweeted: false
    },
    {
      id: 2,
      name: 'Mia Thompson',
      handle: '@miacodes',
      time: '4h',
      text: 'Accessibility isn\'t a feature, it\'s a requirement. Every time you skip ARIA labels, a screen reader user gets left behind. Let\'s build for everyone. #A11y #InclusiveDesign',
      avatar: 'linear-gradient(135deg, #7c3aed, #1a7a5e)',
      likes: 89,
      retweets: 34,
      replies: 8,
      liked: false,
      retweeted: false
    },
    {
      id: 3,
      name: 'Jordan Kim',
      handle: '@jordanbuilds',
      time: '5h',
      text: 'JavaScript closures still blow my mind after 5 years. The lexical scope chain is like a backpack that functions carry around. What\'s your "aha" moment in JS? #JavaScript #Learning',
      avatar: 'linear-gradient(135deg, #059669, #7c3aed)',
      likes: 156,
      retweets: 67,
      replies: 23,
      liked: false,
      retweeted: false
    },
    {
      id: 4,
      name: 'Sam Okafor',
      handle: '@samfrontend',
      time: '7h',
      text: 'Responsive design tip: Stop thinking in pixels. Start thinking in relative units. Your designs will thank you on every screen size. #ResponsiveDesign #CSS',
      avatar: 'linear-gradient(135deg, #d97706, #1a7a5e)',
      likes: 73,
      retweets: 28,
      replies: 6,
      liked: false,
      retweeted: false
    },
    {
      id: 5,
      name: 'Priya Sharma',
      handle: '@priyadesigns',
      time: '8h',
      text: 'Coffee is the fuel, but curiosity is the engine. Today I learned about CSS container queries and my mind is officially blown. The future is here! #CSS #WebDev',
      avatar: 'linear-gradient(135deg, #7c3aed, #dc2626)',
      likes: 201,
      retweets: 89,
      replies: 31,
      liked: false,
      retweeted: false
    },
    {
      id: 6,
      name: 'David Chen',
      handle: '@davidux',
      time: '10h',
      text: 'UX is not about making things pretty. It\'s about making things work. The best interface is the one the user doesn\'t even notice. #UX #DesignThinking',
      avatar: 'linear-gradient(135deg, #1a7a5e, #059669)',
      likes: 134,
      retweets: 56,
      replies: 14,
      liked: false,
      retweeted: false
    },
    {
      id: 7,
      name: 'Nadia Patel',
      handle: '@nadiacodes',
      time: '12h',
      text: 'Semantic HTML is like good grammar for the web. It costs nothing to use <article> instead of <div>, but it means everything to assistive tech. #HTML #Accessibility',
      avatar: 'linear-gradient(135deg, #dc2626, #7c3aed)',
      likes: 95,
      retweets: 41,
      replies: 9,
      liked: false,
      retweeted: false
    },
    {
      id: 8,
      name: 'Lucas Mendez',
      handle: '@lucasweb',
      time: '14h',
      text: 'My IDE theme is dark, my coffee is black, and my commits are atomic. That\'s the frontend developer way. Who else is team dark mode? #DevLife #Frontend',
      avatar: 'linear-gradient(135deg, #7c3aed, #1a7a5e)',
      likes: 312,
      retweets: 145,
      replies: 47,
      liked: false,
      retweeted: false
    }
  ];

  // ============================================
  // TOAST SYSTEM
  // ============================================
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

  // ============================================
  // TWEET RENDERING
  // ============================================
  function renderTweet(tweet) {
    const text = tweet.text
      .replace(/#(\w+)/g, '<span class="hashtag">#$1</span>')
      .replace(/@(\w+)/g, '<span class="mention">@$1</span>');
    
    return `
      <article class="tweet" data-id="${tweet.id}" aria-label="Tweet from ${tweet.name}">
        <div class="tweet__avatar" style="background: ${tweet.avatar};" role="img" aria-label="${tweet.name}'s avatar"></div>
        <div class="tweet__content">
          <div class="tweet__header">
            <span class="tweet__name">${tweet.name}</span>
            <span class="tweet__handle">${tweet.handle}</span>
            <span class="tweet__time">· ${tweet.time}</span>
          </div>
          <div class="tweet__text">${text}</div>
          <div class="tweet__actions" role="group" aria-label="Tweet actions">
            <button class="tweet__action tweet__action--reply" aria-label="Reply to ${tweet.name}">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
              <span>${tweet.replies}</span>
            </button>
            <button class="tweet__action tweet__action--retweet ${tweet.retweeted ? 'tweet__action--active' : ''}" aria-label="Retweet" aria-pressed="${tweet.retweeted}">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><polyline points="7 23 3 19 7 15"></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3"></path></svg>
              <span>${tweet.retweets}</span>
            </button>
            <button class="tweet__action tweet__action--like ${tweet.liked ? 'tweet__action--active' : ''}" aria-label="Like" aria-pressed="${tweet.liked}">
              <svg viewBox="0 0 24 24" fill="${tweet.liked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
              <span>${tweet.likes}</span>
            </button>
            <button class="tweet__action tweet__action--share" aria-label="Share tweet">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg>
            </button>
          </div>
        </div>
      </article>
    `;
  }

  function renderFeed() {
    const feed = document.getElementById('tweet-feed');
    if (!feed) return;
    
    feed.innerHTML = TWEET_DATA.map(renderTweet).join('');
    bindTweetActions();
  }

  // ============================================
  // TWEET ACTIONS
  // ============================================
  function bindTweetActions() {
    document.querySelectorAll('.tweet__action--like').forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        const tweet = this.closest('.tweet');
        const id = parseInt(tweet.dataset.id);
        const data = TWEET_DATA.find(t => t.id === id);
        
        if (data) {
          data.liked = !data.liked;
          data.likes += data.liked ? 1 : -1;
          
          this.classList.toggle('tweet__action--active', data.liked);
          this.setAttribute('aria-pressed', data.liked);
          const svg = this.querySelector('svg');
          svg.setAttribute('fill', data.liked ? 'currentColor' : 'none');
          this.querySelector('span').textContent = data.likes;
          
          Toast.show(data.liked ? 'Tweet liked!' : 'Tweet unliked', 'success');
        }
      });
    });

    document.querySelectorAll('.tweet__action--retweet').forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        const tweet = this.closest('.tweet');
        const id = parseInt(tweet.dataset.id);
        const data = TWEET_DATA.find(t => t.id === id);
        
        if (data) {
          data.retweeted = !data.retweeted;
          data.retweets += data.retweeted ? 1 : -1;
          
          this.classList.toggle('tweet__action--active', data.retweeted);
          this.setAttribute('aria-pressed', data.retweeted);
          this.querySelector('span').textContent = data.retweets;
          
          Toast.show(data.retweeted ? 'Retweeted!' : 'Retweet removed', 'success');
        }
      });
    });

    document.querySelectorAll('.tweet__action--share').forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        Toast.show('Link copied to clipboard!', 'info');
      });
    });
  }

  // ============================================
  // COMPOSER
  // ============================================
  function initComposer() {
    const textarea = document.getElementById('tweet-input');
    const counter = document.getElementById('char-counter');
    const btn = document.getElementById('tweet-btn');
    
    if (!textarea || !counter || !btn) return;
    
    function updateComposer() {
      const length = textarea.value.length;
      const remaining = 280 - length;
      
      counter.textContent = remaining;
      btn.disabled = length === 0 || length > 280;
      
      counter.classList.remove('composer__counter--warn', 'composer__counter--error');
      if (remaining <= 20 && remaining > 0) {
        counter.classList.add('composer__counter--warn');
      } else if (remaining <= 0) {
        counter.classList.add('composer__counter--error');
      }
    }
    
    textarea.addEventListener('input', updateComposer);
    
    btn.addEventListener('click', function() {
      const text = textarea.value.trim();
      if (!text) return;
      
      const newTweet = {
        id: Date.now(),
        name: 'Mahlatse',
        handle: '@mahlatse_dev',
        time: 'now',
        text: text,
        avatar: 'linear-gradient(135deg, #1a7a5e, #7c3aed)',
        likes: 0,
        retweets: 0,
        replies: 0,
        liked: false,
        retweeted: false
      };
      
      TWEET_DATA.unshift(newTweet);
      
      const feed = document.getElementById('tweet-feed');
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = renderTweet(newTweet);
      const newTweetEl = tempDiv.firstElementChild;
      feed.insertBefore(newTweetEl, feed.firstChild);
      
      textarea.value = '';
      updateComposer();
      
      Toast.show('Tweet posted successfully!', 'success');
    });
  }

  // ============================================
  // SKELETON LOADING
  // ============================================
  function initSkeletonLoading() {
    const skeleton = document.getElementById('skeleton-feed');
    const feed = document.getElementById('tweet-feed');
    
    if (!skeleton || !feed) return;
    
    setTimeout(() => {
      skeleton.style.display = 'none';
      feed.style.display = 'block';
      renderFeed();
    }, 800);
  }

  // ============================================
  // TABS
  // ============================================
  function initTabs() {
    const tabs = document.querySelectorAll('.feed-tab');
    
    tabs.forEach(tab => {
      tab.addEventListener('click', function() {
        tabs.forEach(t => {
          t.classList.remove('feed-tab--active');
          t.setAttribute('aria-selected', 'false');
        });
        this.classList.add('feed-tab--active');
        this.setAttribute('aria-selected', 'true');
      });
      
      tab.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
          e.preventDefault();
          const current = Array.from(tabs).indexOf(this);
          const next = e.key === 'ArrowRight' 
            ? (current + 1) % tabs.length 
            : (current - 1 + tabs.length) % tabs.length;
          tabs[next].focus();
          tabs[next].click();
        }
      });
    });
  }

  // ============================================
  // SEARCH SUGGESTIONS
  // ============================================
  function initSearch() {
    const searchInput = document.getElementById('search-input');
    const suggestions = document.getElementById('search-suggestions');
    
    if (!searchInput || !suggestions) return;
    
    searchInput.addEventListener('focus', () => {
      suggestions.classList.add('search__suggestions--visible');
    });
    
    searchInput.addEventListener('blur', (e) => {
      setTimeout(() => {
        suggestions.classList.remove('search__suggestions--visible');
      }, 200);
    });
    
    searchInput.addEventListener('input', function() {
      const val = this.value.toLowerCase();
      const items = suggestions.querySelectorAll('.search__suggestion-item');
      items.forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(val) || val === '' ? 'flex' : 'none';
      });
    });
    
    suggestions.querySelectorAll('.search__suggestion-item').forEach(item => {
      item.addEventListener('click', function() {
        searchInput.value = this.textContent.trim();
        suggestions.classList.remove('search__suggestions--visible');
        Toast.show(`Searching for "${searchInput.value}"...`, 'info');
      });
    });
  }

  // ============================================
  // FOLLOW BUTTONS
  // ============================================
  function initFollowButtons() {
    document.querySelectorAll('.follow-item__btn').forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        const isFollowing = this.classList.contains('follow-item__btn--following');
        
        if (isFollowing) {
          this.classList.remove('follow-item__btn--following');
          this.querySelector('.follow-text').textContent = 'Follow';
          Toast.show('Unfollowed', 'info');
        } else {
          this.classList.add('follow-item__btn--following');
          this.querySelector('.follow-text').textContent = 'Following';
          Toast.show('Now following!', 'success');
        }
      });
    });
  }

  // ============================================
  // NAV ITEMS
  // ============================================
  function initNavItems() {
    document.querySelectorAll('.nav__item').forEach(item => {
      item.addEventListener('click', function(e) {
        if (this.getAttribute('href') === '#') {
          e.preventDefault();
          const label = this.querySelector('.nav__label')?.textContent || 'page';
          Toast.show(`${label} — coming soon!`, 'info');
        }
      });
    });
  }

  // ============================================
  // LOGIN MODAL TRIGGER
  // ============================================
  function initLoginModalTrigger() {
    const profileSummary = document.querySelector('.profile-summary');
    if (profileSummary) {
      profileSummary.addEventListener('click', function() {
        const backdrop = document.getElementById('login-modal-backdrop');
        if (backdrop) {
          backdrop.classList.add('modal-backdrop--visible');
          document.body.style.overflow = 'hidden';
          
          setTimeout(() => {
            const emailInput = document.getElementById('login-modal-email');
            if (emailInput) emailInput.focus();
          }, 100);
        }
      });
    }
  }

  // ============================================
  // MODAL TRIGGERS (Tweet buttons)
  // ============================================
  function initModalTriggers() {
    const tweetBtns = [
      document.getElementById('sidebar-tweet-btn'),
      document.getElementById('mobile-fab')
    ];
    
    const backdrop = document.getElementById('tweet-modal-backdrop');
    
    tweetBtns.forEach(btn => {
      if (btn) {
        btn.addEventListener('click', function() {
          if (backdrop) {
            backdrop.classList.add('modal-backdrop--visible');
            document.body.style.overflow = 'hidden';
            
            setTimeout(() => {
              const input = document.getElementById('modal-tweet-input');
              if (input) input.focus();
            }, 100);
          }
        });
      }
    });
    
    // Close tweet modal
    const closeBtn = document.getElementById('tweet-modal-close');
    if (closeBtn && backdrop) {
      closeBtn.addEventListener('click', () => {
        backdrop.classList.remove('modal-backdrop--visible');
        document.body.style.overflow = '';
      });
      
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) {
          backdrop.classList.remove('modal-backdrop--visible');
          document.body.style.overflow = '';
        }
      });
    }
    
    // Close login modal
    const loginCloseBtn = document.getElementById('login-modal-close');
    const loginBackdrop = document.getElementById('login-modal-backdrop');
    if (loginCloseBtn && loginBackdrop) {
      loginCloseBtn.addEventListener('click', () => {
        loginBackdrop.classList.remove('modal-backdrop--visible');
        document.body.style.overflow = '';
      });
      
      loginBackdrop.addEventListener('click', (e) => {
        if (e.target === loginBackdrop) {
          loginBackdrop.classList.remove('modal-backdrop--visible');
          document.body.style.overflow = '';
        }
      });
    }
    
    // Escape to close modals
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        [backdrop, loginBackdrop].forEach(bd => {
          if (bd && bd.classList.contains('modal-backdrop--visible')) {
            bd.classList.remove('modal-backdrop--visible');
            document.body.style.overflow = '';
          }
        });
      }
    });
  }

  // ============================================
  // MODAL COMPOSER
  // ============================================
  function initModalComposer() {
    const textarea = document.getElementById('modal-tweet-input');
    const counter = document.getElementById('modal-char-counter');
    const btn = document.getElementById('modal-tweet-btn');
    
    if (!textarea || !counter || !btn) return;
    
    function updateModalComposer() {
      const length = textarea.value.length;
      const remaining = 280 - length;
      
      counter.textContent = remaining;
      btn.disabled = length === 0 || length > 280;
      
      counter.classList.remove('composer__counter--warn', 'composer__counter--error');
      if (remaining <= 20 && remaining > 0) {
        counter.classList.add('composer__counter--warn');
      } else if (remaining <= 0) {
        counter.classList.add('composer__counter--error');
      }
    }
    
    textarea.addEventListener('input', updateModalComposer);
    
    btn.addEventListener('click', function() {
      const text = textarea.value.trim();
      if (!text) return;
      
      const newTweet = {
        id: Date.now(),
        name: 'Mahlatse',
        handle: '@mahlatse_dev',
        time: 'now',
        text: text,
        avatar: 'linear-gradient(135deg, #1a7a5e, #7c3aed)',
        likes: 0,
        retweets: 0,
        replies: 0,
        liked: false,
        retweeted: false
      };
      
      TWEET_DATA.unshift(newTweet);
      
      const feed = document.getElementById('tweet-feed');
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = renderTweet(newTweet);
      const newTweetEl = tempDiv.firstElementChild;
      feed.insertBefore(newTweetEl, feed.firstChild);
      
      textarea.value = '';
      updateModalComposer();
      
      const backdrop = document.getElementById('tweet-modal-backdrop');
      if (backdrop) {
        backdrop.classList.remove('modal-backdrop--visible');
        document.body.style.overflow = '';
      }
      
      Toast.show('Tweet posted successfully!', 'success');
    });
  }

  // ============================================
  // LOGIN MODAL FORM
  // ============================================
  function initLoginModalForm() {
    const form = document.getElementById('login-modal-form');
    if (!form) return;
    
    const emailInput = document.getElementById('login-modal-email');
    const passwordInput = document.getElementById('login-modal-password');
    const emailError = document.getElementById('login-modal-email-error');
    const passwordError = document.getElementById('login-modal-password-error');
    const submitBtn = document.getElementById('login-modal-submit');
    const toggleBtn = document.getElementById('login-modal-toggle-password');
    const eyeIcon = document.getElementById('login-modal-eye-icon');
    
    // Password visibility toggle
    if (toggleBtn && eyeIcon) {
      toggleBtn.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        if (type === 'text') {
          eyeIcon.innerHTML = '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line>';
        } else {
          eyeIcon.innerHTML = '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>';
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
        return true;
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
        return true;
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
        if (!emailValid) emailInput.focus();
        else passwordInput.focus();
        return;
      }
      
      // Show loading state
      submitBtn.disabled = true;
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<span class="btn-login__spinner"></span><span>Signing in...</span>';
      
      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        const backdrop = document.getElementById('login-modal-backdrop');
        if (backdrop) {
          backdrop.classList.remove('modal-backdrop--visible');
          document.body.style.overflow = '';
        }
        
        Toast.show('Welcome back, Mahlatse! 🎉', 'success');
        form.reset();
      }, 1500);
    });
  }

  // ============================================
  // BOTTOM NAV
  // ============================================
  function initBottomNav() {
    const items = document.querySelectorAll('.bottom-nav__item');
    items.forEach(item => {
      item.addEventListener('click', function(e) {
        if (this.getAttribute('href') === '#') {
          e.preventDefault();
          const label = this.getAttribute('aria-label');
          Toast.show(`${label} — coming soon!`, 'info');
        }
      });
    });
  }

  // ============================================
  // INITIALIZATION
  // ============================================
  function init() {
    Toast.init();
    initSkeletonLoading();
    initComposer();
    initModalComposer();
    initLoginModalForm();
    initTabs();
    initSearch();
    initFollowButtons();
    initNavItems();
    initLoginModalTrigger();
    initModalTriggers();
    initBottomNav();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();