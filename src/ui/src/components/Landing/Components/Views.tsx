import { LockOpen, Lock } from "lucide-react";
import { useState } from "react";
import { Checkbox } from "../../../../../components/ui/checkbox";

export default function ViewsList() {
  const screens = [
    { name: "Screen 1", locked: null },
    { name: "Screen 2", locked: true },
    { name: "Screen 3", locked: null },
    { name: "Screen 4", locked: true },
    { name: "Screen 5", locked: null },
    { name: "Screen 6", locked: null },
    { name: "Screen 7", locked: null },
    { name: "Screen 8", locked: null },
    { name: "Screen 9", locked: null },
  ];

  const [locks, setLocks] = useState<boolean[]>(
    screens.map((screen) => screen.locked ?? false)
  );

  const toggleLock = (index: number) => {
    setLocks((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };

  return (
    <div className="h-full w-full overflow-y-auto">
      {screens.map((screen, index) => {
        const isLocked = locks[index];
        return (
          <div
            key={index}
            className="flex items-center gap-2 text-xs text-white"
          >
            <Checkbox
              id={`item-${index}`}
              className="transition-all duration-700"
            />
            <div className="flex-1 mt-1 font-nunito">{screen.name}</div>
            <button
              onClick={() => toggleLock(index)}
              className="mr-5 text-white hover:cursor-pointer hover:-translate-y-0.5 transition-transform duration-700 "
              aria-label={isLocked ? "Lock" : "Unlock"}
            >
              {isLocked ? <LockOpen size={16} /> : <Lock size={16} />}
            </button>
          </div>
        );
      })}
    </div>
  );
}
