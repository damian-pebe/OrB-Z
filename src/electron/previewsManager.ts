import { BrowserWindow } from "electron";
import { getScreen } from "../../types/types.js";
import { ipcWebContentsSend } from "./util.js";

const POLLING_INTERVAL = 500;

export function pollResources(mainWindow: BrowserWindow) {
  setInterval(async () => {
    const values = getScreenView();
    ipcWebContentsSend("screens", mainWindow.webContents , {promise: [values, values]});
  }, POLLING_INTERVAL);
}

export function getScreenView(): getScreen {
  return { promise: "promise" };
}