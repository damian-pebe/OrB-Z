import { app, BrowserWindow, Menu, Tray } from "electron";
import path from "path";
import { getAssetPath } from "./pathResolver.js";

export function createTray(mainWindow: BrowserWindow) {
  const tray = new Tray(
    path.join(
      getAssetPath(),
      // process.platform === "darwin" ? "orbz.png" :
      "orbzTemplate.png"
    )
  );

  tray.setContextMenu(
    Menu.buildFromTemplate([
      {
        label: "Open OrB Z",
        click: () => {
          app.show();
          if (app.dock) {
            app.dock.show();
          }
        },
      },
      { label: "Quit OrB Z", click: () => app.quit() },
    ])
  );
}
