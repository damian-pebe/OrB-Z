import { BrowserWindow } from "electron";

const POLLING_INTERVAL = 500;

export function pollResources(mainWindow: BrowserWindow) {
  setInterval(async () => {
    const values = await getScreenView();
    mainWindow.webContents.send("screens", [values, values]);
  }, POLLING_INTERVAL);
}

export function getScreenView() {
  return new Promise<string>((resolve) => {
    resolve("promise");
  });
}
