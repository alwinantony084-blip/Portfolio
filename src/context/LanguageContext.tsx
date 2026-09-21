import { createContext, useContext, useState, ReactNode } from "react";
import { translations, Lang } from "../data/translations";

interface LangContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (typeof translations)["en"];
}

const LanguageContext = createContext<LangContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
