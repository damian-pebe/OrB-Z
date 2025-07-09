import { app, BrowserWindow } from "electron";
import path from "path";
import { isDev } from "./util.js";
import options from "./mainWindowConfig.js";

app.on("ready", () => {
  const mainWindow = new BrowserWindow(options);
  mainWindow.setMenuBarVisibility(false);
  mainWindow.setAutoHideMenuBar(false);

  if (isDev()) {
    mainWindow.loadURL("http://localhost:5123");
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), "/dist-react/index.html"));
  }
});

//TODO because i remove the menu

// Build your own title bar UI using HTML/CSS/React inside your app.

// Add buttons for close, minimize, maximize/restore.

// Hook them to Electron window APIs using ipcRenderer or @electron/remote.
