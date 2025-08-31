import { getAssetPath, getPreloadPath } from "./pathResolver.js";
import path from "path";

const baseOptions: Electron.BrowserWindowConstructorOptions = {
  width: 1300,
  height: 750,
  frame: false,
  titleBarStyle: "hidden",
  icon: path.join(getAssetPath(), "orbzlogo.jpg"),

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
    ? { ...baseOptions, scrollBounce: true as any }
    : baseOptions;

export default options;
