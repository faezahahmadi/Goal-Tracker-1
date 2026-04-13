import { createContext, useContext, useEffect, useState } from "react";
import { translation } from "../translation";

const languageContext = createContext();
export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState("en");
    const dir = language === "fa" ? "rtl" : "ltr";

    useEffect(() => {
        document.documentElement.dir = dir;

    }, [language]);

    const toggleLanguage = (lang) => { setLanguage(lang); };
    const t = (key) => {
        return translation[language][key] || key;
    };
    return (
        <languageContext.Provider
            value={{ language, toggleLanguage, t, dir }}>
            {children}
        </languageContext.Provider>
    )
}
export const useLanguage = () => useContext(languageContext);