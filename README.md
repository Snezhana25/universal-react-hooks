# React + TypeScript + Vite

# 🧰 Universal React Hooks & Dropdown Demo
This project demonstrates reusable custom React hooks for data fetching and list management, along with a flexible dropdown component designed for reuse and easy integration into any React app.

# 📦 Features

✅ useFetch<T>()

A universal data-fetching hook that supports:

* Any data source via () => Promise<T>

* Loading status (initial, loading, success, error)

* Canceling in-flight requests

* Refetching

* Anti-spam protection

* Modifying response data manually

✅ useList<T>()

* Built on top of useFetch, this hook handles:

* Pagination (page, pageSize)

* Filtering (e.g., search)

* Sorting (field + direction)

* Status tracking & error handling

✅ Dropdown<T>

Reusable and minimalistic dropdown UI component with:

* Placeholder, disabled state

* Custom rendering via renderOption

* Controlled value / onChange

* Style-isolated via CSS Modules

* Ready to be published as a package

# 🚀 Quick Start

```npm install```
```npm run dev```

# ✨ Notes

* CSS handled via CSS Modules for isolation

* Dropdown accessibility, keyboard nav, and ARIA support — coming soon

* This code is modular and easy to refactor or extend

© 2025 — Built ❤️ Snizhana Ivanova
