# Day 3: Advanced Data Fetching Patterns

## 1. Manual Response Validation

The native `fetch` API only rejects a promise if there is a network failure (e.g., DNS issues). It treats `404` and `500` status codes as successful responses.

- **Best Practice:** Always check `if (!response.ok)` and throw a manual Error to trigger the `catch` block.

## 2. Race Conditions and the AbortController

A **Race Condition** occurs when multiple async requests are in flight, and an older request finishes after a newer one, overwriting the UI with stale data.

- **The Solution:** Use `AbortController`.
- **Mechanism:** 1. Create a new controller inside `useEffect`. 2. Pass `controller.signal` to the fetch request. 3. Call `controller.abort()` in the cleanup function.
- **Result:** If the component re-renders or unmounts, the previous fetch is cancelled immediately, ensuring only the result of the latest request impacts the state.

## 3. The "AbortError" Exception

When a fetch is aborted, the promise rejects with a specific error named `AbortError`.

- **Handling:** In the `catch` block, check `if (error.name === 'AbortError')`.
- **Reason:** You should ignore this error because it isn't a failure of the API or the network—it was a deliberate cancellation by the application.
