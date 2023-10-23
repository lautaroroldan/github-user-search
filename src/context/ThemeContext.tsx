import { createContext, useContext, useState } from "react";

interface ThemeContextType {
    isDarkMode: boolean
    setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>
}

const ThemeContext = createContext<ThemeContextType>({
    isDarkMode: false,
    setIsDarkMode: () => { },
});

export default function ThemeProvider({ children }: any) {

    const [isDarkMode, setIsDarkMode] = useState(false)

    return (
        <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => useContext(ThemeContext)