import { BrowserWindow } from "electron";
import type { getScreen } from "../../types/types.js";
import { ipcWebContentsSend } from "./util.js";

const POLLING_INTERVAL = 500;

export function pollResources(mainWindow: BrowserWindow) {
  setInterval(() => {
    const values = getScreenView();
    ipcWebContentsSend("screens", mainWindow.webContents, { promise: values });
  }, POLLING_INTERVAL);
}

export function getScreenView(): getScreen[] {
  return [
    { promise: "promise" },
    { promise: "promise" },
    { promise: "promise" },
    { promise: "promise" },
  ];
}
