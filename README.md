# useWebStorage

A React hook for smart localStorage/sessionStorage with expiry, remove, clear, and cross-tab sync support.

## Installation

```bash
npm install @authory/use-web-storage-hook
```

## Example Usage

```bash

import { useWebStorage } from "@authory/use-web-storage-hook";

function App() {
  const [theme, setTheme] = useWebStorage("theme", "light");

  return (
    <div>
      <h2>Theme: {theme}</h2>
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        Toggle
      </button>
    </div>
  );
}
```

### 🚀 Publishing

```bash
npm login
npm publish --access public
npm install use-web-storage
import { useWebStorage } from "@authory/use-web-storage-hook";
```

## ✨ Features

🔁 Works with both localStorage and sessionStorage

⏱ Supports expiry (auto remove after given time)

🧹 Provides remove() and clear() helpers

🔄 Syncs data across browser tabs

💡 Lightweight, dependency-free

### API

```bash
const [value, setValue, remove, clear] = useWebStorage(key, defaultValue, options);
```

### Options

```bash
{
  storage: 'local' | 'session', // default: 'local'
  expiry: 3600 // seconds
}
```
