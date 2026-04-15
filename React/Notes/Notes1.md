# React Core Principles & Technical Architecture

This guide summarizes fundamental React concepts, architectural patterns, and best practices for building scalable frontend applications.

## 1. Core Architecture: The Virtual DOM & Reconciliation

React maintains a **Virtual DOM (VDOM)**, a lightweight JavaScript representation of the actual DOM.

- **Reconciliation:** When state or props change, React creates a new VDOM tree and compares it with the previous one using a **diffing algorithm**.
- **Efficiency:** Instead of re-rendering the entire UI, React identifies the specific differences ("diffs") and applies the minimum number of necessary updates to the real DOM.

## 2. Data Flow: State vs. Props

React follows a **one-way data flow** (top-down), making applications more predictable and easier to debug.

- **State:** Local data owned and managed by the component. It is mutable only via its specific setter function (e.g., `useState`).
- **Props:** Read-only (immutable) properties passed from a parent component to a child. A child component cannot modify the props it receives.
- **Pattern:** If a child needs to trigger a change in a value received via props, the **Lifting State Up** pattern is used. The parent passes a callback function as a prop, which the child invokes to request a state update in the parent.

## 3. List Rendering and the "Key" Prop

Keys provide a **stable identity** to elements in a list, allowing React to track which items changed, were added, or were removed during re-renders.

- **The Index Issue:** Using the array index as a key is considered an anti-pattern if the list can be reordered, filtered, or deleted. This can lead to **State Misalignment**, where React reuses the wrong DOM nodes (and their internal states, like cursor position or input text).
- **Best Practice:** Always use unique, stable identifiers (e.g., `id` from a database or `crypto.randomUUID()`).

## 4. Controlled vs. Uncontrolled Components

This concept defines how form elements (input, textarea, select) handle their internal data.

- **Controlled Components:** React state is the **Single Source of Truth**. The element's value is driven by state, and any change is handled by a React function.
  - **Essential Props:** `value` (to display the state) and `onChange` (to update the state).
- **Uncontrolled Components:** The DOM maintains its own internal state. Values are accessed using a `ref` (e.g., `useRef`).

## 5. The Principle of Single Source of Truth (SSOT)

The SSOT principle ensures that for any given piece of data, there is only one place where that data is defined and managed.

- **Predictability:** Knowing exactly where a value originates simplifies debugging.
- **Consistency:** Prevents UI "ghost" bugs where different parts of the screen show conflicting data.
- **Derived State:** If a value can be calculated from existing state or props (e.g., a filtered list or a total count), it should **not** be stored in a new state. Calculate it during the render process to keep the data synchronized.

## 6. Performance & Rendering Best Practices

- **Component Definition:** Never define a component inside the body of another component. Defining a child inside a parent causes the child component's "identity" to be recreated on every render, leading to a complete unmount/remount of the child's DOM nodes, which destroys performance and internal state.
- **Stable Identities:** Use `useMemo` or `useCallback` when passing complex objects or functions to children to maintain referential equality and prevent unnecessary re-renders.
- **Functional Updates:** When new state depends on the previous state, always use the functional update pattern: `setCount(prev => prev + 1)`. This avoids issues with stale closures during rapid updates.

---

_Created as part of a technical deep-dive into React engineering standards._
