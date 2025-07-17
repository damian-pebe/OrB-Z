import { getAssetPath, getPreloadPath } from "./pathResolver.js";
import path from "path";

const baseOptions: Electron.BrowserWindowConstructorOptions = {
  width: 1000,
  height: 700,
  frame: false,
  titleBarStyle: "hidden",
  icon: path.join(
    getAssetPath(),
    // process.platform === "darwin" ? "orbz.png" :
    "orbz.png"
  ),

  webPreferences: {
    preload: getPreloadPath(),
  },
};

const options =
  process.platform === "darwin"
    ? { ...baseOptions, scrollBounce: true as any }
    : baseOptions;

export default options;
