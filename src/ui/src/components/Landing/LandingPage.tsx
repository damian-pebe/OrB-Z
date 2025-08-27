import { useTranslation } from "react-i18next";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Monitor, Settings } from "lucide-react";
import GlassContainer from "../ui/glassContainer";
import TitleWrapper from "../ui/TitleWrapper";
import Options from "./Components/Options";
// import PreviewScreens from "./Components/Views/Preview";
import ViewsList from "./Components/Views/Views";
import ScreenCapture from "./Components/Views/Components/PreviewExample";

function Landing() {
  const { t } = useTranslation("common");
  const [leftSidebarCollapsed, setLeftSidebarCollapsed] = useState(false);
  const [rightSidebarCollapsed, setRightSidebarCollapsed] = useState(false);

  return (
    <div className="w-full h-full flex items-center justify-between pb-5">
      {/* Left Sidebar - ViewsList */}
      <div className="flex-none h-full flex items-center justify-center m-1 font-righteous relative">
        <GlassContainer
          padding="p-2"
          className={`h-full flex items-center justify-center transition-all duration-1000 ease-in-out overflow-hidden ${
            leftSidebarCollapsed ? "w-12" : "w-48"
          }`}
        >
          <div className="w-full h-full">
            {/* Collapsed Icon */}
            <div
              className={`absolute inset-0 flex flex-col items-center justify-center h-full transition-all duration-1000 ease-in-out ${
                leftSidebarCollapsed
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-0 pointer-events-none"
              }`}
            >
              <Monitor size={24} className="text-white" />
            </div>

            {/* Expanded Content */}
            <div
              className={`h-full transition-all duration-1000 ease-in-out origin-left ${
                leftSidebarCollapsed
                  ? "opacity-0 scale-0 pointer-events-none"
                  : "opacity-100 scale-100"
              }`}
            >
              <ViewsList />
            </div>
          </div>
        </GlassContainer>
        {/* Left Toggle Button */}
        <button
          onClick={() => setLeftSidebarCollapsed(!leftSidebarCollapsed)}
          className="absolute -right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 backdrop-blur-md border border-white/30 rounded-full p-1 hover:bg-white/30 transition-all duration-300 text-white"
        >
          {leftSidebarCollapsed ? (
            <ChevronRight size={16} />
          ) : (
            <ChevronLeft size={16} />
          )}
        </button>
      </div>

      {/* Center - Main Video Preview */}
      <div className="flex-1 min-w-0 h-full flex items-center justify-center m-1 font-righteous transition-all duration-1000 ease-in-out">
        <GlassContainer
          className="h-full w-full flex flex-col items-center justify-center"
          padding="p-0"
        >
          <ScreenCapture />
        </GlassContainer>
      </div>

      {/* Right Sidebar - Options */}
      <div className="flex-none h-full flex items-center justify-center m-1 font-righteous relative">
        <GlassContainer
          className={`h-full flex flex-col items-center justify-center transition-all duration-1000 ease-in-out overflow-hidden ${
            rightSidebarCollapsed ? "w-12" : "w-48"
          }`}
        >
          <div className="w-full h-full">
            {/* Collapsed Icon */}
            <div
              className={`absolute inset-0 flex flex-col items-center justify-center h-full transition-all duration-1000 ease-in-out ${
                rightSidebarCollapsed
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-0 pointer-events-none"
              }`}
            >
              <Settings size={24} className="text-white" />
            </div>

            {/* Expanded Content */}
            <div
              className={`h-full transition-all duration-1000 ease-in-out origin-right ${
                rightSidebarCollapsed
                  ? "opacity-0 scale-0 pointer-events-none"
                  : "opacity-100 scale-100"
              }`}
            >
              <TitleWrapper label={t("title.options")}>
                <Options />
              </TitleWrapper>
            </div>
          </div>
        </GlassContainer>
        {/* Right Toggle Button */}
        <button
          onClick={() => setRightSidebarCollapsed(!rightSidebarCollapsed)}
          className="absolute -left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 backdrop-blur-md border border-white/30 rounded-full p-1 hover:bg-white/30 transition-all duration-300 text-white"
        >
          {rightSidebarCollapsed ? (
            <ChevronLeft size={16} />
          ) : (
            <ChevronRight size={16} />
          )}
        </button>
      </div>
    </div>
  );
}

export default Landing;
