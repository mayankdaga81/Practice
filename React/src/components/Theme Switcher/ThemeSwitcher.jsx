import { useTheme } from "../../context/ThemeContext";
import styles from "./ThemeSwitcher.module.css";

function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={styles.container}>
      <button onClick={toggleTheme}>
        Switch to {theme === "light" ? "dark" : "light"} mode
      </button>
    </div>
  );
}

export default ThemeSwitcher;
