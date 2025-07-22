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

interface AddViewsProps {
  onAdd: (name: string) => void;
}

// const mockScreens = Array.from({ length: 9 }, (_, i) => ({
//   name: `Screen ${i + 1}`,
//   image: "/background.png",
// }));

const mockScreens = [
  {
    name: `Screen 1`,
    type: "screen",
    image: "/background.png",
  },
  {
    name: `Screen 2`,
    type: "screen",
    image: "/background.png",
  },
  {
    name: `Window 1`,
    type: "window",
    image: "/background.png",
  },
  {
    name: `Window 2`,
    type: "window",
    image: "/background.png",
  },
  {
    name: `Window 3`,
    type: "window",
    image: "/background.png",
  },
  {
    name: `Window 4`,
    type: "window",
    image: "/background.png",
  },
  {
    name: `Window 5`,
    type: "window",
    image: "/background.png",
  },
  {
    name: `Window 6`,
    type: "window",
    image: "/background.png",
  },
  {
    name: `Window 7`,
    type: "window",
    image: "/background.png",
  },
  {
    name: `Window 8`,
    type: "window",
    image: "/background.png",
  },
  {
    name: `Window 9`,
    type: "window",
    image: "/background.png",
  },
];

export default function AddViews({ onAdd }: AddViewsProps) {
  const { t } = useTranslation("common");
  const [selectedName, setSelectedName] = useState<string>("");

  const handleSave = () => {
    if (selectedName) {
      onAdd(selectedName);
      setSelectedName("");
    }
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

        <div
          className={`text-sm text-center text-white transform transition-all duration-700 tracking-widest font-poppins mt-1
                    ${
                      selectedName
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 -translate-y-2"
                    }`}
        >
          {t("view.selected_view")}{" "}
          <span className="font-bold">{selectedName}</span>
        </div>

        <div className="flex flex-col gap-6 max-h-96 overflow-y-auto px-2">
          <div>
            <h3 className="text-white text-sm font-lobster mb-2 tracking-widest">
              {t("view.screens")}
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {mockScreens
                .filter((item) => item.type === "screen")
                .map((item) => (
                  <div
                    key={item.name}
                    onClick={() =>
                      setSelectedName((prev) =>
                        prev === item.name ? "" : item.name
                      )
                    }
                    className={`rounded-md p-1 transition-all duration-300 cursor-pointer border-2 ${
                      selectedName === item.name
                        ? "border-white scale-105 shadow-lg"
                        : "border-transparent hover:border-black/30 hover:scale-105"
                    }`}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-50 h-20 object-cover rounded-md"
                    />
                    <p className="text-center text-xs mt-1">{item.name}</p>
                  </div>
                ))}
            </div>
          </div>

          <div>
            <h3 className="text-white text-sm font-lobster mb-2 tracking-widest">
              {t("view.windows")}
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {mockScreens
                .filter((item) => item.type === "window")
                .map((item) => (
                  <div
                    key={item.name}
                    onClick={() =>
                      setSelectedName((prev) =>
                        prev === item.name ? "" : item.name
                      )
                    }
                    className={`rounded-md p-1 transition-all duration-300 cursor-pointer border-2 ${
                      selectedName === item.name
                        ? "border-white scale-105 shadow-lg"
                        : "border-transparent hover:border-black/30 hover:scale-105"
                    }`}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-50 h-20 object-cover rounded-md"
                    />
                    <p className="text-center text-xs mt-1">{item.name}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <button>Cancel</button>
          </DialogClose>
          <DialogClose asChild>
            <button onClick={handleSave} disabled={!selectedName}>
              Save changes
            </button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
