import { useTranslation } from "react-i18next";
import ToggleTranslate from "../toggleTranslate";
import PreviewScreens from "../viewer/preview";
import GlassContainer from "../ui/glassContainer";

function Landing() {
  const { t } = useTranslation("common");

  return (
    <div className="w-[100vw] h-[95vh] flex flex-col items-center justify-between">
      <div className="w-full h-[70vh] flex items-center justify-center p-5 gap-5 font-righteous">
        <GlassContainer className="h-full w-[60vw] flex items-center justify-center">
          <h1 className="text-4xl text-white">{t("welcome")}</h1>
        </GlassContainer>

        <GlassContainer className="h-full w-[30vw] flex items-center justify-center">
          <p className="text-lg text-white">{t("logout")}</p>
        </GlassContainer>
      </div>

      <div className="w-full h-[25vh] flex items-center justify-center p-5 gap-5 font-righteous">
        <GlassContainer className="h-full w-[30vw] flex items-center justify-center">
          <ToggleTranslate />
        </GlassContainer>

        <GlassContainer className="h-full w-[60vw] flex items-center justify-center">
          <PreviewScreens />
        </GlassContainer>
      </div>
    </div>
  );
}

export default Landing;
