# useMemo vs useEffect: Key Differences

Both `useMemo` and `useEffect` are essential React hooks, but they serve completely different purposes in a component's lifecycle.

**Short Summary:** `useMemo` is for performance optimization (caching values), while `useEffect` is for handling side effects (synchronizing with external systems).

## 1. Primary Purpose

- **`useMemo` (Memoization):** Used to calculate and cache a value so that you don't have to recalculate it on every render. Use it for computationally expensive calculations or to maintain a stable reference to an object/array (preventing unnecessary re-renders of child components).
- **`useEffect` (Side Effects):** Used to execute code that interacts with things outside of React's rendering flow. This includes fetching data, manual DOM updates, setting up event listeners, or saving data to `localStorage`.

## 2. Execution Timing

- **`useMemo`:** Runs **during** the rendering process. React calls your `useMemo` function while it is building the UI. _Never_ perform side effects inside `useMemo`.
- **`useEffect`:** Runs **after** the rendering process is complete and the browser has painted the screen. This ensures side effects don't block the UI from updating.

## 3. Return Values

- **`useMemo`:** Returns a calculated value (an array, object, number, string, etc.). You store this returned value in a variable to use in your component.
- **`useEffect`:** Does not return a value. The only thing a `useEffect` function can return is a **cleanup function** (e.g., to clear a timer or abort a fetch request when the component unmounts).

## Examples from the Codebase

### `useMemo` Example (`ProductTable.jsx`)

In `ProductTable.jsx`, `useMemo` is used to attach random IDs to the product list exactly _once_ when the component mounts (due to the empty dependency array `[]`).

```javascript
let productListwithId = useMemo(() => {
  return products.map((item) => ({
    ...item,
    id: crypto.randomUUID(),
  }));
}, []);
```

_Why?_ Without `useMemo`, new random IDs would generate every time the user typed a letter in the search box, causing React to destroy and recreate table rows from scratch.

### `useEffect` Example (`ProductMain.jsx`)

In `ProductMain.jsx`, `useEffect` is used to synchronize React state with the browser's `localStorage` every time the `name` or `isAvailable` filters change.

```javascript
useEffect(() => {
  localStorage.setItem("nameFilter", name);
  localStorage.setItem("isAvailiableFilter", JSON.stringify(isAvailiale));
}, [name, isAvailiale]);
```

_Why?_ Reaching outside of React to interact with browser storage APIs is a classic side effect.

## Summary Cheat Sheet

| Feature          | `useMemo`                                        | `useEffect`                                              |
| :--------------- | :----------------------------------------------- | :------------------------------------------------------- |
| **Main Goal**    | Caching/Optimizing values to avoid recalculation | Managing side effects (API calls, timers, subscriptions) |
| **When it runs** | **During** the render                            | **After** the render is committed to the screen          |
| **Returns**      | The memoized (cached) value                      | Nothing, or a cleanup function                           |
| **Dependencies** | Re-runs the calculation if dependencies change   | Re-runs the effect if dependencies change                |
