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
import {
  getScreenView,
  getSourceById,
  pollResources,
} from "./previewsManager.js";
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

  pollResources(mainWindow);

  ipcMainHandle("getScreenView", () => getScreenView());
  ipcMainHandle("getDesktopSources", () => fetchDesktopSources());
  ipcMain.handle("getDesktopSourceById", async (_, id: string) => {
    const source = await getSourceById(id);
    return source;
  });
  createTray(mainWindow);

  handleCloseEvents(mainWindow);
});

function handleCloseEvents(mainWindow: BrowserWindow) {
  let willClose = false;
  console.log(willClose);
  mainWindow.on("close", (e) => {
    e.preventDefault();
    mainWindow.hide();
    if (app.dock) {
      app.dock.hide();
    }
  });

  app.on("before-quit", () => {
    willClose = true;
    console.log("App is quitting, closing main window.");
  });

  mainWindow.on("show", () => {
    willClose = false;
    console.log("Main window is shown.");
  });
}
