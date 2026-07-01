import { initModal } from './modal.js';

// ============================================
// Data: Realistic Tweets
// ============================================
const tweetsData = [
  {
    id: 1,
    name: 'Sipho Codes',
    handle: '@siphocodes',
    avatar: 'S',
    avatarColor: '#e1306c',
    time: '2h',
    content: 'Just spent 3 hours debugging a CSS layout issue. Turns out it was a missing `}` in the media query. Coffee is the only thing keeping me going right now. ☕ #CSS #WebDev',
    likes: 24,
    retweets: 5,
    replies: 3,
    liked: false,
    retweeted: false
  },
  {
    id: 2,
    name: 'Amina Dev',
    handle: '@aminadev',
    avatar: 'A',
    avatarColor: '#833ab4',
    time: '4h',
    content: 'Semantic HTML is not optional. If you are using a `div` for a button, you are making the web less accessible for everyone. Use the right tag. It matters. #A11y #HTML',
    likes: 156,
    retweets: 42,
    replies: 18,
    liked: false,
    retweeted: false
  },
  {
    id: 3,
    name: 'Jake Frontend',
    handle: '@jakefrontend',
    avatar: 'J',
    avatarColor: '#f77737',
    time: '5h',
    content: 'Responsive design is not just about media queries. It is about flexible grids, fluid images, and a mindset that embraces the unpredictability of the web. #RWD #Frontend',
    likes: 89,
    retweets: 31,
    replies: 7,
    liked: false,
    retweeted: false
  },
  {
    id: 4,
    name: 'Tumi Learns',
    handle: '@tumilearns',
    avatar: 'T',
    avatarColor: '#405de6',
    time: '6h',
    content: 'Day 47 of learning JavaScript. Finally understood closures. It clicked when I stopped trying to memorize the definition and started tracing the scope chain. #JavaScript #LearningInPublic',
    likes: 312,
    retweets: 78,
    replies: 45,
    liked: false,
    retweeted: false
  },
  {
    id: 5,
    name: 'Lerato UX',
    handle: '@leratoux',
    avatar: 'L',
    avatarColor: '#c13584',
    time: '8h',
    content: 'Micro-interactions are the difference between a good product and a great one. That subtle button hover, the smooth transition, the loading state. Users feel it. #UX #Design',
    likes: 201,
    retweets: 56,
    replies: 12,
    liked: false,
    retweeted: false
  },
  {
    id: 6,
    name: 'David Grid',
    handle: '@davidgrid',
    avatar: 'D',
    avatarColor: '#0095f6',
    time: '10h',
    content: 'CSS Grid makes complex layouts so much simpler. If you are still fighting with floats for your main page structure, it is time to let go. #CSS #Layout',
    likes: 134,
    retweets: 29,
    replies: 8,
    liked: false,
    retweeted: false
  },
  {
    id: 7,
    name: 'Nandi Accessibility',
    handle: '@nandia11y',
    avatar: 'N',
    avatarColor: '#00ba7c',
    time: '12h',
    content: 'Keyboard navigation is not an edge case. Power users, developers, and many people with motor disabilities rely on it. Test your site with just a keyboard. #A11y #InclusiveDesign',
    likes: 267,
    retweets: 94,
    replies: 22,
    liked: false,
    retweeted: false
  },
  {
    id: 8,
    name: 'Thabo Scripts',
    handle: '@thaboscripts',
    avatar: 'T',
    avatarColor: '#ffad1f',
    time: '14h',
    content: 'Vanilla JavaScript is underrated. Before reaching for a framework, ask yourself: can the DOM API do this in 10 lines? Often, the answer is yes. #JavaScript #VanillaJS',
    likes: 445,
    retweets: 112,
    replies: 34,
    liked: false,
    retweeted: false
  },
  {
    id: 9,
    name: 'Grace UI',
    handle: '@graceui',
    avatar: 'G',
    avatarColor: '#f42e78',
    time: '16h',
    content: 'Consistency is the key to clean UI. If your button radius is 8px on one page, do not make it 12px on another. Design tokens save lives. #UI #DesignSystems',
    likes: 178,
    retweets: 41,
    replies: 9,
    liked: false,
    retweeted: false
  },
  {
    id: 10,
    name: 'Kabelo Coffee',
    handle: '@kabelocoffee',
    avatar: 'K',
    avatarColor: '#6d4c41',
    time: '18h',
    content: 'Fourth cup of coffee today. My commit messages are getting increasingly poetic. "Fixed the thing with the stuff. Refactored the dreams." #Coffee #DevLife',
    likes: 89,
    retweets: 23,
    replies: 15,
    liked: false,
    retweeted: false
  },
  {
    id: 11,
    name: 'Zanele Responsive',
    handle: '@zanelerwd',
    avatar: 'Z',
    avatarColor: '#0088cc',
    time: '20h',
    content: 'Tested my portfolio on a 320px wide screen today. It is humbling. It forces you to rethink your priorities and your markup. Mobile first is not a buzzword. #RWD #MobileFirst',
    likes: 198,
    retweets: 67,
    replies: 14,
    liked: false,
    retweeted: false
  },
  {
    id: 12,
    name: 'Peter Performance',
    handle: '@peterperf',
    avatar: 'P',
    avatarColor: '#34a853',
    time: '22h',
    content: 'If you are animating `width` and `height`, you are causing layout thrashing. Use `transform` and `opacity`. Your users\' frames will thank you. #Performance #CSS',
    likes: 334,
    retweets: 88,
    replies: 19,
    liked: false,
    retweeted: false
  },
  {
    id: 13,
    name: 'Lebo HTML',
    handle: '@lebohtml',
    avatar: 'L',
    avatarColor: '#e34f26',
    time: '1d',
    content: 'The `<details>` and `<summary>` elements are pure HTML magic. No JavaScript required for a fully functional accordion. Native semantics win every time. #HTML #SemanticWeb',
    likes: 421,
    retweets: 134,
    replies: 28,
    liked: false,
    retweeted: false
  },
  {
    id: 14,
    name: 'Sarah Learns',
    handle: '@sarahlearns',
    avatar: 'S',
    avatarColor: '#7952b3',
    time: '1d',
    content: 'Learning one bug at a time. Today\'s lesson: `event.preventDefault()` is your friend when you are handling form submissions with JavaScript. #LearningInPublic #JavaScript',
    likes: 156,
    retweets: 37,
    replies: 11,
    liked: false,
    retweeted: false
  },
  {
    id: 15,
    name: 'Mike Frontend',
    handle: '@mikefrontend',
    avatar: 'M',
    avatarColor: '#61dafb',
    time: '2d',
    content: 'Frontend development is 20% writing code and 80% trying to figure out why the code you wrote yesterday does not work today. Still love it though. #Frontend #DevLife',
    likes: 567,
    retweets: 145,
    replies: 52,
    liked: false,
    retweeted: false
  }
];

// ============================================
// Application State
// ============================================
const AppState = {
  tweets: [],
  filter: ''
};

// ============================================
// DOM References
// ============================================
const tweetFeed = document.getElementById('tweet-feed');
const skeletonLoader = document.getElementById('skeleton-loader');
const emptyState = document.getElementById('empty-state');
const searchInput = document.getElementById('search-input');
const searchSuggestions = document.getElementById('search-suggestions');
const composerTextarea = document.getElementById('tweet-input');
const composerCounter = document.getElementById('composer-counter');
const composerSubmit = document.getElementById('composer-submit');

// ============================================
// Initialization
// ============================================
function init() {
  AppState.tweets = [...tweetsData];

  // Simulate loading delay for skeleton screen UX
  skeletonLoader.hidden = false;
  tweetFeed.innerHTML = '';
  emptyState.hidden = true;
  tweetFeed.setAttribute('aria-busy', 'true');

  setTimeout(() => {
    skeletonLoader.hidden = true;
    renderTweets();
    tweetFeed.setAttribute('aria-busy', 'false');
  }, 800);

  // Initialize AI-assisted Feature 3: Tweet Modal
  initModal((text) => addTweet(text));

  // Setup main page composer
  setupComposer();

  // Setup search functionality
  setupSearch();

  // Setup interactive developer stats
  setupDevStats();
}

// ============================================
// Tweet Rendering
// ============================================
function renderTweets() {
  const query = AppState.filter.toLowerCase();
  const filtered = AppState.tweets.filter((t) => {
    return (
      t.content.toLowerCase().includes(query) ||
      t.name.toLowerCase().includes(query) ||
      t.handle.toLowerCase().includes(query)
    );
  });

  if (filtered.length === 0) {
    tweetFeed.innerHTML = '';
    emptyState.hidden = false;
    return;
  }

  emptyState.hidden = true;
  tweetFeed.innerHTML = '';

  const fragment = document.createDocumentFragment();
  filtered.forEach((tweet) => {
    fragment.appendChild(createTweetElement(tweet));
  });
  tweetFeed.appendChild(fragment);
}

function createTweetElement(tweet) {
  const article = document.createElement('article');
  article.className = 'tweet-card';
  article.setAttribute('aria-label', `Tweet from ${escapeHtml(tweet.name)}`);
  article.dataset.id = tweet.id;

  article.innerHTML = `
    <div class="avatar avatar-sm" style="background-color: ${escapeHtml(tweet.avatarColor)}" aria-hidden="true">${escapeHtml(tweet.avatar)}</div>
    <div class="tweet-card-content">
      <div class="tweet-header">
        <span class="tweet-name">${escapeHtml(tweet.name)}</span>
        <span class="tweet-handle">${escapeHtml(tweet.handle)}</span>
        <span class="tweet-time">· ${escapeHtml(tweet.time)}</span>
      </div>
      <p class="tweet-text">${escapeHtml(tweet.content)}</p>
      <div class="tweet-actions" role="group" aria-label="Tweet actions for tweet by ${escapeHtml(tweet.name)}">
        <button class="tweet-action-btn" aria-label="Reply to tweet" title="Reply">
          <i class="bi bi-chat" aria-hidden="true"></i>
          <span>${formatCount(tweet.replies)}</span>
        </button>
        <button class="tweet-action-btn ${tweet.retweeted ? 'retweeted' : ''}" data-action="retweet" aria-label="${tweet.retweeted ? 'Undo retweet' : 'Retweet'}" title="Retweet">
          <i class="bi bi-repeat" aria-hidden="true"></i>
          <span data-count="retweets">${formatCount(tweet.retweets)}</span>
        </button>
        <button class="tweet-action-btn ${tweet.liked ? 'liked' : ''}" data-action="like" aria-label="${tweet.liked ? 'Unlike tweet' : 'Like tweet'}" title="Like">
          <i class="bi ${tweet.liked ? 'bi-heart-fill' : 'bi-heart'}" aria-hidden="true"></i>
          <span data-count="likes">${formatCount(tweet.likes)}</span>
        </button>
        <button class="tweet-action-btn" aria-label="Share tweet" title="Share">
          <i class="bi bi-upload" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  `;

  const likeBtn = article.querySelector('[data-action="like"]');
  const retweetBtn = article.querySelector('[data-action="retweet"]');

  likeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleLike(tweet.id);
  });

  retweetBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleRetweet(tweet.id);
  });

  return article;
}

function toggleLike(id) {
  const tweet = AppState.tweets.find((t) => t.id === id);
  if (!tweet) return;
  tweet.liked = !tweet.liked;
  tweet.likes += tweet.liked ? 1 : -1;

  // Update DOM in-place to preserve focus and avoid layout thrashing
  const card = document.querySelector(`.tweet-card[data-id="${id}"]`);
  if (card) {
    const likeBtn = card.querySelector('[data-action="like"]');
    const countSpan = card.querySelector('[data-count="likes"]');
    const icon = likeBtn.querySelector('i');

    if (tweet.liked) {
      likeBtn.classList.add('liked');
      likeBtn.setAttribute('aria-label', 'Unlike tweet');
      icon.className = 'bi bi-heart-fill';
    } else {
      likeBtn.classList.remove('liked');
      likeBtn.setAttribute('aria-label', 'Like tweet');
      icon.className = 'bi bi-heart';
    }
    if (countSpan) countSpan.textContent = formatCount(tweet.likes);
  }
}

function toggleRetweet(id) {
  const tweet = AppState.tweets.find((t) => t.id === id);
  if (!tweet) return;
  tweet.retweeted = !tweet.retweeted;
  tweet.retweets += tweet.retweeted ? 1 : -1;

  // Update DOM in-place to preserve focus
  const card = document.querySelector(`.tweet-card[data-id="${id}"]`);
  if (card) {
    const retweetBtn = card.querySelector('[data-action="retweet"]');
    const countSpan = card.querySelector('[data-count="retweets"]');

    if (tweet.retweeted) {
      retweetBtn.classList.add('retweeted');
      retweetBtn.setAttribute('aria-label', 'Undo retweet');
    } else {
      retweetBtn.classList.remove('retweeted');
      retweetBtn.setAttribute('aria-label', 'Retweet');
    }
    if (countSpan) countSpan.textContent = formatCount(tweet.retweets);
  }
}

function addTweet(text) {
  const newTweet = {
    id: Date.now(),
    name: 'Mahlatse',
    handle: '@mahlatse_dev',
    avatar: 'M',
    avatarColor: '#1d9bf0',
    time: 'now',
    content: text,
    likes: 0,
    retweets: 0,
    replies: 0,
    liked: false,
    retweeted: false
  };
  AppState.tweets.unshift(newTweet);

  // Prepend to DOM instead of full re-render
  const el = createTweetElement(newTweet);
  tweetFeed.insertBefore(el, tweetFeed.firstChild);
  emptyState.hidden = true;
}

// ============================================
// Composer
// ============================================
function setupComposer() {
  composerTextarea.addEventListener('input', () => {
    const len = composerTextarea.value.length;
    composerCounter.textContent = `${len}/280`;
    composerSubmit.disabled = len === 0 || len > 280;

    composerCounter.classList.remove('warning', 'danger');
    if (len > 280) {
      composerCounter.classList.add('danger');
    } else if (len >= 260) {
      composerCounter.classList.add('warning');
    }

    // Auto-resize
    composerTextarea.style.height = 'auto';
    composerTextarea.style.height = composerTextarea.scrollHeight + 'px';
  });

  composerSubmit.addEventListener('click', () => {
    const text = composerTextarea.value.trim();
    if (!text || text.length > 280) return;

    addTweet(text);
    composerTextarea.value = '';
    composerCounter.textContent = '0/280';
    composerSubmit.disabled = true;
    composerTextarea.style.height = 'auto';
    showToast('Tweet sent!', 'success');
  });
}

// ============================================
// Search
// ============================================
function setupSearch() {
  searchInput.addEventListener('input', (e) => {
    AppState.filter = e.target.value.trim();
    renderTweets();

    if (AppState.filter.length > 0) {
      searchSuggestions.hidden = false;
    } else {
      searchSuggestions.hidden = true;
    }
  });

  searchInput.addEventListener('focus', () => {
    if (searchInput.value.trim().length > 0) {
      searchSuggestions.hidden = false;
    }
  });

  document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !searchSuggestions.contains(e.target)) {
      searchSuggestions.hidden = true;
    }
  });
}

// ============================================
// Developer Stats (Interactive)
// ============================================
function setupDevStats() {
  const coffeeStat = document.querySelector('.stats-list .stat-item:last-child dd');
  if (coffeeStat) {
    coffeeStat.style.cursor = 'pointer';
    coffeeStat.setAttribute('title', 'Click to drink more coffee!');
    coffeeStat.setAttribute('role', 'button');
    coffeeStat.setAttribute('tabindex', '0');
    coffeeStat.setAttribute('aria-label', 'Current coffee count: 3 cups. Click to add another.');

    function incrementCoffee() {
      let count = parseInt(coffeeStat.textContent) || 0;
      count++;
      coffeeStat.textContent = count + (count === 1 ? ' cup' : ' cups');
      coffeeStat.setAttribute('aria-label', `Current coffee count: ${count} cups. Click to add another.`);
      showToast('Coffee count updated! ☕', 'info');
    }

    coffeeStat.addEventListener('click', incrementCoffee);
    coffeeStat.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        incrementCoffee();
      }
    });
  }
}

// ============================================
// Toast Notification System
// ============================================
export function showToast(message, type = 'info') {
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

// ============================================
// Utilities
// ============================================
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function formatCount(num) {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
}

// ============================================
// Start Application
// ============================================
init();
