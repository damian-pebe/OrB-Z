import { ItemOption } from "../../ui/item";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ToggleTranslate from "../../Help/toggleTranslate";

export default function Options() {
  const navigate = useNavigate();
  const { t } = useTranslation("common");

  return (
    <div>
      <ItemOption label={t("options.user")} onClick={() => navigate("/user")} />
      <ItemOption
        label={t("options.review")}
        onClick={() => navigate("/review")}
      />
      <ItemOption
        label={t("options.alerts")}
        onClick={() => navigate("/alerts")}
      />
      <ItemOption
        label={t("options.sound")}
        onClick={() => navigate("/sound")}
      />
      <ItemOption
        label={t("options.streams")}
        onClick={() => navigate("/streams")}
      />
      <ItemOption
        label={t("options.dashboard")}
        onClick={() => navigate("/dashboard")}
      />
      <ItemOption
        label={t("options.settings")}
        onClick={() => navigate("/settings")}
      />
      <ToggleTranslate />
    </div>
  );
}
