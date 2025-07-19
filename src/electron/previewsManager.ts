import { BrowserWindow } from "electron";
import { ipcWebContentsSend } from "./util.js";
import { getScreen } from "../../types/types.js";

const POLLING_INTERVAL = 500;

export function pollResources(mainWindow: BrowserWindow) {
  setInterval(() => {
    const values = getScreenView();
    ipcWebContentsSend("screens", mainWindow.webContents, { promise: values });
  }, POLLING_INTERVAL);
}

export function getScreenView(): getScreen[] {
  return [
    { type: "screen", id: 1, width: 1920, height: 1080, x: 0, y: 0, scaleFactor: 1 },
    { type: "screen", id: 2, width: 1280, height: 720, x: 1920, y: 0, scaleFactor: 1 },
    { type: "window", title: "Window 1", processId: 1234, width: 800, height: 600, x: 0, y: 0 },
    { type: "window", title: "Window 2", processId: 5678, width: 1024, height: 768, x: 800, y: 0 },
  ];
}
