import { LockOpen, Lock, Eye, EyeOff, Trash2 } from "lucide-react";
import { useState } from "react";
import { Checkbox } from "../../../../../../components/ui/checkbox";
import AddViews from "./AddViews";

export default function ViewsList() {
  // Example initial screens
  const initialScreens = [{ name: "Screen 1", locked: null }];

  const [screens, setScreens] = useState(initialScreens);
  const [locks, setLocks] = useState<boolean[]>(
    initialScreens.map((screen) => screen.locked ?? false)
  );
  const [visibility, setVisibility] = useState<boolean[]>(
    initialScreens.map(() => true)
  );

  const [pressedLocks, setPressedLocks] = useState<boolean[]>(
    initialScreens.map(() => false)
  );
  const [pressedVisibility, setPressedVisibility] = useState<boolean[]>(
    initialScreens.map(() => false)
  );
  const [pressedDelete, setPressedDelete] = useState<boolean[]>(
    initialScreens.map(() => false)
  );

  const animatePress = (
    setter: React.Dispatch<React.SetStateAction<boolean[]>>,
    index: number
  ) => {
    setter((prev) => {
      const updated = [...prev];
      updated[index] = true;
      return updated;
    });
    setTimeout(() => {
      setter((prev) => {
        const updated = [...prev];
        updated[index] = false;
        return updated;
      });
    }, 150);
  };

  const toggleLock = (index: number) => {
    animatePress(setPressedLocks, index);
    setLocks((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };

  const toggleVisibility = (index: number) => {
    animatePress(setPressedVisibility, index);
    setVisibility((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index];
      console.log(`Visibility for ${screens[index].name}:`, updated[index]);
      return updated;
    });
  };

  const removeScreen = (index: number) => {
    animatePress(setPressedDelete, index);
    setTimeout(() => {
      setScreens((prev) => prev.filter((_, i) => i !== index));
      setLocks((prev) => prev.filter((_, i) => i !== index));
      setVisibility((prev) => prev.filter((_, i) => i !== index));
      setPressedLocks((prev) => prev.filter((_, i) => i !== index));
      setPressedVisibility((prev) => prev.filter((_, i) => i !== index));
      setPressedDelete((prev) => prev.filter((_, i) => i !== index));
      console.log(`Removed screen at index ${index}`);
    }, 150);
  };

  const handleAddView = (name: string) => {
    setScreens((prev) => [...prev, { name, locked: null }]);
    setLocks((prev) => [...prev, false]);
    setVisibility((prev) => [...prev, true]);
    setPressedLocks((prev) => [...prev, false]);
    setPressedVisibility((prev) => [...prev, false]);
    setPressedDelete((prev) => [...prev, false]);
  };

  return (
    <div className="w-full h-full flex justify-between gap-2">
      <div className="h-full min-w-3xl overflow-y-auto">
        {screens.map((screen, index) => {
          const isLocked = locks[index];
          const isVisible = visibility[index];
          const lockPressed = pressedLocks[index] ? "-translate-y-0.5" : "";
          const visPressed = pressedVisibility[index] ? "-translate-y-0.5" : "";
          const delPressed = pressedDelete[index] ? "-translate-y-0.5" : "";

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
                aria-label={isVisible ? "Hide" : "Show"}
              >
                {isVisible ? <Eye size={16} /> : <EyeOff size={16} />}
              </button>

              <button
                onClick={() => toggleLock(index)}
                className={`text-white transition-transform duration-150 hover:cursor-pointer mr-5 ${lockPressed}`}
                aria-label={isLocked ? "Unlock" : "Lock"}
              >
                {isLocked ? <LockOpen size={16} /> : <Lock size={16} />}
              </button>
            </div>
          );
        })}
      </div>

      <AddViews onAdd={handleAddView} />
      {/* <PreviewScreens /> */}
    </div>
  );
}
