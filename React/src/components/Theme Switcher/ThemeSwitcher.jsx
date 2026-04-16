import { useTheme } from "../../context/ThemeContext";
import gstyles from "../../styles/App.module.css";

function ThemeSwitcher() {
  const { theme, themeToggle } = useTheme();

  return (
    <div className={gstyles.container}>
      <button onClick={themeToggle}>
        Switch to {theme === "light" ? "dark" : "light"} mode
      </button>
    </div>
  );
}

export default ThemeSwitcher;
