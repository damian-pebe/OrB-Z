import { BrowserWindow } from "electron";
import { ipcWebContentsSend } from "./util.js";

import { screen } from "electron";
import { windowManager } from "node-window-manager"; // make sure this is installed
import type { getScreen, ScreenItem, WindowItem } from "../../types/types.d.ts";

const POLLING_INTERVAL = 500;

export function pollResources(mainWindow: BrowserWindow) {
  setInterval(() => {
    const values = getScreenView();
    ipcWebContentsSend("screens", mainWindow.webContents, { promise: values });
  }, POLLING_INTERVAL);
}

// export function getScreenView(): getScreen[] {
//   return [
//     { type: "screen", id: 1, width: 1920, height: 1080, x: 0, y: 0, scaleFactor: 1 },
//     { type: "screen", id: 2, width: 1280, height: 720, x: 1920, y: 0, scaleFactor: 1 },
//     { type: "window", title: "Window 1", processId: 1234, width: 800, height: 600, x: 0, y: 0 },
//     { type: "window", title: "Window 2", processId: 5678, width: 1024, height: 768, x: 800, y: 0 },
//   ];
// }

export function getScreenView(): getScreen[] {
  const screens: ScreenItem[] = screen.getAllDisplays().map((display) => ({
    type: "screen",
    id: display.id,
    width: display.bounds.width,
    height: display.bounds.height,
    x: display.bounds.x,
    y: display.bounds.y,
    scaleFactor: display.scaleFactor,
  }));

 const windows: WindowItem[] = windowManager
   .getWindows()
   .filter((win) => win.isVisible() && win.getTitle().trim() !== "")
   .map((win) => {
     const bounds = win.getBounds();
     return {
       type: "window",
       title: win.getTitle(),
       processId: win.processId,
       width: bounds.width ?? 0,
       height: bounds.height ?? 0,
       x: bounds.x ?? 0,
       y: bounds.y ?? 0,
     };
   });


  return [...screens, ...windows];
}
