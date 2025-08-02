import { LockOpen, Lock, Eye, EyeOff, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Checkbox } from "../../../../../../components/ui/checkbox";
import AddViews from "./AddViews";

import {
  animatePress,
  toggleStateAt,
  removeItemAtIndex,
  addItem,
} from "./lib/util";
import type { ScreenState } from "./types/types";
import { useTranslation } from "react-i18next";
import { useScreenStore } from "../../../../stores/index";

export default function ViewsList() {
  const { t } = useTranslation("common");
  const initialScreens: ScreenState[] = [];

  const [screens, setScreens] = useState<ScreenState[]>(initialScreens);

  useEffect(() => {
    const sources = useScreenStore.getState().getScreenSources();
    console.log("Screen sources from views:", sources);
  }, [screens]);

  const toggleLock = (index: number) => {
    animatePress(setScreens, index, "pressedLock");
    toggleStateAt(setScreens, index, "locked");
  };

  const toggleVisibility = (index: number) => {
    animatePress(setScreens, index, "pressedVisibility");
    toggleStateAt(setScreens, index, "visible");
  };

  const removeScreen = (index: number) => {
    const id = screens[index].id;

    useScreenStore.getState().removeScreenSourceById(id);

    animatePress(setScreens, index, "pressedDelete");
    removeItemAtIndex(index, [setScreens]);
  };

  const handleAddView = (source: { id: string; name: string }) => {
    useScreenStore.getState().addScreenSource(source);

    const newItem: ScreenState = {
      id: source.id,
      name: source.name,
      locked: false,
      visible: true,
      pressedLock: false,
      pressedVisibility: false,
      pressedDelete: false,
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
            const visPressed = screen.pressedVisibility
              ? "-translate-y-0.5"
              : "";
            const delPressed = screen.pressedDelete ? "-translate-y-0.5" : "";

            return (
              <div
                key={index}
                className="flex items-center gap-2 text-xs text-white"
              >
                <Checkbox
                  id={`item-${index}`}
                  className="transition-all duration-700"
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
                  onClick={() => toggleVisibility(index)}
                  className={`text-white transition-transform duration-150 hover:cursor-pointer ${visPressed}`}
                  aria-label={screen.visible ? "Hide" : "Show"}
                >
                  {screen.visible ? <Eye size={16} /> : <EyeOff size={16} />}
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
          });
          handleAddView({ id: source.id, name: source.name });
        }}
      />

      <button
        className="absolute top-20 right-2 text-white transition-transform duration-700 hover:cursor-pointer hover:-translate-y-0.5"
        onClick={() => {
          useScreenStore.getState().clearScreenSources();

          setScreens([]);
          console.log(
            "Screen sources from views:",
            useScreenStore.getState().getScreenSources()
          );
        }}
      >
        <X />
      </button>
    </div>
  );
}
