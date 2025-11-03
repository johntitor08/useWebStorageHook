# use-web-storage

A React hook for smart localStorage/sessionStorage with expiry, remove, clear, and cross-tab sync support.

## Installation

```bash
npm install use-web-storage
```

## Example Usage

```bash

import { useWebStorage } from "use-web-storage";

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
import { useWebStorage } from "use-web-storage";
```
