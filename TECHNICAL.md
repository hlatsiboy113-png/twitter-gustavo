# Echo — Technical Documentation

This document provides an in-depth technical reference for the Echo application. It covers the architecture, component design, state management, and internal API surface for developers who need to maintain or extend the project.

---

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [Component Breakdown](#component-breakdown)
- [State Management](#state-management)
- [Event Handling](#event-handling)
- [Data Flow](#data-flow)
- [Internal API Reference](#internal-api-reference)
- [Build & Deployment Notes](#build--deployment-notes)

---

## Architecture Overview

Echo follows a **modular, vanilla JavaScript architecture** with clear separation of concerns:

| Layer | Responsibility |
|---|---|
| **HTML** | Semantic structure, accessibility roles, and static content. |
| **CSS** | Design tokens (variables), layout grid, component styling, and responsive breakpoints. |
| **JavaScript** | Application state, DOM manipulation, user interactions, and feature logic. |

There are **no external UI frameworks** (React, Vue, Angular). The project relies on native web APIs and a small set of external resources:
- Bootstrap 5 CSS (for utility classes like `.visually-hidden`)
- Bootstrap Icons (SVG icon font)
- Google Fonts (Inter)

The JavaScript is split into **ES modules** (`main.js`, `modal.js`) and **standalone scripts** (`login.js`, `darkmode.js`) to match the page-level separation of concerns.

---

## Component Breakdown

### Layout Components

#### `.app-layout`
The root grid container. Uses CSS Grid to manage the three-column layout (Left Sidebar, Main Content, Right Sidebar). The grid template adapts at each breakpoint:
- **Mobile:** `1fr` (single column)
- **Tablet:** `var(--sidebar-width-tablet) 1fr` (sidebar icons + feed)
- **Desktop:** `var(--sidebar-width) 1fr var(--right-sidebar-width)` (full layout)

#### `.sidebar-left`
Sticky navigation rail containing the logo, primary nav links, tweet CTA, and user profile summary. Collapses to a bottom nav bar on mobile via `.mobile-nav`.

#### `.main-content`
The scrollable feed container. Includes a sticky header, the composer, and the tweet list. Constrained to `max-width: 600px` to maintain readable line lengths.

#### `.sidebar-right`
Sticky secondary panel containing Search, Trending, and Developer Stats. Hidden on tablet and mobile.

#### `.mobile-nav`
Fixed bottom navigation bar for mobile devices. Provides access to Home, Explore, Notifications, Messages, and Profile.

#### `.fab-tweet`
Fixed floating action button on mobile that triggers the Tweet Modal.

### Content Components

#### `.composer`
The main-page tweet input. Contains:
- Auto-resizing `<textarea>` with `maxlength="280"`
- Character counter (`#composer-counter`) with warning/danger thresholds
- Media action icons (decorative)
- Submit button that is disabled when empty or over the limit

#### `.tweet-feed`
A container that receives dynamically generated `<article class="tweet-card">` elements. Each card contains:
- Avatar (CSS-generated colored circle)
- Author name, handle, and relative timestamp
- Tweet text (escaped HTML)
- Action bar: Reply, Retweet, Like, Share

#### `.tweet-modal`
A custom modal overlay (`role="dialog"`, `aria-modal="true"`) that reuses the composer UX pattern. It includes:
- Focus trap for keyboard accessibility
- Backdrop click and Escape key dismissal
- Animated open/close transitions
- Draft persistence to `localStorage`

---

## State Management

State is managed via a lightweight **in-memory object** (`AppState`) in `main.js`. There is no external state library.

```javascript
const AppState = {
  tweets: [],    // Array of tweet objects
  filter: ''     // Current search query string
};
```

### Persistence Strategy
- **No server:** All data is static or generated in the browser.
- **localStorage keys:**
  - `echo_remember_email` — Stores the email address when "Remember Me" is checked on the login page.
  - `echo_tweet_draft` — Saves the current modal textarea content so the user does not lose progress if the modal is closed accidentally.
  - `echo_dark_mode` — **Reserved for the manual feature.** The user implements the logic to read/write this key.

### Mutations
State is mutated directly in place (e.g., `tweet.liked = !tweet.liked`). Because the dataset is small (~15–20 tweets), the overhead of immutability is not warranted. After mutation, the DOM is updated in-place for performance and accessibility.

---

## Event Handling

### Global Events
- **`DOMContentLoaded`** — Kicks off `init()` in `main.js` and sets up all listeners.
- **`click`** (document-level) — Closes the search suggestions dropdown when clicking outside.
- **`keydown`** (modal-level) — Handles `Escape` to close and `Tab` to trap focus.

### Component Events
- **Composer Input** — `input` event on `#tweet-input` updates the counter, toggles the submit button state, and auto-resizes the textarea.
- **Search Input** — `input` event on `#search-input` updates `AppState.filter` and calls `renderTweets()`.
- **Like / Retweet** — `click` events on individual tweet action buttons. They call `toggleLike(id)` or `toggleRetweet(id)`, which update the DOM node directly.
- **Tweet Modal Submit** — `click` event on `#modal-submit` validates the textarea, calls the `onTweetSubmit` callback provided by `main.js`, and triggers a success toast.

### Event Delegation vs. Direct Binding
- **Direct binding** is used for Like/Retweet buttons inside each tweet card. Because the tweet list is filtered and re-rendered on search, direct binding is re-attached during card creation. This is simpler than managing a delegated listener that must understand dynamic state.
- **No delegation** is used for the modal or composer because their elements are static in the DOM.

---

## Data Flow

### Initial Load
1. `main.js` copies the static `tweetsData` array into `AppState.tweets`.
2. The skeleton loader is shown.
3. After an 800ms simulated delay, `skeletonLoader` is hidden and `renderTweets()` is called.
4. `renderTweets()` filters `AppState.tweets` by `AppState.filter`, creates a `DocumentFragment`, appends tweet cards, and injects the fragment into the DOM.

### Adding a Tweet (Main Composer)
1. User clicks the main composer "Tweet" button.
2. `addTweet(text)` is called.
3. A new tweet object is created and pushed to the front of `AppState.tweets`.
4. A new DOM element is created via `createTweetElement()` and inserted at the top of the feed.
5. The composer is cleared and a success toast is shown.

### Adding a Tweet (Modal)
1. User clicks a "Tweet" trigger (sidebar button or mobile FAB).
2. `modal.js` opens the overlay, restores any draft, and focuses the textarea.
3. User types and clicks "Tweet" inside the modal.
4. `modal.js` validates the text, calls the `onTweetSubmit` callback (which points to `addTweet` in `main.js`), and closes the modal.
5. The toast is shown from `modal.js` scope.

### Search
1. User types in the right sidebar search box.
2. `AppState.filter` is updated.
3. `renderTweets()` is called.
4. The feed is cleared and re-rendered with the filtered subset.
5. If no results match, the `.empty-state` component is shown.

---

## Internal API Reference

### `main.js`

#### `init()`
Initializes the application. Loads data, shows the skeleton, wires up the modal, composer, search, and developer stats.

#### `renderTweets()`
Filters `AppState.tweets` by `AppState.filter` and repaints the entire feed. Uses `DocumentFragment` for efficiency.

#### `createTweetElement(tweet)`
Factory function that returns an `<article>` DOM node for a given tweet object. Attaches event listeners for Like and Retweet.

#### `toggleLike(id)`
Toggles the `liked` state and increments/decrements the like count for a tweet. **Updates the DOM in-place** rather than calling `renderTweets()` to preserve focus.

#### `toggleRetweet(id)`
Toggles the `retweeted` state and increments/decrements the retweet count. Updates the DOM in-place.

#### `addTweet(text)`
Creates a new tweet object, prepends it to `AppState.tweets`, and inserts the new DOM node at the top of the feed.

#### `setupComposer()`
Wires the main page composer textarea, counter, and submit button.

#### `setupSearch()`
Wires the search input and suggestion dropdown toggle logic.

#### `setupDevStats()`
Adds an interactive click handler to the "Coffee Today" stat, allowing users to increment the count.

#### `showToast(message, type)`
Global toast factory. Creates a slide-in notification element and auto-removes it after 3 seconds.

---

### `modal.js`

#### `initModal(onTweetSubmit)`
Sets up the modal behavior. Accepts a callback function that is invoked when the user successfully submits a tweet from the modal.

- **Open Triggers:** `#btn-sidebar-tweet`, `#btn-fab-tweet`
- **Close Triggers:** `#modal-close`, `.modal-backdrop`, `Escape` key
- **Focus Management:** Saves the trigger element, shifts focus to the textarea, and restores focus on close.
- **Draft Persistence:** Reads/writes `echo_tweet_draft` to `localStorage`.

---

### `login.js`

#### `validateEmail(email)`
Returns `true` if the email matches a standard RFC-like regex pattern.

#### `showError(input, errorEl, message)`
Adds the `.has-error` class to the parent `.form-group`, populates the error message, and sets `aria-invalid="true"`.

#### `clearError(input, errorEl)`
Removes the error state and clears the message.

#### `showToast(message, type)`
Self-contained toast helper for the login page.

---

### `darkmode.js`

**Scaffold only.** Contains a detailed comment block instructing the user how to implement the manual dark mode feature. The expected public API is:

- **Read:** `localStorage.getItem('echo_dark_mode')`
- **Write:** `localStorage.setItem('echo_dark_mode', 'dark' | 'light')`
- **Apply:** `document.documentElement.setAttribute('data-theme', 'dark')`

---

## Build & Deployment Notes

### Module System
`main.js` and `modal.js` are ES modules (`type="module"`). Browsers enforce strict CORS for modules, so opening `index.html` directly from the filesystem (`file://`) may cause a CORS error in some browsers. It is recommended to serve the project via a local static server (see `README.md` → Installation).

### No Build Step
There is no bundler, transpiler, or task runner. This keeps the project lightweight and immediately runnable. All modern browsers (Chrome 80+, Firefox 75+, Safari 13.1+, Edge 80+) support the ES module syntax and CSS features used.

### External Dependencies
The following CDN resources are loaded in the HTML `<head>`:
- `bootstrap@5.3.2` (CSS only — no JS bundle is strictly required for layout, but the JS bundle is included for utility classes like `.visually-hidden`)
- `bootstrap-icons@1.11.1`
- `Inter` font from Google Fonts

These are loaded from public CDNs. For offline or enterprise deployment, download the files and vendor them into `css/` and `js/` folders.

### Favicon
A favicon is not currently included. For production deployment, add an `images/favicon.ico` or `assets/favicon.png` and reference it in the `<head>`:
```html
<link rel="icon" type="image/png" href="assets/favicon.png">
```

---

*End of Technical Documentation.*
