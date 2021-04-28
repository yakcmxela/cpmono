import { createContext } from "react";

const defaultTheme = {
  alert: "",
  alertActive: false,
  colorScheme: "default",
};

export const ThemeContext = createContext();

export const ThemeProvider = ({ children, theme }) => {
  return (
    <ThemeContext.Provider value={theme ? theme : defaultTheme}>
      {children}
    </ThemeContext.Provider>
  );
};
