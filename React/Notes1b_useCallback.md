# useCallback: Key Concepts

`useCallback` is an essential React hook that goes hand-in-hand with `useMemo`. While `useMemo` is used to cache a **calculated value**, `useCallback` is used to cache a **function definition**.

## 1. The Core Problem: Referential Equality

In JavaScript, functions are objects. When you define a function inside a React component, a brand new function object is created in memory **every single time the component re-renders**.

Most of the time, this is perfectly fine. However, it becomes a major performance problem in two specific scenarios:

1. **Passing functions to heavily optimized child components:** If you pass a function as a prop to a child component wrapped in `React.memo`, the child will _always_ re-render because it thinks the function prop has changed (since it's a new memory address every render).
2. **Functions as dependencies in other hooks:** If you use a function inside a `useEffect` dependency array, the effect will re-run on every render because the function reference keeps changing.

## 2. The Solution: `useCallback`

`useCallback` tells React: _"Memorize this function. Don't recreate it on the next render unless one of its dependencies changes."_

### Example Comparison

**Without `useCallback` (Bad Performance):**

```javascript
function ProductList({ products }) {
  // Recreated every time the component re-renders!
  const addToCart = (productId) => {
    // ... logic
  };

  return (
    <div>
      {products.map((product) => (
        // Even if the product hasn't changed, ProductItem re-renders
        // because the addToCart reference is completely new.
        <ProductItem key={product.id} product={product} onAdd={addToCart} />
      ))}
    </div>
  );
}
```

**With `useCallback` (Optimized):**

```javascript
function ProductList({ products }) {
  // Cached! React returns the exact same function reference on re-renders.
  const addToCart = useCallback((productId) => {
    // ... logic
  }, []); // Only recreate if dependencies in this array change

  return (
    <div>
      {products.map((product) => (
        // Now, ProductItem won't unnecessarily re-render!
        <ProductItem key={product.id} product={product} onAdd={addToCart} />
      ))}
    </div>
  );
}
```

## 3. `useCallback` vs `useMemo`

These two hooks are closely related. In fact, `useCallback(fn, deps)` is exactly the same as `useMemo(() => fn, deps)`.

| Hook              | What it caches               | What it returns                               |
| :---------------- | :--------------------------- | :-------------------------------------------- |
| **`useMemo`**     | The **result** of a function | A value (string, array, object, number, etc.) |
| **`useCallback`** | The **function itself**      | A function that you can call later            |

## 4. When _Not_ to Use It

Do not wrap _every single function_ in `useCallback`. `useCallback` itself has a small performance cost (React has to do extra work to check dependencies and store the function in memory).

**Rule of Thumb:** Only use `useCallback` if:

1. You are passing the function as a prop to a child component that is wrapped in `React.memo()`.
2. The function is going to be used in the dependency array of a `useEffect` or another `useMemo`/`useCallback`.
