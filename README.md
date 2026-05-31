# WanderLog 🌍

**Your Travel Bucket List, Powered by Real-World Data**

A single-page React application where authenticated users can explore ~250 countries, search and filter them, view rich details, and build a personal travel bucket list.

---

## Tech Stack

- **React 18** (JSX, no TypeScript) + **Vite**
- **React Router v6** for client-side routing
- **Plain CSS** with CSS custom properties (no Tailwind needed)
- **REST Countries API** — live country data, no key required
- **Reqres.in** — mock authentication API

---

## How to Run Locally

```bash
# 1. Clone the repo
git clone https://github.com/your-username/wanderlog.git
cd wanderlog

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev

# 4. Open http://localhost:5173 in your browser
```

No `.env` file is needed — all API endpoints are public.

---

## Test Credentials

Reqres.in only accepts a fixed set of test emails:

| Field    | Value                  |
|----------|------------------------|
| Email    | `eve.holt@reqres.in`   |
| Password | any non-empty string   |

> Tip: click the **"🔑 Use demo credentials"** button on the login page to auto-fill.

The same email works for Register. If you enter an unrecognised email, the API returns an error and the app displays it gracefully.

---

## Features

| # | Feature | Notes |
|---|---------|-------|
| 1 | **Authentication** | Login + Signup via Reqres.in |
| 2 | **Protected Routes** | Unauthenticated users redirected to `/login` |
| 3 | **Session Persistence** | Token + user stored in `localStorage`; survives refresh |
| 4 | **API Fetching** | REST Countries API with loading + error states; module-level cache |
| 5 | **Country Detail** | Flag, capital, population, languages, currency, timezone, neighbors |
| 6 | **Bucket List & Visited** | Per-user lists persisted in `localStorage`; move between tabs |
| 7 | **Responsive Layout** | Works on desktop, tablet, and mobile |
| ★ | **Sort** | Sort grid by Name / Population / Area |
| ★ | **World Coverage Stat** | Visited tab shows % of world population you've covered |

---

## Project Structure

```
src/
├── api/                  # (reserved for API helpers if needed)
├── components/
│   ├── Auth/             # LoginForm, SignupForm, Auth.css
│   ├── BucketList/       # BucketListTabs, WishList, VisitedList
│   ├── CountryDetail/    # CountryInfo, ActionButtons
│   ├── Explore/          # SearchBar, CountryCard, CountryGrid
│   └── Layout/           # Navbar, PrivateRoute
├── context/
│   ├── AuthContext.jsx   # login / register / logout + localStorage sync
│   └── BucketListContext.jsx  # per-user bucket list + visited list
├── hooks/
│   ├── useAuth.js        # re-export from context
│   ├── useCountries.js   # fetch + cache REST Countries data
│   └── useLocalStorage.js
├── pages/
│   ├── LoginPage.jsx
│   ├── SignupPage.jsx
│   ├── ExplorePage.jsx
│   ├── CountryDetailPage.jsx
│   └── BucketListPage.jsx
├── App.jsx               # Router + context providers
├── main.jsx
└── index.css             # CSS variables + reset
```

---

## What I Would Improve With More Time

1. **Real authentication backend** — Reqres is a mock; a real app needs JWT refresh tokens, secure HttpOnly cookies, and proper password hashing.
2. **Pagination or virtual scrolling** — rendering 250 cards at once works, but `react-window` or infinite scroll would improve performance at scale.
3. **Offline support** — a service worker caching the REST Countries response would make the app usable without internet after first load.
4. **Drag-to-reorder bucket list** — the HTML5 Drag and Drop API could let users sort their wish list without a heavy library.
5. **Country comparison view** — side-by-side stats for two selected countries would be a useful UX addition.

---

## API Notes

- **REST Countries**: `GET https://restcountries.com/v3.1/all?fields=name,cca3,capital,...` — the `?fields=` param reduces the payload from ~2.5 MB to ~300 KB.
- **Reqres.in login**: `POST https://reqres.in/api/login` — only the fixed test emails return a `200`; all others return `400 { "error": "user not found" }`. The app surfaces this error message in the UI.
