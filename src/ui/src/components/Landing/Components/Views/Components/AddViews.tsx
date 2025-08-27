import { PlusCircleIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogClose,
} from "../../../../../../../components/ui/dialog";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";

type DesktopSource = {
  id: string;
  name: string;
  type: "screen" | "window";
  thumbnail: string;
};

interface AddViewsProps {
  onAdd: (source: DesktopSource) => void;
}

export default function AddViews({ onAdd }: AddViewsProps) {
  const { t } = useTranslation("common");
  const [selectedSourceId, setSelectedSourceId] = useState<string | null>(null);
  const [sources, setSources] = useState<DesktopSource[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    window.electron
      .invoke<DesktopSource[]>("getDesktopSources")
      .then((res) => {
        setSources(res);
        console.log("[AddViews] Sources loaded:", res);
      })
      .catch((err) =>
        console.error("[AddViews] Failed to fetch sources:", err)
      );
  }, [isOpen]);

  const handleSave = () => {
    if (selectedSourceId) {
      const selected = sources.find((s) => s.id === selectedSourceId);
      if (selected) {
        onAdd(selected);
      }
      setSelectedSourceId(null);
      setIsOpen(false);
    }
  };

  const handleClose = () => {
    setSelectedSourceId(null);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="text-white transition-transform duration-700 hover:cursor-pointer hover:-translate-y-0.5">
          <PlusCircleIcon width={20} />
        </button>
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="w-full bg-cover overflow-hidden text-white font-cormorant"
        style={{ backgroundImage: "url('/background.png')" }}
      >
        <DialogHeader className="font-poiret tracking-widest">
          <DialogTitle>{t("view.add_preview")}</DialogTitle>
          <DialogDescription className="text-xs text-white">
            {t("view.add_preview_description")}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-6 max-h-96 overflow-y-auto px-2">
          {["screen", "window"].map((type) => (
            <div key={type}>
              <h3 className="text-white text-sm font-lobster mb-2 tracking-widest">
                {t(`view.${type}s`)}
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {sources
                  .filter((s) => s.type === type)
                  .map((source) => {
                    const isSelected = selectedSourceId === source.id;
                    return (
                      <div
                        key={source.id}
                        onClick={() =>
                          setSelectedSourceId(isSelected ? null : source.id)
                        }
                        className={`rounded-md p-1 transition-all duration-300 cursor-pointer border-2 ${
                          isSelected
                            ? "border-white scale-105 shadow-lg"
                            : "border-transparent hover:border-black/30 hover:scale-105"
                        }`}
                      >
                        <img
                          src={source.thumbnail}
                          alt={source.name}
                          className="w-50 h-20 object-cover rounded-md"
                        />
                        <p className="text-center text-[10px] mt-1 max-w-[80px] mx-auto break-words leading-tight">
                          {source.name}
                        </p>
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <button
              onClick={handleClose}
              className="bg-gray-500 text-white px-4 py-2 rounded-md"
            >
              Cancel
            </button>
          </DialogClose>
          <DialogClose asChild>
            <button
              onClick={handleSave}
              disabled={!selectedSourceId}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Save changes
            </button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
