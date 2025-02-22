import { useContext } from "react";
import { LanguageContext } from "../context/LanguageProvider";

const useLanguage = () => {
  const language = useContext(LanguageContext);
  return language;
};

export default useLanguage;
