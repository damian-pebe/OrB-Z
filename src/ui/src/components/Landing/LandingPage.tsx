import { useTranslation } from "react-i18next";
import GlassContainer from "../ui/glassContainer";
import TitleWrapper from "../ui/TitleWrapper";
import Options from "./Components/Options";
// import PreviewScreens from "./Components/Views/Preview";
import ViewsList from "./Components/Views/Views";
import ScreenCapture from "./Components/Views/Components/PreviewExample";

function Landing() {
  const { t } = useTranslation("common");

  return (
    // gotta implement the new layout
    <div className="w-full h-[90vh] flex items-center justify-between">
      <div className="w-[70vw] h-full flex flex-col items-center justify-center px-5 gap-5 font-righteous">
        <GlassContainer className="h-full w-full flex flex-col items-center justify-center">
          <ScreenCapture />
        </GlassContainer>
        <GlassContainer
          padding="p-2"
          className="h-full w-full flex items-center justify-center"
        >
          <ViewsList />
        </GlassContainer>
      </div>

      <div className="w-full h-full flex items-center justify-center p-5 gap-5 font-righteous">
        <GlassContainer className="h-full w-[20vw] flex flex-col items-center justify-center">
          <TitleWrapper label={t("title.options")}>
            <Options />
          </TitleWrapper>
        </GlassContainer>
      </div>
    </div>
  );
}

export default Landing;
