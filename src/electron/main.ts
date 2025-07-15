import { app, BrowserWindow } from "electron";
import path from "path";
import { ipcMainHandle, isDev } from "./util.js";
import options from "./settings/mainWindowConfig.js";
import { getScreenView, pollResources } from "./previewsManager.js";
import { createTray } from "./settings/tray.js";

app.on("ready", () => {
  const mainWindow = new BrowserWindow(options);
  mainWindow.setMenuBarVisibility(false);
  mainWindow.setAutoHideMenuBar(false);

  if (isDev()) {
    mainWindow.loadURL("http://localhost:5123");
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), "/dist-react/index.html"));
  }

  pollResources(mainWindow);

  ipcMainHandle("getScreenView", () => getScreenView());

  createTray(mainWindow);

  handleCloseEvents(mainWindow);
});

function handleCloseEvents(mainWindow: BrowserWindow) {
  let willClose = false;

  mainWindow.on("close", (e) => {
    e.preventDefault();
    mainWindow.hide();
    if (app.dock) {
      app.dock.hide();
    }
  });

  app.on("before-quit", () => {
    willClose = true;
  });

  mainWindow.on("show", () => {
    willClose = false;
  });
}
