import { getAssetPath, getPreloadPath } from "./pathResolver.js";
import path from "path";

const isLinux = process.platform === "linux";

const baseOptions: Electron.BrowserWindowConstructorOptions = {
  width: 1300,
  height: 750,
  frame: false,
  transparent: !isLinux,
  backgroundColor: "#00000000",
  hasShadow: !isLinux,
  show: false,
  titleBarStyle: "hidden",
  icon: path.join(getAssetPath(), "orbzlogo.jpg"),
  // icon: getIconPath(),
  webPreferences: {
    preload: getPreloadPath(),
    contextIsolation: true,
    nodeIntegration: false,
    webSecurity: true,
    sandbox: false,
  },
};

const options =
  process.platform === "darwin"
    ? {
        ...baseOptions,
        scrollBounce: true as any,
        vibrancy: "ultra-dark" as any,
      }
    : baseOptions;

export default options;
