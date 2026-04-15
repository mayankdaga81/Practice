import { useTheme } from "../../context/ThemeContext";
import styles from "./ThemeSwitcher.module.css";

function ThemeSwitcher() {
  const { theme, themeToggle } = useTheme();

  return (
    <div className={styles.container}>
      <button onClick={themeToggle}>
        Switch to {theme === "light" ? "dark" : "light"} mode
      </button>
    </div>
  );
}

export default ThemeSwitcher;
