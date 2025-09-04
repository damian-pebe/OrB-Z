import path from "path";
import { app } from "electron";
import { isDev } from "../util.js";

export function getPreloadPath() {
  return path.join(
    app.getAppPath(),
    isDev() ? "." : ".",
    "/dist-electron/preload.cjs"
  );
}

export function getAssetPath() {
  return path.join(app.getAppPath(), isDev() ? "." : ".", "/src/assets");
}

// export function getIconPath() {
//   // Use platform-specific icon formats
//   if (process.platform === "darwin") {
//     // macOS expects .icns format
//     return path.join(app.getAppPath(), isDev() ? "." : ".", "desktopIcon.icns");
//   } else if (process.platform === "win32") {
//     // Windows expects .ico format
//     return path.join(app.getAppPath(), isDev() ? "." : ".", "desktopIcon.ico");
//   } else {
//     // Linux can use PNG
//     return path.join(app.getAppPath(), isDev() ? "." : ".", "desktopIcon.png");
//   }
// }

// export function getUIPath() {
//   return path.join(app.getAppPath(), "/dist-react/index.html");
// }
