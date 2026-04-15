# React.memo: Key Concepts

`React.memo` is a **Higher-Order Component (HOC)** in React that is used to optimize performance by preventing unnecessary re-renders of a component.

## 1. The Problem: React's Default Behavior

By default, when a parent component re-renders in React, **all of its child components will automatically re-render too**, regardless of whether their props have changed.

If you have a heavy child component (like a data grid or a complex chart) and its parent re-renders due to an unrelated state change (like a user typing in a search bar), that heavy child component is going to be destroyed and rebuilt for no reason. This can slow down your app.

## 2. The Solution: `React.memo`

`React.memo` acts as a bouncer for your component. When you wrap a component in `React.memo`, React will memorize the rendered output of that component.

The next time the parent re-renders, `React.memo` will look at the new props coming in and compare them to the old props.

- **If the props are exactly the same:** React skips rendering the child component and just reuses the previous output.
- **If the props have changed:** React will go ahead and re-render the child.

### Example

```javascript
import React, { useState } from "react";

// Wrap the component in React.memo
const ExpensiveChild = React.memo(function ExpensiveChild({ text }) {
  console.log("ExpensiveChild rendered!");
  return <div>{text}</div>;
});

function Parent() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("Hello");

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>

      {/* 
        Because ExpensiveChild is wrapped in React.memo, clicking the 
        Count button will NOT cause ExpensiveChild to re-render, 
        because the 'text' prop hasn't changed! 
      */}
      <ExpensiveChild text={text} />
    </div>
  );
}
```

## 3. The "Gotcha" (And why we need `useCallback`!)

`React.memo` compares props using a **shallow comparison** (literally doing `oldProp === newProp`).

In JavaScript, primitive values like strings, numbers, and booleans are compared by their value. So `"Hello" === "Hello"` is `true`. But objects, arrays, and functions are compared by their **memory address** (referential equality).

If you pass a function or an object as a prop to a `React.memo` component without memoizing them first, `React.memo` will break! It will think the props have changed because the parent creates a brand new function/object in memory on every single render.

**This is exactly why `useCallback` and `useMemo` exist.** You use them in the parent component to keep the memory address of the function/object stable so that `React.memo` on the child component can do its job properly.

## 4. When to use `React.memo` (and when NOT to)

Just like `useCallback`, you shouldn't wrap every component in `React.memo`. The comparison process itself takes a tiny bit of computing power.

- **DO use it:** On components that render frequently with the exact same props, or components that are very computationally expensive to render (like a large `ProductTable`).
- **DO NOT use it:** On simple, lightweight components (like a basic `<button>` or `<p>`), or on components where the props change on almost every single render anyway.
