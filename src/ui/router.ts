import { lazy } from "react";

const LandingPage = lazy(() => import("./src/pages/landing/LandingPage"));
const VideosView = lazy(() => import("./src/pages/videos/VideosView"));
const SettingsPage = lazy(() => import("./src/pages/settings/Settings"));
const routes = [
  {
    path: "/",
    element: LandingPage,
  },
  {
    path: "/review",
    element: VideosView,
  },
  {
    path: "/settings",
    element: SettingsPage,
  },
];

export default routes;
