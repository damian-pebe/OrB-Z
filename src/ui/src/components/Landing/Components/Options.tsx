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

  const options = [
    { label: t("options.user"), icon: <UserCircle2 />, route: "/user" },
    { label: t("options.review"), icon: <Monitor />, route: "/review" },
    {
      label: t("options.alerts"),
      icon: <AlertTriangleIcon />,
      route: "/alerts",
    },
    { label: t("options.sound"), icon: <Volume2 />, route: "/sound" },
    { label: t("options.streams"), icon: <LucideVideo />, route: "/streams" },
    {
      label: t("options.dashboard"),
      icon: <LayoutDashboard />,
      route: "/dashboard",
    },
    { label: t("options.settings"), icon: <Settings />, route: "/settings" },
  ];

  return (
    <div className="space-y-1">
      {options.map((option, index) => (
        <div
          key={option.route}
          className="animate-in slide-in-from-right duration-1000 ease-out"
          style={{
            animationDelay: `${index * 80}ms`,
            animationFillMode: "backwards",
          }}
        >
          <IconItemOption
            label={option.label}
            icon={option.icon}
            onClick={() => navigate(option.route)}
          />
        </div>
      ))}
      <div
        className="animate-in slide-in-from-right duration-1000 ease-out"
        style={{
          animationDelay: `${options.length * 80}ms`,
          animationFillMode: "backwards",
        }}
      >
        <ToggleTranslate />
      </div>
    </div>
  );
}
