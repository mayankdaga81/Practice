# Day 5: Global State Management with Context API

## 1. The Core Concept: Context API

The Context API is a built-in React feature used to share data across the entire component tree without "Prop Drilling" (passing data through every level of the tree manually).

### The Three-Step Pattern

1.  **`createContext()`**: Initializes the context "container."
2.  **`Provider`**: A component that wraps the app and holds the "Source of Truth."
3.  **`useContext()`**: A hook used by child components to access the global data.

## 2. Industry Standard Implementation

For scalability and performance, the following patterns are applied:

### A. Custom Hook Wrapper

Instead of calling `useContext(ThemeContext)` in every component, we export a custom `useTheme` hook. This provides:

- **Cleaner Imports**: Components only need to import one thing.
- **Safety Checks**: The hook can throw an error if a component tries to access the theme outside of the `ThemeProvider`.

### B. Performance Optimization

To prevent unnecessary re-renders of the entire app:

- **`useMemo`**: Used to memoize the context `value` object. This ensures that child components only re-render if the actual state (e.g., the theme string) changes.
- **`useCallback`**: Used to memoize toggle functions, ensuring the function reference stays stable across renders.

## 3. Common Pitfalls: Property Naming

A common "ghost bug" occurs when the property name exported by the **Provider** does not match the name destructured by the **Consumer**.

**Example of the Bug:**

- **Provider exports**: `{ theme, themeToggle }`
- **Consumer calls**: `const { theme, toggleTheme } = useTheme();`
- **Result**: `toggleTheme` will be `undefined`, and the UI will fail to update without throwing a clear error.

## 4. CSS Integration (Theming)

Context provides the _value_, but CSS performs the _visual change_. The standard approach is to apply the theme name as a class to a top-level container:

```jsx
const { theme } = useTheme();
return <div className={`app-container ${theme}`}>...</div>;
```
