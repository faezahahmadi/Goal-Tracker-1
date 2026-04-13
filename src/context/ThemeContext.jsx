import { createContext, useContext, useMemo, useState } from "react";
import getTheme from "../theme";
import { ThemeProvider } from "@mui/material/styles";


const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
    const [mode, setMode] = useState("light");
    const toggleMode = () => {
        setMode((prev) => (prev === "light" ? "dark" : "light"));
    };
    const theme = useMemo(() => getTheme(mode), [mode]);

    return (
        <ThemeContext.Provider
            value={{ mode, toggleMode, theme }}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    )
}
export const useThemeContext = () => useContext(ThemeContext);
