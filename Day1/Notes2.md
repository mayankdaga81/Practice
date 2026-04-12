# React Side Effects and Lifecycle Management

This guide covers the implementation and architectural reasoning for managing side effects, global events, and resource cleanup in React applications.

## 1. Understanding Side Effects

A **Side Effect** is any operation that impacts something outside the scope of a React component's rendering logic.

- **Examples:** API calls, manual DOM manipulation, setting up subscriptions, or managing timers.
- **Management:** Side effects are handled inside the `useEffect` hook to ensure they synchronize with the component's lifecycle without blocking the UI.

## 2. The `useEffect` Hook

The `useEffect` hook allows components to perform actions after rendering.

### Dependency Array Behaviors

- **No Array:** The effect runs after **every** render. This is a common source of infinite loops if state is updated inside the effect.
- **Empty Array (`[]`):** The effect runs only **once**, right after the component mounts.
- **With Variables (`[dep]`):** The effect runs on mount and whenever the specified dependency changes.

## 3. Resource Cleanup and Memory Leaks

A **Memory Leak** occurs when an application fails to release resources (like timers or event listeners) after they are no longer needed.

### The Cleanup Function

When a function is returned from `useEffect`, React executes it before the component unmounts or before the effect re-runs.

- **Global Events:** Listeners added to `window` or `document` must be removed using `removeEventListener`.
- **Timers:** Intervals started with `setInterval` must be stopped using `clearInterval`.
- **Consistency:** To remove a listener, you must pass the **exact same function reference** used when adding it.

## 4. State Persistence (Hydration Pattern)

Persistence allows a component to retain its UI state (like search filters or toggles) across page refreshes using the browser's `localStorage`.

- **Hydration:** Initializing state from `localStorage`. Using a **Lazy Initializer** (`useState(() => ... )`) is a best practice to ensure the disk read only happens during the initial mount.
- **Synchronization:** Using `useEffect` to update `localStorage` whenever the state changes.
- **Data Types:** `localStorage` only stores strings. Use `JSON.stringify()` for storage and `JSON.parse()` for retrieval.

## 5. Stale Closures and Functional Updates

A closure "captures" variables from the time it was created. If a `useEffect` runs only once (`[]`), any function inside it (like a `setInterval` callback) will only see the state values from that specific initial render.

- **The Issue:** `setCount(count + 1)` will use the old `count` value from the first render.
- **The Solution:** Use a **Functional State Update** (`setCount(prev => prev + 1)`). This ensures the update always receives the most current state value regardless of the closure.

## 6. Implementation Summary

| Side Effect       | Implementation Pattern             | Cleanup Required            |
| :---------------- | :--------------------------------- | :-------------------------- |
| **LocalStorage**  | Sync state to disk on change       | No                          |
| **Window Events** | `addEventListener` on mount        | Yes (`removeEventListener`) |
| **Intervals**     | `setInterval` on mount             | Yes (`clearInterval`)       |
| **API Calls**     | `fetch` on mount/dependency change | Yes (AbortController)       |

---

_Created as a technical reference for React side effect architecture and performance optimization._
