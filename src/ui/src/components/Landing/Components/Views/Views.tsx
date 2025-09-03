import { LockOpen, Lock, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Checkbox } from "../../../../../../components/ui/checkbox";
import {
  animatePress,
  toggleStateAt,
  removeItemAtIndex,
  addItem,
} from "./lib/util";
import type { ScreenState } from "./types/types";
import { useScreenStore } from "../../../../stores/index";
import AddViews from "./Components/AddViews";
import { useTranslation } from "react-i18next";

export default function ViewsList() {
  const { t } = useTranslation();
  const [screens, setScreens] = useState<ScreenState[]>([]);

  const sources = useScreenStore((state) => state.screenSources);
  const toggleVisible = useScreenStore((state) => state.setScreenVisibleById);
  const setAllVisible = useScreenStore((state) => state.setAllScreensVisible);

  useEffect(() => {
    const restoredScreens = sources.map((source) => ({
      id: source.id,
      name: source.name,
      locked: false,
      visible: source.visible ?? true,
      pressedLock: false,
      pressedDelete: false,
      pressedVisibility: false,
    }));

    setScreens(restoredScreens);
  }, [sources]);

  const toggleLock = (index: number) => {
    animatePress(setScreens, index, "pressedLock");
    toggleStateAt(setScreens, index, "locked");
  };

  const removeScreen = (index: number) => {
    const id = screens[index].id;

    useScreenStore.getState().setScreenVisibleById(id, false);

    setTimeout(() => {
      useScreenStore.getState().removeScreenSourceById(id);
    }, 100);

    animatePress(setScreens, index, "pressedDelete");
    removeItemAtIndex(index, [setScreens]);
  };

  const handleAddView = (source: { id: string; name: string }) => {
    useScreenStore.getState().addScreenSource({
      id: source.id,
      name: source.name,
      visible: true,
    });

    const newItem: ScreenState = {
      id: source.id,
      name: source.name,
      locked: false,
      visible: true,
      pressedLock: false,
      pressedDelete: false,
      pressedVisibility: false,
    };

    addItem(newItem, [setScreens]);
  };

  const hideAllViews = () => {
    setAllVisible(false);

    setTimeout(() => {
      const updatedSources = useScreenStore.getState().screenSources;

      setScreens((prev) => {
        const updated = prev.map((s) => ({ ...s, visible: false }));
        return updated;
      });

      const stillVisible = updatedSources.filter((s) => s.visible);
      if (stillVisible.length > 0) {
        stillVisible.forEach((source) => {
          useScreenStore.getState().setScreenVisibleById(source.id, false);
        });
      }
    }, 50);
  };

  const clearAllViews = () => {
    setAllVisible(false);

    setTimeout(() => {
      useScreenStore.getState().clearScreenSources();

      try {
        localStorage.removeItem("screen-sources-storage");
      } catch (e) {}

      setTimeout(() => {
        const finalSources = useScreenStore.getState().screenSources;

        setScreens([]);

        if (finalSources.length > 0) {
          useScreenStore.setState({ screenSources: [] });
        }
      }, 50);
    }, 200);
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="h-full w-full flex-1">
        {screens.length === 0 ? (
          <div className="text-white text-sm font-poiret transition-all duration-1000 ease-in-out">
            - {t("view.add_views_to_preview")}
          </div>
        ) : (
          screens.map((screen, index) => {
            const lockPressed = screen.pressedLock ? "-translate-y-0.5" : "";
            const delPressed = screen.pressedDelete ? "-translate-y-0.5" : "";

            return (
              <div
                key={screen.id}
                className="flex items-center gap-2 text-xs text-white w-full"
              >
                <Checkbox
                  checked={screen.visible || false}
                  onCheckedChange={(checked) => {
                    const isVisible = Boolean(checked);

                    toggleVisible(screen.id, isVisible);

                    setScreens((prev) =>
                      prev.map((s) =>
                        s.id === screen.id ? { ...s, visible: isVisible } : s
                      )
                    );
                  }}
                />

                <div className="flex mt-1 w-full font-nunito truncate overflow-hidden whitespace-nowrap">
                  {screen.name}
                </div>

                <button
                  onClick={() => removeScreen(index)}
                  className={`text-white transition-transform duration-300 hover:cursor-pointer hover:-translate-y-0.5 ${delPressed}`}
                  aria-label="Delete"
                >
                  <Trash2 size={16} />
                </button>

                <button
                  onClick={() => toggleLock(index)}
                  className={`text-white transition-transform duration-300 hover:cursor-pointer hover:-translate-y-0.5 ${lockPressed}`}
                  aria-label={screen.locked ? "Unlock" : "Lock"}
                >
                  {screen.locked ? <LockOpen size={16} /> : <Lock size={16} />}
                </button>
              </div>
            );
          })
        )}
      </div>

      <div className="flex justify-between items-center w-full mt-2 pt-2 border-t border-white/10">
        <div className="flex gap-2">
          <button
            className="text-white transition-transform duration-700 hover:cursor-pointer hover:-translate-y-0.5 text-[8px] font-nunito flex flex-col items-center"
            onClick={hideAllViews}
          >
            <X size={12} />
            Hide All
          </button>

          <button
            className="text-white transition-transform duration-700 hover:cursor-pointer hover:-translate-y-0.5 text-[8px] font-nunito flex flex-col items-center"
            onClick={clearAllViews}
          >
            <X size={12} />
            Clear
          </button>
        </div>

        <div className="flex">
          <AddViews
            onAdd={(source) => {
              useScreenStore.getState().addScreenSource({
                id: source.id,
                name: source.name,
                visible: true,
              });
              handleAddView({ id: source.id, name: source.name });
            }}
          />
        </div>
      </div>
    </div>
  );
}
