import { useTranslation } from "react-i18next";
import ToggleTranslate from "./src/components/toggleTranslate";

const Welcome = () => {
  const { t } = useTranslation("common");

  return <h1>{t("welcome")}</h1>;
};

const Logout = () => {
  const { t } = useTranslation("common");

  return <p>{t("logout")}</p>;
};

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Welcome />
      <Logout />
      <ToggleTranslate />
    </div>
  );
}

export default App;
