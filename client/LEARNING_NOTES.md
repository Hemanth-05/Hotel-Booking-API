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

## useEffect

`useEffect` is used for code that should run after React renders the component. It is commonly used for backend requests, reading from `localStorage`, timers, subscriptions, or anything that interacts with something outside the render itself.

Important rule:

```text
useEffect does not run before the first render.
It runs after React renders the component.
```

That means a component must be able to render safely before the effect finishes. For example, if `useEffect` fetches user data, the first render still happens before the user data arrives.

The dependency array controls when the effect runs:

```jsx
useEffect(() => {
  // Runs after every render
});
```

```jsx
useEffect(() => {
  // Runs once after the component first appears
}, []);
```

```jsx
useEffect(() => {
  // Runs when id changes
}, [id]);
```

Example:

```jsx
const [rooms, setRooms] = useState([]);

useEffect(() => {
  async function getRooms() {
    const response = await fetch("http://localhost:3000/api/rooms");
    const data = await response.json();
    setRooms(data);
  }

  getRooms();
}, []);
```

Flow:

```text
1. Component renders with rooms = []
2. React puts the initial UI on screen
3. useEffect runs
4. Backend request finishes
5. setRooms(data) updates state
6. Component re-renders with the rooms
```

Good habit:

```text
Do not fetch directly in the component body.
Fetch inside useEffect when the fetch should happen because the component loaded.
```
