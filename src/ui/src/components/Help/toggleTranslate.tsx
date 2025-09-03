import { useTranslation } from "react-i18next";
import { CustomItemOption } from "../ui/item";

const ToggleTranslate = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "es" : "en";
    i18n.changeLanguage(newLang);
  };

  const fromLang = i18n.language.toUpperCase();
  const toLang = fromLang === "EN" ? "ES" : "EN";

  return (
    <div className="w-full h-full">
      <CustomItemOption
        onClick={toggleLanguage}
        className="flex justify-center items-center gap-2 w-full group"
      >
        <span className="transform transition-transform duration-700 group-hover:-translate-x-2">
          {fromLang}
        </span>
        <div className="transform transition-transform duration-700 group-hover:rotate-360 ">
          <SwapIcon />
        </div>
        <span className="transform transition-transform duration-700 group-hover:translate-x-2">
          {toLang}
        </span>
      </CustomItemOption>
    </div>
  );
};

function SwapIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="#FFFFFF"
      viewBox="0 0 256 256"
    >
      <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm45.66-93.66a8,8,0,0,1,0,11.32l-32,32a8,8,0,0,1-11.32-11.32L148.69,136H88a8,8,0,0,1,0-16h60.69l-18.35-18.34a8,8,0,0,1,11.32-11.32Z"></path>
    </svg>
  );
}

export default ToggleTranslate;
