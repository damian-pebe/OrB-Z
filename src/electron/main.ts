import {
  app,
  BrowserWindow,
  desktopCapturer,
  ipcMain,
  session,
} from "electron";
import path from "path";
import { ipcMainHandle, isDev } from "./util.js";
import options from "./settings/mainWindowConfig.js";

import { createTray } from "./settings/tray.js";
import { fetchDesktopSources } from "./lib/desktopSources.js";

interface ExtendedDisplayMediaRequest
  extends Electron.DisplayMediaRequestHandlerHandlerRequest {
  video?: {
    mandatory?: {
      chromeMediaSourceId?: string;
    };
  };
}

app.on("ready", () => {
  const mainWindow = new BrowserWindow(options);
  // mainWindow.setMenuBarVisibility(false);
  mainWindow.setAutoHideMenuBar(false);

  session.defaultSession.setDisplayMediaRequestHandler(
    (request: ExtendedDisplayMediaRequest, callback) => {
      const requestedId = request.video?.mandatory?.chromeMediaSourceId;

      desktopCapturer
        .getSources({ types: ["screen", "window"] })
        .then((sources) => {
          const match = sources.find((s) => s.id === requestedId);
          callback({ video: match });
        });
    }
  );

  if (isDev()) {
    mainWindow.loadURL("http://localhost:5123");
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), "/dist-react/index.html"));
  }

  ipcMainHandle("getDesktopSources", () => fetchDesktopSources());

  createTray(mainWindow);

  handleCloseEvents(mainWindow);

  ipcMain.handle("window:minimize", () => {
    if (!mainWindow.isDestroyed()) {
      mainWindow.minimize();
    }
  });

  ipcMain.handle("window:close", () => {
    if (!mainWindow.isDestroyed()) {
      (mainWindow as any).__allowClose = true;
      mainWindow.close();
    }
  });
});

function handleCloseEvents(mainWindow: BrowserWindow) {
  mainWindow.on("close", (e) => {
    if (!(mainWindow as any).__allowClose) {
      e.preventDefault();
      mainWindow.hide();
      if ((app as any).dock) {
        (app as any).dock.hide();
      }
    }
  });

  app.on("before-quit", () => {
    (mainWindow as any).__allowClose = true;
  });
}
