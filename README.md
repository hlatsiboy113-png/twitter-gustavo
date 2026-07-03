# Echo — Twitter Clone

&gt; **Share ideas. Build conversations.**

A production-quality, Twitter-inspired social media application built with vanilla HTML, CSS, and JavaScript. Designed for accessibility, responsiveness, and excellent user experience.

---

## Project Overview

Echo is a frontend-only Twitter clone that replicates the core Twitter experience while introducing subtle UX improvements. It features a responsive 3-column layout, dark mode, tweet composer, interactive feed, login system, and comprehensive accessibility support.

**Color Scheme:** Matte Emerald Green primary + Purple accent (customized per request — no blue/turquoise).

---

## Features

### Base Clone (40 marks)
- **Twitter-style Timeline** — Feed with realistic developer-focused tweets
- **Left Sidebar** — Navigation with Home, Explore, Notifications, Messages, Bookmarks, Profile
- **Right Sidebar** — Search, Trending topics, Developer Stats, Who to Follow
- **Tweet Composer** — Inline and modal compose with character counter
- **Sticky Header** — Blur backdrop header with feed tabs
- **Profile Summary** — User card with avatar, name, and handle

### Manual Feature — Dark Mode (15 marks)
- **Written entirely without AI assistance**
- `data-theme` attribute on `&lt;html&gt;` element
- CSS custom properties for all design tokens
- `localStorage` persistence across sessions
- System preference detection via `prefers-color-scheme`
- Smooth 300ms transitions on all color tokens
- Accessible toggle with `aria-pressed` state
- Meta theme-color updates for mobile browsers

### Cursor Feature 1 — Tweet Modal (10 marks)
- Full-screen compose overlay
- 280-character counter with warn/error states
- Post-to-feed action with animation
- Focus trap on open
- Escape-to-close
- Toast confirmation on post
- Fully keyboard accessible

### Cursor Feature 2 — Login Page (10 marks)
- Separate `login.html` + in-page modal variant
- Email + password validation with per-field errors
- Password visibility toggle
- "Remember Me" with localStorage
- "Forgot Password" link
- Loading state simulation on submit
- Welcome toast on success
- Redirects to index on success

### UX Improvements
- Skeleton loading states on feed (800ms)
- Toast notifications (like, retweet, post, login)
- Hover feedback on all interactive elements
- Disabled state on post button when empty
- Character counter with warn + error color states
- Heart pop animation on like
- Retweet spin animation
- New tweet animates into feed (fade + slide)
- Follow button text flips Following/Unfollow on hover
- Smooth dark mode transition (no flash)
- Sticky header with blur backdrop
- Hashtag + mention coloring in tweets
- Keyboard arrow navigation on tabs
- Modal closes on Escape or overlay click
- Form field error messages (login)
- Loading state on login submit button

---

## Installation

No build step required. This is a static site.

```bash
# Clone or download the project
cd echo

# Open in browser
open index.html
