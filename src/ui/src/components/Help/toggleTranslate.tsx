import { useTranslation } from "react-i18next";
import { CustomItemOption } from "../ui/item";

const ToggleTranslate = () => {
  const { i18n } = useTranslation("common");

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
        <SwapIcon />
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
      fill="#f0e0e0"
      viewBox="0 0 256 256"
    >
      <path d="M224,48V152a16,16,0,0,1-16,16H99.31l10.35,10.34a8,8,0,0,1-11.32,11.32l-24-24a8,8,0,0,1,0-11.32l24-24a8,8,0,0,1,11.32,11.32L99.31,152H208V48H96v8a8,8,0,0,1-16,0V48A16,16,0,0,1,96,32H208A16,16,0,0,1,224,48ZM168,192a8,8,0,0,0-8,8v8H48V104H156.69l-10.35,10.34a8,8,0,0,0,11.32,11.32l24-24a8,8,0,0,0,0-11.32l-24-24a8,8,0,0,0-11.32,11.32L156.69,88H48a16,16,0,0,0-16,16V208a16,16,0,0,0,16,16H160a16,16,0,0,0,16-16v-8A8,8,0,0,0,168,192Z"></path>
    </svg>
  );
}

export default ToggleTranslate;
