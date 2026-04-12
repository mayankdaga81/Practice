import { useState } from "react";
import gstyles from "./App.module.css";
import Counter from "./components/Counter/Counter";
import DynamicList from "./components/DynamicList/DynamicList";
import ProductMain from "./components/Filterable Product Table/ProductMain";
import Timer from "./components/The Timer/Timer";
import WindorTracker from "./components/Window Tracker/WindorTracker";

function App() {
  const [showTimer, setShowTimer] = useState(true);

  return (
    <>
      <Counter />
      <DynamicList />
      <ProductMain />
      <WindorTracker />
      <div className={gstyles.container}>
        <div className={gstyles.displayFlexRow}>
          <input
            type="checkbox"
            role="switch"
            checked={showTimer}
            onChange={(e) => setShowTimer(e.target.checked)}
          />
          <span>Show Timer</span>
        </div>
        {showTimer && <Timer />}
      </div>
    </>
  );
}

export default App;
