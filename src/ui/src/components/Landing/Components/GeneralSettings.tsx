import {
  BookMarkedIcon,
  BookmarkPlus,
  Power,
  PowerOff,
} from "lucide-react";
import { IconItemOption } from "../../ui/item";
import { useTranslation } from "react-i18next";

export default function GeneralSettings() {
  const { t } = useTranslation("common");

  return (
    <div className="h-full flex items-center justify-center gap-5">
      <div className="w-full flex flex-col">
        <IconItemOption
          label={t("view.template")}
          icon={<BookmarkPlus />}
          onClick={() => {}}
        />
        <IconItemOption
          label={t("view.edit-templates")}
          icon={<BookMarkedIcon />}
          onClick={() => {}}
        />
      </div>
      <div className="w-full flex flex-col">
        <IconItemOption
          label={t("llm.enabled")}
          className="bg-green-900/30"
          icon={<Power />}
          onClick={() => {}}
          disabled={false}
        />
        <IconItemOption
          label={t("llm.disabled")}
          className="bg-red-900/30"
          icon={<PowerOff />}
          onClick={() => {}}
          disabled={true}
        />
      </div>
    </div>
  );
}
