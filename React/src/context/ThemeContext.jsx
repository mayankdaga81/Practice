import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

// Step 1 - Create a context
const ThemeContext = createContext();

// Step2 - Create provider function
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const themeToggle = useCallback(() => {
    setTheme((theme) => (theme === "light" ? "dark" : "light"));
  }, []);

  const value = useMemo(() => ({ theme, themeToggle }), [theme, themeToggle]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

// Step 3 - Custom hook
// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};

// Notes

// Step 1

// Step 2 -
// 1. ThemeProvider will accept children, kyuki whenever we wrap any App around theme provider, it basically means that we are passing the App component as child and it is displaying that as it is.
// 2. This ThemeProvider function will have all the states which we would like the children to have without prop drilling.
// 3. Once we have the values defined in state, we would need the setter funcitons to update the value of the state, and for optimizing the performance of the app, we will use useCallback hook to make this more effecient.
// 4. Once we have the setter function ready, we will create a value varible, which will store the information which we want to share with the children. Again we will use useMemo to optimize this.
// 5. Finally we return this value and place the child compoent in it to access the props if required.

// Step 3-
// We have created a custom hook to make sure that any component which is using values from ThemeContext is actually wrapped within the ThemeProvider.

//////////////

// Next, we need to wrap the component where we want all of its child component to have access to the states.
// In this project, I am passing value to every thing, so it is in the main.jsx file

////////
// This is the final step, where we will use the context in components.
// In this project, we have used that in the ThemeSwitcher component.
