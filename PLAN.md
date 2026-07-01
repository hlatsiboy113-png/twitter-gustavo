# Echo - Project Architecture & Plan

## 1. Assessment Rubric Analysis

To achieve an **Excellent (Level 4)** grade, the project must satisfy the following criteria with evidence:

| Criterion | Requirement | Strategy |
|---|---|---|
| **Accuracy** | Twitter homepage must be instantly recognizable. | Replicate the classic 3-column layout: Left Sidebar (Navigation), Main Feed (Composer + Timeline), Right Sidebar (Search + Trends). Use Twitter's visual language (borders, typography, iconography) with subtle improvements. |
| **Responsive Design** | Perfect on 320px, 375px, 768px, 1024px, 1440px, 2560px, 3840px. | Use a CSS Grid that collapses sidebars at breakpoints. Mobile: stack to single column with bottom nav. Tablet: hide right sidebar. Desktop: full 3-column. 4K: center content with max-width constraints to prevent excessive stretching. |
| **Clean UI** | Professional, minimal, modern, clean. | Implement an 8-point spacing system. Use CSS custom properties for colors and spacing. Consistent border-radius (8px, 9999px for pills). Soft, layered shadows. Inter or system-ui font stack. |
| **UX Quality** | Intuitive, feedback-rich, polished. | Implement disabled states for the tweet button, real-time character counter, toast notifications for actions, skeleton screens for simulated loading, hover effects on all interactive elements, and focus states for keyboard users. |
| **Manual Feature** | Premium Dark Mode. | **User implements this manually.** I will prepare the CSS custom properties (`:root` and `[data-theme="dark"]`) and the toggle button in HTML. The user will wire the toggle logic in `darkmode.js` to switch the attribute and persist to `localStorage`. |
| **AI-Assisted Feature 1** | Responsive Login Page. | Build `login.html` with form validation (HTML5 + JS), password visibility toggle, "Remember Me" checkbox, and "Forgot Password" link. Fully responsive. |
| **AI-Assisted Feature 2** | Tweet Modal. | Build a modal overlay triggered from the sidebar and main composer. Includes a textarea with a live 280-character counter, responsive layout, close animation, and a toast notification on success. |
| **Accessibility** | WCAG 2.1 AA compliance. | Semantic HTML (`<nav>`, `<main>`, `<article>`, `<aside>`). ARIA labels on icon buttons and navigation. Keyboard navigation (Escape to close modal, Tab trapping). Visible `:focus-visible` outlines. Color contrast ratios >= 4.5:1. |
| **Performance** | Fast, efficient, no jank. | Use CSS `transform` and `opacity` for animations. Minimize DOM manipulation by using `DocumentFragment` for tweet injection. Lazy load images. Use `prefers-reduced-motion` media query. |
| **Code Quality** | Maintainable, reusable, clean. | Modular JS (`main.js`, `modal.js`, `login.js`, `darkmode.js`). Reusable CSS variables. Descriptive BEM-like naming conventions. No inline styles. No duplicated logic. |
| **Deployment Readiness** | Works out of the box. | No external build steps. No backend required. All assets local or from reliable CDNs. Clean folder structure. |

## 2. Project Architecture

```
/
├── index.html              (Main Application - Home Feed)
├── login.html              (AI-Assisted Feature 2)
├── css/
│   ├── style.css           (Global styles, layout, responsive grid, light/dark variables)
│   └── login.css           (Login-specific styles, form animations)
├── js/
│   ├── main.js             (App initialization, timeline rendering, search, interactions)
│   ├── modal.js            (AI-Assisted Feature 3: Tweet Modal logic)
│   ├── login.js            (AI-Assisted Feature 2: Login validation & interactions)
│   └── darkmode.js         (Manual Feature - Skeleton prepared for user implementation)
├── images/
│   └── avatar.svg          (Placeholder avatar for Mahlatse)
├── assets/
│   └── (favicon, icons if not using inline SVGs)
├── README.md
├── TECHNICAL.md
└── PLAN.md                 (This file)
```

**State Management:**
- `AppState` object in `main.js` holds current user, tweets, and UI state.
- `localStorage` used for:
  - `echo_dark_mode` (reserved for manual feature).
  - `echo_remember_me` (email prefilled on login).
  - `echo_tweet_draft` (saves modal text if closed accidentally).

**Data Flow:**
1. `main.js` initializes by loading static tweet data into `AppState.tweets`.
2. Renders tweets into the DOM using `TweetComponent` (a factory function creating DOM elements).
3. User interactions (like, retweet) update `AppState` and re-render the specific tweet node.
4. Search input filters `AppState.tweets` and re-renders the feed.

## 3. Text Wireframes

### Desktop (1024px+)
```
+----------------------------------------------------------+
|  LEFT SIDEBAR        | MAIN FEED              | RIGHT   |
|  (Fixed, 275px)      | (Fluid, 1fr)           | SIDEBAR |
|                      |                        | (350px) |
|  [Logo]              |  Home                  |         |
|                      |  +------------------+  | Search  |
|  [Home]              |  | Composer Box     |  | [____]  |
|  [Explore]           |  | Avatar | Textarea |  |         |
|  [Notifications]     |  | [Media] [GIF] Tweet|  | Trends  |
|  [Messages]          |  +------------------+  | #JS     |
|  [Bookmarks]         |  +------------------+  | #CSS    |
|  [Profile]           |  | Tweet Card 1     |  | #AI     |
|                      |  | Avatar Name Date |  | #SAtech |
|  [Tweet Button]      |  | Content...       |  | #Front  |
|                      |  | [Like] [Retweet] |  |         |
|  +----------------+  |  +------------------+  | DevStats|
|  | Avatar Mahlatse|  |  | Tweet Card 2     |  | Projects|
|  | Frontend Dev   |  |  | ...              |  | Stack   |
|  +----------------+  |  +------------------+  | Coffee  |
|                      |                        |         |
+----------------------------------------------------------+
```

### Tablet (768px - 1023px)
```
+-------------------------------------------+
|  LEFT SIDEBAR      | MAIN FEED            |
|  (Icons + Labels)  | (Fluid)              |
|                    |                      |
|  [Logo]            | Home                 |
|                    | +------------------+   |
|  [Home]            | | Composer         |   |
|  [Explore]         | +------------------+   |
|  [Notifications]   | +------------------+   |
|  [Messages]        | | Tweet Card 1     |   |
|  [Bookmarks]       | | ...              |   |
|  [Profile]         | +------------------+   |
|                    | ...                  |
|  [Tweet]           |                      |
+-------------------------------------------+
(Right Sidebar is hidden)
```

### Mobile (320px - 767px)
```
+-------------------------+
|  [Logo]   Home  [Search]|
+-------------------------+
| +---------------------+ |
| | Composer Box        | |
| +---------------------+ |
| +---------------------+ |
| | Tweet Card 1        | |
| | ...                 | |
| +---------------------+ |
| ...                     |
|                         |
| [H] [E] [N] [M] [P]   |  <- Bottom Nav Bar
+-------------------------+
(Left Sidebar becomes a bottom nav bar)
```

### Login Page (All Devices)
```
+-------------------------+
|                         |
|      [Logo] Echo        |
|                         |
|  +-------------------+  |
|  | Sign in to Echo   |  |
|  |                   |  |
|  | Email: [________] |  |
|  | Pass:  [____] [👁] |  |
|  | [ ] Remember me   |  |
|  | [Sign In]           |  |
|  |                     |  |
|  | Forgot password?    |  |
|  | No account? Sign up |  |
|  +-------------------+  |
|                         |
+-------------------------+
(Card is centered, max-width 400px, with responsive padding)
```

### Tweet Modal (Overlay)
```
+-------------------------------------------------+
|  (Backdrop: rgba(0,0,0,0.4))                    |
|                                                 |
|  +-------------------------------------------+  |
|  | [X]                                       |  |
|  | Avatar | What's happening?               |  |
|  |        |                                 |  |
|  |        |                                 |  |
|  | [Media] [GIF] [Poll] [Emoji]  280/280 [Tweet]|
|  +-------------------------------------------+  |
|                                                 |
+-------------------------------------------------+
```

## 4. Component Breakdown

### A. Left Sidebar (`<nav>`)
- **Logo:** SVG icon, links to Home.
- **Nav Links:** Array of objects `{ icon, label, href, active }`. Rendered as `<a>` tags. Active state has bold text and icon fill.
- **Tweet Button:** Primary CTA. Opens the Tweet Modal. On mobile, it's a floating action button (FAB).
- **Profile Summary:** Fixed to bottom of sidebar. Avatar (40px circle), Name (bold), Handle (muted). Links to profile page (or `#`).
- **Responsive Behavior:**
  - Desktop: Full text labels.
  - Tablet: Icons + text, narrower width.
  - Mobile: Hidden. Replaced by Bottom Nav Bar (`<nav aria-label="Mobile">`).

### B. Main Content (`<main>`)
- **Header:** Sticky top. "Home" title. Contains a small dark mode toggle button (for the manual feature) and a mobile search icon.
- **Composer:**
  - Avatar (left) + Textarea (right).
  - Textarea auto-resizes.
  - Action bar: Media, GIF, Poll, Emoji icons (decorative/placeholder for now).
  - Character counter: `0/280` text, turns orange at 260, red at 280+.
  - Tweet button: Disabled when textarea is empty or >280 chars.
- **Feed:**
  - List of `<article>` elements (tweets).
  - **Tweet Card:**
    - Header: Avatar (48px), Name, @handle, timestamp, "More" button.
    - Body: Text content.
    - Footer: Action buttons (Reply, Retweet, Like, Share). Each with count.
    - Hover effect: Subtle background color change.
  - **Empty State:** Displayed when feed is empty (e.g., after filtering).
  - **Skeleton Loader:** Shown for 500ms on initial load to simulate data fetching.

### C. Right Sidebar (`<aside>`)
- **Search:** Input with search icon. On focus, shows a dropdown of "Recent Searches" or suggestions. Filters the main feed in real-time.
- **Trending:** Card with list of topics. Each item has category, topic, and post count.
- **Developer Stats:** Card with Mahlatse's specific stats (Projects, Stack, Coffee count).
- **Responsive Behavior:** Hidden on tablet and mobile.

### D. Tweet Modal (`<dialog>` or custom modal)
- **Trigger:** Sidebar "Tweet" button, Mobile FAB, or Main Composer "Tweet" button.
- **Overlay:** Fixed position backdrop. Clicking backdrop closes modal.
- **Content:** Reuses the Composer component logic but in a centered modal card.
- **Character Counter:** Real-time update.
- **Close:** "X" button, Escape key, or backdrop click. Triggers a fade-out animation.
- **Success:** Closes modal, adds tweet to top of feed, triggers "Tweet sent!" toast.

### E. Login Page (`<form>`)
- **Layout:** Centered vertically and horizontally. Dark mode compatible.
- **Fields:**
  - Email: `type="email"`, required, HTML5 validation.
  - Password: `type="password"`, required. Toggle button switches to `type="text"`.
  - Remember Me: Checkbox. Saves email to `localStorage`.
  - Forgot Password: Link (triggers a toast: "Feature coming soon!").
- **Submit:** Validates fields. On success, redirects to `index.html` (simulating auth). On error, shows inline error messages.
- **Responsive:** Card width adapts (90% on mobile, max 400px on desktop).

### F. Toast Notification System
- **Container:** Fixed to top-right (desktop) or top-center (mobile).
- **Toast:** Slides in from top. Auto-dismisses after 3 seconds.
- **Types:** Success (green), Error (red), Info (blue).
- **API:** `Toast.show(message, type)`.

### G. Accessibility Layer
- **Keyboard:**
  - `Tab` moves through all interactive elements.
  - `Shift+Tab` reverses.
  - `Enter`/`Space` activates buttons and links.
  - `Escape` closes modals and dropdowns.
- **ARIA:**
  - `aria-label` on all icon-only buttons.
  - `aria-expanded` on dropdowns.
  - `aria-live="polite"` on toast container.
  - `role="dialog"` and `aria-modal="true"` on the tweet modal.
- **Focus:**
  - `focus-visible` used for all focus indicators.
  - Focus trap inside the modal when open.
- **Screen Readers:**
  - Headings hierarchy (`h1` for Home, `h2` for sections).
  - Alt text for images (avatars).
  - Hidden decorative icons from AT (`aria-hidden="true"`).

## 5. Development Roadmap

### Phase 1: Foundation (CSS & HTML Skeleton)
- [ ] Create CSS variables (`:root`) for all colors, spacing, fonts, shadows, transitions.
- [ ] Create dark mode variable overrides (`[data-theme="dark"]`) as a scaffold for the manual feature.
- [ ] Build the responsive CSS Grid in `style.css` (mobile-first approach).
- [ ] Build `index.html` semantic structure (nav, main, aside, modal dialog).
- [ ] Build `login.html` semantic structure.
- [ ] Add all ARIA attributes and roles.

### Phase 2: Core Functionality (AI-Assisted Features)
- [ ] **Feature 2 (Login):** Implement `login.js`. Form validation, password toggle, remember me logic, redirect.
- [ ] **Feature 3 (Modal):** Implement `modal.js`. Open/close logic, focus trap, character counter, backdrop click, escape key, add tweet to feed, toast on success.

### Phase 3: Application Logic
- [ ] **Data:** Generate 15+ realistic tweets about HTML, CSS, JS, Frontend, UI/UX, Accessibility, Coffee, Learning.
- [ ] **Feed:** Implement `main.js`. Render tweets, handle Like/Retweet, filter search, update developer stats.
- [ ] **Composer:** Wire the main page composer to use the same logic as the modal.
- [ ] **Profile:** Render Mahlatse's profile in the sidebar.
- [ ] **Right Sidebar:** Populate trending topics and developer stats.

### Phase 4: UX Polish & Animations
- [ ] Implement Skeleton Loading screens.
- [ ] Implement Toast notification system.
- [ ] Implement Fade-in animations for tweets.
- [ ] Implement Hover states (buttons, cards, nav items).
- [ ] Implement Focus states (inputs, buttons).
- [ ] Implement Micro-interactions (button scale, icon bounce, card lift).
- [ ] Add "Loading..." feedback for search.
- [ ] Add empty state message.

### Phase 5: Manual Feature Integration (Prepared for User)
- [ ] Add the Dark Mode toggle button to the header.
- [ ] Ensure all CSS variables are correctly mapped.
- [ ] Create `darkmode.js` with a comment block explaining where the user should add their manual implementation logic (toggle + localStorage).
- [ ] Test that toggling the `data-theme` attribute manually in DevTools works perfectly.

### Phase 6: Quality Assurance
- [ ] **Responsiveness:** Test at 320, 375, 768, 1024, 1440, 2560, 3840px using DevTools.
- [ ] **Accessibility:** Run axe DevTools (or manual check). Verify contrast, keyboard flow, ARIA.
- [ ] **Performance:** Check for layout thrashing. Ensure animations use `transform`/`opacity`.
- [ ] **Code Quality:** Review for DRY principles, naming conventions, dead code.
- [ ] **Functionality:** Click every button. Test every feature. Check `localStorage` states.

### Phase 7: Documentation
- [ ] Write `README.md` with overview, features, installation, folder structure, responsive design notes, accessibility, performance, future improvements, deployment.
- [ ] Write `TECHNICAL.md` with component API, state management, event handling, and build instructions.

---

**Status:** Plan Complete. Ready to begin coding.
