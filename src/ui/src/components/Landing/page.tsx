import { useTranslation } from "react-i18next";
import PreviewScreens from "../viewer/preview";
import GlassContainer from "../ui/glassContainer";
import Options from "./Components/Options";

function Landing() {
  const { t } = useTranslation("common");
  return (
    <div className="w-[100vw] h-[95vh] flex flex-col items-center justify-between">
      <div className="w-full h-[70vh] flex items-center justify-center px-5 gap-5 font-righteous">
        <GlassContainer className="h-full w-[70vw] flex flex-col items-center justify-center">
          <h1 className="text-4xl text-white">{t("welcome")}</h1>
          here ill set the main preview
        </GlassContainer>

        <GlassContainer className="h-full w-[20vw] flex flex-col items-center justify-center">
          <Options />
        </GlassContainer>
      </div>

      <div className="w-full h-[25vh] flex items-center justify-center p-5 gap-5 font-righteous">
        <GlassContainer className="h-full w-[30vw] flex items-center justify-center">
          saved previews
        </GlassContainer>

        <GlassContainer className="h-full w-[60vw] flex items-center justify-center gap-5">
          <div className="w-full flex flex-col">
            <PreviewScreens />
          </div>
          <div className="w-full flex flex-col">second option line</div>
          <div className="w-full flex flex-col">third option line </div>
        </GlassContainer>
      </div>
    </div>
  );
}

export default Landing;
