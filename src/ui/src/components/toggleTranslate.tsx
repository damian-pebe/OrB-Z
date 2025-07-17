import { useTranslation } from "react-i18next";

const ToggleTranslate = () => {
  const { i18n } = useTranslation();

  return (
    <div className="w-full h-full">
      <button onClick={() => i18n.changeLanguage("en")}>English</button>
      <button onClick={() => i18n.changeLanguage("es")}>Español</button>
    </div>
  );
};

export default ToggleTranslate;
