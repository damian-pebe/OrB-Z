import ItemOption from "../../ui/item";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ToggleTranslate from "../../Help/toggleTranslate";

export default function Options() {
  const navigate = useNavigate();
  const { t } = useTranslation("common");

  return (
    <div>
      <ItemOption label={t("logout")} onClick={() => navigate("/")} />
      <ItemOption label={t("logout")} onClick={() => navigate("/")} />
      <ItemOption label={t("logout")} onClick={() => navigate("/")} />
      <ItemOption label={t("logout")} onClick={() => navigate("/")} />
      <ItemOption label={t("logout")} onClick={() => navigate("/")} />
      <ItemOption label={t("logout")} onClick={() => navigate("/")} />
      <ToggleTranslate />
    </div>
  );
}
