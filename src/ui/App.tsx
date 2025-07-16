import { useTranslation } from "react-i18next";
import ToggleTranslate from "./src/components/toggleTranslate";
import PreviewScreens from "./src/components/viewer/preview";

// const Welcome = () =>
//   const { t } = useTranslation("common");

//   return <h1>{t("welcome")}</h1>;
// }; // Another way to use the Translation hook

function App() {
  const { t } = useTranslation("common");
  return (
    <div className="w-[100vw] h-[100vh] flex flex-col items-center justify-between p-5 gap-5">
      <div className="w-full h-[70vh] flex items-center justify-center p-5 gap-5 font-righteous border border-white">
        <h1 className="flex w-full h-full border border-white">
          {t("welcome")}
        </h1>
        <p className="h-full w-[30vw] border border-white">{t("logout")}</p>
      </div>
      <div className="w-full h-[30vh] flex items-center justify-center p-5 gap-5 font-righteous border border-white">
        <ToggleTranslate />
        <PreviewScreens />
      </div>
    </div>
  );
}

export default App;
