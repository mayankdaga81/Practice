import gstyles from "../../styles/App.module.css";
import styles from "./Loader.module.css";

function Loader() {
  return (
    <div className={`${gstyles.container} ${styles.loader}`}>Loading...</div>
  );
}

export default Loader;
