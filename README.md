# 🚀 Tezor

**Tezor** is a modern React utility library that provides reusable hooks, UI components, and smart utilities to speed up development.

---

## ✨ Why Tezor?

Stop rewriting the same logic again and again.

Tezor helps you:

- Build faster ⚡
- Write cleaner code 🧼
- Reuse logic across projects 🔁

---

## 🔥 Features

- 🧠 Smart Hooks

  - useZodValidation
  - useSmartNavigation

- 🎨 UI Components

  - DoubleSidebar (Microsoft-style layout)

- 🔐 Validation support (Zod)

- 🧭 Routing support (React Router)

- 🎯 Works with Material UI

---

## 📦 Installation

```bash
npm install tezor
```

---

## 🚀 Usage

### useZodValidation

```ts
import { useZodValidation } from "tezor";

const { errors, validate } = useZodValidation(schema);
```

---

### useSmartNavigation

```ts
import { useSmartNavigation } from "tezor";

const { navigateTo } = useSmartNavigation();
```

---

### DoubleSidebar

```tsx
import { DoubleSidebar } from "tezor";

<DoubleSidebar>{/* content */}</DoubleSidebar>;
```

---

## 🧠 Philosophy

> Write once. Reuse everywhere.

---

## 👨‍💻 Author

Bharat 🇮🇳

---

## 📄 License

MIT
