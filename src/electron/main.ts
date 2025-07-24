import { app, BrowserWindow, desktopCapturer, session } from "electron";
import path from "path";
import { ipcMainHandle, isDev } from "./util.js";
import options from "./settings/mainWindowConfig.js";
import { getScreenView, pollResources } from "./previewsManager.js";
import { createTray } from "./settings/tray.js";

app.on("ready", () => {
  const mainWindow = new BrowserWindow(options);
  // mainWindow.setMenuBarVisibility(false);
  mainWindow.setAutoHideMenuBar(false);

  session.defaultSession.setDisplayMediaRequestHandler(
    (request, callback) => {
      desktopCapturer.getSources({ types: ["screen"] }).then((sources) => {
        if (sources.length > 0) {
          callback({
            video: sources[0],
            audio: "loopback",
          });
        } else {
          callback({ video: undefined, audio: undefined });
        }
      });
    },
    { useSystemPicker: false }
  );

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
