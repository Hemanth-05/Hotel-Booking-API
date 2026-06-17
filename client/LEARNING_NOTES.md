# Frontend Learning Notes

## React State And Backend Data

When building React apps with backend data, remember that data is not available immediately. Components render first with initial state, then `useEffect` or an event handler fetches data from the backend, and only after the response comes back does state update and trigger a re-render.

Because of this, components must be written so they do not crash when data is temporarily `null`, `undefined`, or empty.

If we do not protect the component, React may try to read a property from missing data and crash before the backend request finishes. Once the component crashes, the normal render/update flow is interrupted and the page may become blank.

Good habit:

```text
If a component depends on backend data, handle the loading/empty state first.
```

Example:

```jsx
if (!user) {
  return <p>Loading account...</p>;
}

return <h2>{user.name}</h2>;
```

This prevents the app from trying to read `user.name` while `user` is still `null`.
