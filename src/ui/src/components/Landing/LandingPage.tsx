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
    <div className="w-full h-full flex items-center justify-between">
      <div className="flex-1 min-w-0 h-full flex flex-col items-center justify-center m-5 gap-y-5 font-righteous">
        <GlassContainer
          className="h-full w-full flex flex-col items-center justify-center"
          padding="p-0"
        >
          <ScreenCapture />
        </GlassContainer>
        <GlassContainer
          padding="p-2"
          className="h-full w-full flex items-center justify-center"
        >
          <ViewsList />
        </GlassContainer>
      </div>

      <div className="flex-none h-full flex items-center justify-center m-5 font-righteous">
        <GlassContainer className="h-full w-auto flex flex-col items-center justify-center">
          <TitleWrapper label={t("title.options")}>
            <Options />
          </TitleWrapper>
        </GlassContainer>
      </div>
    </div>
  );
}

export default Landing;
