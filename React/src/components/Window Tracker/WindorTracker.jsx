// import styles from "./WindowTracker.module.css";
import { useEffect } from "react";
import gstyles from "../../App.module.css";
import { useState } from "react";

function WindorTracker() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleWidth() {
      setWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleWidth);

    return () => {
      window.removeEventListener("resize", handleWidth);
      console.log("Event listener removed!");
    };
  }, []);

  return (
    <div className={gstyles.container}>
      <div>The width of the screen is {width}px.</div>
    </div>
  );
}

export default WindorTracker;
