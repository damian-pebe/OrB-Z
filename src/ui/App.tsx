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
    <div className="flex flex-col items-center justify-center h-screen font-righteous">
      <h1>{t("welcome")}</h1>
      <p>{t("logout")}</p>
      <ToggleTranslate />
      <PreviewScreens />
    </div>
  );
}

export default App;
