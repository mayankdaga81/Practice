# Day 4: Logic Abstraction with Custom Hooks

## 1. Feature-Based Architecture

Following industry standards, logic that can be reused across multiple components is extracted into a `src/hooks/` directory. This promotes the DRY (Don't Repeat Yourself) principle.

## 2. Custom Hook Mechanics

A custom hook is a functional abstraction that uses React's primitive hooks (`useState`, `useEffect`) to provide a specific capability.

- **Input-Driven:** Hooks should be flexible, accepting parameters like `url` to handle various data sources.
- **Lifecycle Awareness:** A well-designed hook manages its own side effects and cleanup (e.g., cancelling network requests on unmount).

## 3. Separation of Concerns

By using `useFetch`, the UI component no longer needs to understand HTTP status codes or AbortController signals; it simply consumes the resulting data, loading state, and errors.
