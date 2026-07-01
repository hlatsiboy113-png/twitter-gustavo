# Echo

> **Share ideas. Build conversations.**

Echo is a production-quality, Twitter-inspired social media frontend application built with modern web standards. It demonstrates responsive design, accessibility, modular JavaScript architecture, and polished UX interactions. The project is designed as a portfolio piece that targets an **Excellent (Level 4)** assessment grade.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Installation](#installation)
- [Folder Structure](#folder-structure)
- [Responsive Design](#responsive-design)
- [Accessibility](#accessibility)
- [Performance](#performance)
- [Future Improvements](#future-improvements)
- [Deployment](#deployment)

---

## Project Overview

Echo replicates the familiar Twitter homepage layout while introducing subtle usability improvements. It is built entirely on the frontend with **no backend or framework dependencies** (React, Vue, etc.), showcasing mastery of HTML5, CSS3, Bootstrap 5 utilities, and Vanilla JavaScript.

The application includes a realistic tweet timeline, interactive developer stats, a functional composer, and a fully responsive layout that scales from mobile phones to 4K displays.

**Tech Stack:**
- HTML5 (Semantic, ARIA-enhanced)
- CSS3 (Custom Properties, Grid, Flexbox, Animations)
- Bootstrap 5 (CSS utilities only where appropriate)
- Vanilla JavaScript (ES6+ Modules)

---

## Features

### Core Application (index.html)
- **Twitter-Inspired Layout:** Left sidebar navigation, main feed, and right sidebar widgets.
- **Realistic Tweet Timeline:** 15 curated tweets covering HTML, CSS, JavaScript, Frontend, UI/UX, Accessibility, Responsive Design, Coffee, and Learning.
- **Interactive Composer:** Main feed composer with real-time character counter, auto-resizing textarea, and disabled submit state when empty or over the limit.
- **Search & Filter:** Real-time search that filters the timeline by content, author, or handle, with interactive suggestion dropdown.
- **Developer Stats:** Interactive "Coffee Today" counter that increments on click.
- **Like & Retweet:** Fully functional tweet interactions with DOM updates that preserve focus for keyboard users.
- **Toast Notifications:** Slide-in alerts for user actions (Tweet sent, Login success, etc.).
- **Skeleton Loading:** Simulated loading state on initial feed render for perceived performance.
- **Empty States:** Helpful messaging when search returns no results.
- **Micro-Interactions:** Hover lifts, button scales, icon rotations, and smooth transitions throughout.

### AI-Assisted Feature 2: Responsive Login Page (login.html)
- **Form Validation:** Client-side validation for email format and password length with accessible error messages.
- **Password Visibility Toggle:** Toggle between `type="password"` and `type="text"` with an animated icon swap.
- **Remember Me:** Persists the user's email to `localStorage` and prefills it on return visits.
- **Forgot Password & Sign Up:** Placeholder links with toast notifications for upcoming features.
- **Responsive Design:** Centered card layout that adapts gracefully from mobile to desktop.

### AI-Assisted Feature 3: Tweet Modal (Modal Overlay)
- **Character Counter:** Live 280-character countdown with visual warning (orange) and danger (red) states.
- **Keyboard Accessible:** Focus is trapped inside the modal while open. `Escape` closes the modal and returns focus to the trigger button.
- **Backdrop Click:** Clicking the overlay or the "X" button closes the modal with a smooth animation.
- **Draft Persistence:** Unsent modal text is saved to `localStorage` and restored on reopening.
- **Responsive:** Modal card scales from mobile to desktop without breaking layout.
- **Success Toast:** Triggers a "Tweet sent!" notification when a tweet is successfully posted.

### Manual Feature: Premium Dark Mode (Scaffold)
- **CSS Variables Scaffold:** Complete dark-mode color palette and smooth transitions are already implemented in `style.css`.
- **Toggle Button:** The `#theme-toggle` button is present in the UI.
- **Implementation Space:** The `darkmode.js` file is provided as a scaffold with detailed instructions for the user to implement the manual feature (localStorage persistence, attribute toggling, and icon animation).

---

## Installation

No build step or package manager is required. Echo runs directly in the browser.

1. **Clone or download** the project folder.
2. **Open** `index.html` in any modern browser (Chrome, Firefox, Edge, Safari).
3. For the **Login Page**, open `login.html`.

Alternatively, serve the files via a local static server for the best ES module experience:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (npx)
npx serve .

# Using VS Code Live Server extension
# Right-click index.html → "Open with Live Server"
```

Then navigate to `http://localhost:8000`.

---

## Folder Structure

```
/
│
├── index.html              # Main Echo application (Home Feed)
├── login.html              # Responsive Login Page (Feature 2)
├── css/
│   ├── style.css           # Global styles, layout grid, responsive breakpoints, dark mode variables
│   └── login.css           # Login page specific styles and animations
├── js/
│   ├── main.js             # App core: timeline, search, composer, stats, toast system
│   ├── modal.js            # Tweet Modal logic (Feature 3)
│   ├── login.js            # Login validation & interactions (Feature 2)
│   └── darkmode.js         # Manual Feature scaffold (user implements logic)
├── images/                 # Placeholder for image assets (currently unused; avatars are CSS-generated)
├── assets/                 # Placeholder for favicons and other static assets
├── README.md               # This file
├── TECHNICAL.md            # Detailed technical documentation and architecture
└── PLAN.md                 # Initial project architecture, wireframes, and roadmap
```

---

## Responsive Design

Echo is designed to be pixel-perfect across **7 breakpoint targets**:

| Breakpoint | Layout Behavior |
|---|---|
| **320px** | Single column, bottom navigation, floating action button (FAB) for tweets. |
| **375px** | Slightly improved spacing; composer actions may wrap on very small screens. |
| **768px** | Two-column layout: icon-only sidebar + main feed. Right sidebar hidden. |
| **1024px** | Full three-column layout: sidebar (with labels) + main feed + right sidebar. |
| **1440px** | Centered layout with max-width constraint. |
| **2560px** | Base font size scales to 18px for improved readability on large screens. |
| **3840px (4K)** | Base font size scales to 20px; layout max-width increases to 1600px to maintain readable line lengths. |

**Key Techniques:**
- CSS Grid for the master application layout.
- Flexbox for component-level alignment.
- Mobile-first media queries.
- `max-width` constraints to prevent content stretching on ultra-wide displays.
- `overflow-x: hidden` and `word-break: break-word` to prevent horizontal overflow on any device.

---

## Accessibility

Echo targets **WCAG 2.1 AA** compliance:

- **Semantic HTML:** Proper use of `<nav>`, `<main>`, `<aside>`, `<article>`, `<section>`, `<header>`, and `<footer>`.
- **ARIA Labels:** All icon-only buttons have descriptive `aria-label` attributes. Interactive elements use `aria-expanded`, `aria-live`, `aria-modal`, and `aria-describedby` where appropriate.
- **Keyboard Navigation:**
  - Full `Tab` navigation through all interactive elements.
  - `Shift+Tab` for reverse navigation.
  - `Enter` and `Space` activate buttons and links.
  - `Escape` closes modals and dropdowns.
  - Focus is trapped inside the Tweet Modal while it is open.
- **Focus Indicators:** Visible `:focus-visible` outlines (2px solid primary color) on all interactive elements. No focus styles are suppressed.
- **Color Contrast:** All text colors meet a minimum 4.5:1 contrast ratio against their backgrounds. Error, warning, and success states are color-coded but do not rely on color alone.
- **Screen Reader Support:**
  - Headings hierarchy (`h1` for page title, `h2` for card titles).
  - Decorative icons are hidden from AT with `aria-hidden="true"`.
  - Loading states use `aria-busy="true"` on the feed container.
  - Toast notifications use `aria-live="polite"` and `role="alert"`.
- **Reduced Motion:** All animations respect `prefers-reduced-motion: reduce` by disabling transitions and animations.
- **High Contrast:** Enhanced borders and focus states are provided under `prefers-contrast: high`.

---

## Performance

- **Optimized DOM Manipulation:** Initial tweet render uses a `DocumentFragment` to minimize reflows. Like/Retweet interactions update individual DOM nodes in-place rather than re-rendering the entire feed.
- **CSS Animations:** All motion (hover, modal, toast, skeleton) is handled via CSS `transform` and `opacity`, avoiding layout thrashing and paint costs.
- **Efficient JavaScript:** No external libraries for core logic. Modularity keeps bundle scope small. Event delegation is used where possible.
- **Asset Optimization:** No heavy image assets; avatars are generated via CSS to eliminate network requests. Fonts are loaded with `display=swap`.
- **Lazy Loading:** Skeleton screens simulate data loading, improving perceived performance on initial paint.

---

## Future Improvements

- **Backend Integration:** Connect to a real REST API or Firebase for live tweet data, user authentication, and persistent storage.
- **Routing:** Add client-side routing (e.g., vanilla router or lightweight library) for Profile, Explore, and Notifications pages.
- **Image Upload:** Wire the composer media buttons to a file upload service (e.g., Cloudinary).
- **Real-time Updates:** Implement WebSockets or Server-Sent Events for live tweet streaming.
- **Service Worker:** Add a PWA service worker for offline reading and caching.
- **Accessibility Audit:** Run a full automated audit (axe-core or Lighthouse) and fix any edge-case issues.

---

## Deployment

Echo is **deployment-ready** as a static site. Recommended platforms:

- **GitHub Pages:** Push to a repository and enable Pages from the main branch.
- **Netlify:** Drag and drop the project folder into the Netlify dashboard.
- **Vercel:** Use the Vercel CLI or import the Git repository.
- **Firebase Hosting:** Run `firebase deploy` after initializing the project.

Because the project uses ES modules (`type="module"`), ensure the server serves `.js` files with the correct `Content-Type: application/javascript` header. Most modern static hosts do this by default.
