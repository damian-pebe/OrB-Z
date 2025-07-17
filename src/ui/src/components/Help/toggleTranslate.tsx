import { useTranslation } from "react-i18next";
import ItemOption from "../ui/item";

const ToggleTranslate = () => {
  const { i18n } = useTranslation("common");

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "es" : "en";
    i18n.changeLanguage(newLang);
  };

  return (
    <div className="w-full h-full">
      <ItemOption
        label={i18n.language === "en" ? "Español" : "English"}
        onClick={toggleLanguage}
      />
    </div>
  );
};

export default ToggleTranslate;
