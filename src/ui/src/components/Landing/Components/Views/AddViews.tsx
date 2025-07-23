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
} from "../../../../../../components/ui/dialog";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useViews } from "./hooks/useViews";

interface AddViewsProps {
  onAdd: (title: string) => void;
}

export default function AddViews({ onAdd }: AddViewsProps) {
  const { t } = useTranslation("common");
  const [selectedItem, setSelectedItem] = useState<{
    type: "screen" | "window";
    id?: number;
    title?: string;
  } | null>(null);

  const { stats, unsubscribe } = useViews();

  const handleSave = () => {
    if (selectedItem) {
      const valueToSave =
        selectedItem.type === "screen"
          ? String(selectedItem.id)
          : selectedItem.title ?? "";

      if (valueToSave) {
        onAdd(valueToSave);
        setSelectedItem(null);
        unsubscribe();
      }
    }
  };

  const handleClose = () => {
    unsubscribe();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="absolute top-2 right-2 text-white transition-transform duration-700 hover:cursor-pointer hover:-translate-y-0.5">
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
          <div>
            <h3 className="text-white text-sm font-lobster mb-2 tracking-widest">
              {t("view.screens")}
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {stats?.promise
                ?.filter((item) => item.type === "screen")
                .map((item, idx) => {
                  const isSelected =
                    selectedItem?.type === "screen" &&
                    selectedItem?.id === item.id;

                  return (
                    <div
                      key={item.id}
                      onClick={() =>
                        setSelectedItem(
                          isSelected ? null : { type: "screen", id: item.id }
                        )
                      }
                      className={`rounded-md p-1 transition-all duration-300 cursor-pointer border-2 ${
                        isSelected
                          ? "border-white scale-105 shadow-lg"
                          : "border-transparent hover:border-black/30 hover:scale-105"
                      }`}
                    >
                      <img
                        src={"/background.png"}
                        alt={`Screen ${idx + 1}`}
                        className="w-50 h-20 object-cover rounded-md"
                      />
                      <p className="text-center text-[10px] mt-1 max-w-[80px] mx-auto break-words leading-tight">
                        {`Screen ${idx + 1}`}
                      </p>
                    </div>
                  );
                })}
            </div>
          </div>

          <div>
            <h3 className="text-white text-sm font-lobster mb-2 tracking-widest">
              {t("view.windows")}
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {stats?.promise
                ?.filter((item) => item.type === "window")
                .map((item) => {
                  const isSelected =
                    selectedItem?.type === "window" &&
                    selectedItem?.title === item.title;

                  return (
                    <div
                      key={item.title}
                      onClick={() =>
                        setSelectedItem(
                          isSelected
                            ? null
                            : { type: "window", title: item.title }
                        )
                      }
                      className={`rounded-md p-1 transition-all duration-300 cursor-pointer border-2 ${
                        isSelected
                          ? "border-white scale-105 shadow-lg"
                          : "border-transparent hover:border-black/30 hover:scale-105"
                      }`}
                    >
                      <img
                        src={"/background.png"}
                        alt={item.title}
                        className="w-50 h-20 object-cover rounded-md"
                      />
                      <p className="text-center text-[10px] mt-1 max-w-[80px] mx-auto break-words leading-tight">
                        {item.title}
                      </p>
                    </div>
                  );
                })}
            </div>
          </div>
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
              disabled={!selectedItem}
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
