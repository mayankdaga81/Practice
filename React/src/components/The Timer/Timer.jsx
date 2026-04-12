import gstyle from "../../App.module.css";
import { useState } from "react";
import { useEffect } from "react";

function Timer() {
  const [time, setTime] = useState(0);

  useEffect(() => {
    function handleTime() {
      setTime((time) => time + 1);
    }

    const timeInterval = setInterval(() => {
      handleTime();
    }, 1000);

    // This is very important majorly from a front end engineer point of view as this will clear the intervel event from the memory, which will avoid any memory leak, and it will also present our application from having a ghost bug where the component is unmounted, but console messages and all are still coming up.
    return () => {
      clearInterval(timeInterval);
      console.log("Set interval has been cleared!");
    };
  }, []);

  return <div className={gstyle.container}>Time elapsed is {time}</div>;
}

export default Timer;
