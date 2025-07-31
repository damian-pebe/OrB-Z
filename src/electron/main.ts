import { app, BrowserWindow, desktopCapturer, session } from "electron";
import path from "path";
import { ipcMainHandle, isDev } from "./util.js";
import options from "./settings/mainWindowConfig.js";
import { getScreenView, pollResources } from "./previewsManager.js";
import { createTray } from "./settings/tray.js";
import { fetchDesktopSources } from "./lib/desktopSources.js";

app.on("ready", () => {
  const mainWindow = new BrowserWindow(options);
  // mainWindow.setMenuBarVisibility(false);
  mainWindow.setAutoHideMenuBar(false);

  // session.defaultSession.setDisplayMediaRequestHandler(
  //   (_, callback) => {
  //     desktopCapturer.getSources({ types: ["screen"] }).then((sources) => {
  //       if (sources.length > 0) {
  //         callback({
  //           video: sources[0],
  //           audio: "loopback",
  //         });
  //       } else {
  //         callback({ video: undefined, audio: undefined });
  //       }
  //     });
  //   },
  //   { useSystemPicker: false }
  // );

  session.defaultSession.setDisplayMediaRequestHandler((request, callback) => {
    console.log("[Electron] Handling display media request");

    // Just return the first screen by default (or you can hardcode test ID if needed)
    desktopCapturer
      .getSources({ types: ["screen", "window"] })
      .then((sources) => {
        console.log(
          "[Electron] Available sources:",
          sources.map((s) => s.id)
        );

        if (sources.length > 0) {
          const defaultSource = sources[0];

          callback({
            video: defaultSource,
          });
        } else {
          callback({
            video: undefined,
          });
        }
      });
  });

  if (isDev()) {
    mainWindow.loadURL("http://localhost:5123");
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), "/dist-react/index.html"));
  }

  pollResources(mainWindow);

  ipcMainHandle("getScreenView", () => getScreenView());
  ipcMainHandle("getDesktopSources", () => fetchDesktopSources());

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
