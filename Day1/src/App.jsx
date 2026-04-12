import "./App.module.css";
import Counter from "./components/Counter/Counter";
import DynamicList from "./components/DynamicList/DynamicList";
import ProductMain from "./components/Filterable Product Table/ProductMain";
import WindorTracker from "./components/Window Tracker/WindorTracker";

function App() {
  return (
    <>
      <Counter />
      <DynamicList />
      <ProductMain />
      <WindorTracker />
    </>
  );
}

export default App;
