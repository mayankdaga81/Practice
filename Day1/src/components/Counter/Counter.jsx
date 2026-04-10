import { useState } from "react";
import styles from "./Counter.module.css";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className={styles.container}>
      <button
        onClick={() => setCount((count) => count - 1)}
        className={`${styles.button} ${count === 0 ? styles.notAllowedCursor : ""}`}
        disabled={count > 0 ? false : true}
      >
        -
      </button>
      <span className={styles.count}>{count}</span>
      <button
        onClick={() => setCount((count) => count + 1)}
        className={styles.button}
      >
        +
      </button>
    </div>
  );
}

export default Counter;
