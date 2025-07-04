import { useTranslation } from "react-i18next";

const ToggleTranslate = () => {
  const { i18n } = useTranslation();

  return (
    <>
      <button onClick={() => i18n.changeLanguage("en")}>English</button>
      <button onClick={() => i18n.changeLanguage("es")}>Español</button>
    </>
  );
};

export default ToggleTranslate;
