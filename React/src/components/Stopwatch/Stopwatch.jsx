// The goal of this Stopwatch is that, we will use useRef to store the id of the setInterval which will update the time state eveyr second, and then when the user clicks on the stop button, we will stop the timer.
// The benefit of using useRef here is that, we will store the id of the useRef accross renders, and thus we can presevtn memory leak by clearing the interval.
// Next, this is more better wrt performance, because if we try to achieve this vis state then,, there will be a lot of re-renders which are unnecessary.
// Example

import { useEffect, useRef, useState } from "react";
import gstyles from "../../styles/App.module.css";

function Stopwatch() {
  const [time, setTime] = useState(0);

  const infoRef = useRef(null);

  useEffect(() => {
    // ⬇️ THE GUARD: If a timer ID already exists in our ref, exit immediately.
    if (infoRef.current) return;

    // Only if the pocket is empty (null) do we start a new interval.
    infoRef.current = setInterval(() => {
      setTime((time) => time + 1);
    }, 1000);

    return () => {
      clearInterval(infoRef.current);
      infoRef.current = null;
    };
  }, []);

  function handleClick() {
    clearInterval(infoRef.current);

    infoRef.current = null;
  }

  return (
    <div className={gstyles.container}>
      <div>Timer using useRef: {time}</div>
      <button onClick={handleClick}>Stop</button>
    </div>
  );
}

export default Stopwatch;

// The core difference between managing a timer in useEffect versus using useRef lies in performance and imperative control. While a useEffect cleanup function is an "auto-stop" mechanism that prevents memory leaks when a component unmounts, it doesn't provide a way for the user to manually interact with that timer without triggering unnecessary UI cycles. If you store an Interval ID in useState, every time you set that ID, React triggers a re-render. This forces the entire component to re-calculate its Virtual DOM just to save a hidden number that the user never sees on the screen, which is inefficient for high-frequency or complex applications.
// By using useRef, you create a "silent storage" pocket that persists for the full lifetime of the component. Updating ref.current is a synchronous action that does not trigger the React render cycle. This allows you to store and access the Interval ID inside event handlers—like a "Stop" button—instantly and performantly. In the industry, useRef is preferred for this logic because it keeps the background data stable across renders even if other parts of the UI are updating, ensuring your manual "Stop" and "Start" buttons work reliably without causing lag.
// In React, useRef is used to store Interval IDs because it allows for synchronous data updates that bypass the component's rendering cycle. Unlike useState, which re-renders the component to update the screen, useRef stores data in a .current property that is "invisible" to the UI. This is ideal for managing browser-only values like timer IDs, which are necessary for logic but do not need to be displayed to the user.
// Using useRef provides the manual control required for features like "Start" and "Stop" buttons in a stopwatch. Because the ref persists across every render, the Interval ID is never lost when the component updates for other reasons. This pattern is a standard industry performance optimization, ensuring that the application only spends resources on UI updates that the user can actually see, while keeping background logic "silent" and efficient.

// The guard clause if (timerRef.current) return; is a defensive programming pattern used to ensure that only one active interval exists at a time, a concept known as Singleton Logic. Because setInterval is a browser-level process that runs independently of React's lifecycle, failing to include this check allows multiple "zombie" timers to be created every time a user clicks "Start" or when React Strict Mode triggers a double-mount during development. This guard prevents performance degradation and UI chaos, where multiple intervals simultaneously fight to update the same state, by immediately exiting the function if an existing ID is already stored in the useRef "pocket".
