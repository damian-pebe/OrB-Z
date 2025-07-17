import { IconItemOption } from "../../ui/item";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ToggleTranslate from "../../Help/toggleTranslate";
import {
  AlertTriangleIcon,
  LayoutDashboard,
  LucideVideo,
  Monitor,
  Settings,
  UserCircle2,
  Volume2,
} from "lucide-react";

export default function Options() {
  const navigate = useNavigate();
  const { t } = useTranslation("common");

  return (
    <div>
      <IconItemOption
        label={t("options.user")}
        icon={<UserCircle2 />}
        onClick={() => navigate("/user")}
      />
      <IconItemOption
        label={t("options.review")}
        icon={<Monitor />}
        onClick={() => navigate("/review")}
      />
      <IconItemOption
        label={t("options.alerts")}
        icon={<AlertTriangleIcon />}
        onClick={() => navigate("/alerts")}
      />
      <IconItemOption
        label={t("options.sound")}
        icon={<Volume2 />}
        onClick={() => navigate("/sound")}
      />
      <IconItemOption
        label={t("options.streams")}
        icon={<LucideVideo />}
        onClick={() => navigate("/streams")}
      />
      <IconItemOption
        label={t("options.dashboard")}
        icon={<LayoutDashboard />}
        onClick={() => navigate("/dashboard")}
      />
      <IconItemOption
        label={t("options.settings")}
        icon={<Settings />}
        onClick={() => navigate("/settings")}
      />
      <ToggleTranslate />
    </div>
  );
}
