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
import { useTranslation } from "react-i18next";
import { useScreenStore } from "../../../../stores/index";
import AddViews from "./Components/AddViews";

export default function ViewsList() {
  const { t } = useTranslation("common");
  const [screens, setScreens] = useState<ScreenState[]>([]);

  const sources = useScreenStore((state) => state.screenSources);
  const toggleVisible = useScreenStore((state) => state.setScreenVisibleById);

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
    useScreenStore.getState().removeScreenSourceById(id);
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

  return (
    <div className="w-full h-full flex justify-between gap-2">
      <div className="h-full min-w-3xl overflow-y-auto">
        {screens.length === 0 ? (
          <div className="text-white text-sm font-poiret">
            - {t("view.add_views_to_preview")}
          </div>
        ) : (
          screens.map((screen, index) => {
            const lockPressed = screen.pressedLock ? "-translate-y-0.5" : "";
            const delPressed = screen.pressedDelete ? "-translate-y-0.5" : "";

            return (
              <div
                key={screen.id}
                className="flex items-center gap-2 text-xs text-white"
              >
                <Checkbox
                  checked={screen.visible || false}
                  onCheckedChange={(checked) => {
                    const isVisible = Boolean(checked);
                    toggleVisible(screen.id, isVisible);
                    console.log(
                      `[${screen.id}] Visibility changed to: ${isVisible}`
                    );
                  }}
                />

                <div className="flex mt-1 w-15 font-nunito truncate overflow-hidden whitespace-nowrap">
                  {screen.name}
                </div>

                <button
                  onClick={() => removeScreen(index)}
                  className={`text-white transition-transform duration-150 hover:cursor-pointer ${delPressed}`}
                  aria-label="Delete"
                >
                  <Trash2 size={16} />
                </button>

                <button
                  onClick={() => toggleLock(index)}
                  className={`text-white transition-transform duration-150 hover:cursor-pointer mr-5 ${lockPressed}`}
                  aria-label={screen.locked ? "Unlock" : "Lock"}
                >
                  {screen.locked ? <LockOpen size={16} /> : <Lock size={16} />}
                </button>
              </div>
            );
          })
        )}
      </div>

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

      <button
        className="absolute bottom-2 right-2 text-white transition-transform duration-700 hover:cursor-pointer hover:-translate-y-0.5 text-[8px] font-nunito flex flex-col items-center"
        onClick={() => {
          useScreenStore.getState().clearScreenSources();
          setScreens([]);
        }}
      >
        <X />
        Clear
      </button>
    </div>
  );
}
