import { useTranslation } from "react-i18next";
import PreviewScreens from "../viewer/preview";
import GlassContainer from "../ui/glassContainer";
import TitleWrapper from "../ui/TitleWrapper";
import Options from "./Components/Options";

function Landing() {
  const { t } = useTranslation("common");
  return (
    <div className="w-[100vw] h-full flex flex-col items-center justify-between">
      <div className="w-full h-[65vh] flex items-center justify-center px-5 gap-5 font-righteous">
        <GlassContainer className="h-full w-[70vw] flex flex-col items-center justify-center">
          <h1 className="text-4xl text-white">{t("welcome")}</h1>
          here ill set the main preview
        </GlassContainer>

        <GlassContainer className="h-full w-[20vw] flex flex-col items-center justify-center">
          <TitleWrapper label={t("title.options")}>
            <Options />
          </TitleWrapper>
        </GlassContainer>
      </div>

      <div className="w-full h-[25vh] flex items-center justify-center p-5 gap-5 font-righteous">
        <GlassContainer className="h-full w-[30vw] flex items-center justify-center">
          <GlassContainer className="h-fll w-full p-5">
            <></>
          </GlassContainer>
        </GlassContainer>

        <GlassContainer className="h-full w-[60vw] flex items-center justify-center gap-5">
          <div className="w-full flex flex-col">
            <PreviewScreens />
            <PreviewScreens />
          </div>
          <div className="w-full flex flex-col">
            <PreviewScreens />
            <PreviewScreens />
          </div>
          <div className="w-full flex flex-col">
            <PreviewScreens />
            <PreviewScreens />
          </div>
        </GlassContainer>
      </div>
    </div>
  );
}

export default Landing;
