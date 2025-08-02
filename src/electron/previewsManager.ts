import { BrowserWindow, desktopCapturer } from "electron";
import { ipcWebContentsSend } from "./util.js";

import { screen } from "electron";
import { windowManager } from "node-window-manager";
import type { getScreen, ScreenItem, WindowItem } from "../../types/types.d.ts";

const POLLING_INTERVAL = 500;

export function pollResources(mainWindow: BrowserWindow) {
  setInterval(() => {
    const values = getScreenView();
    ipcWebContentsSend("screens", mainWindow.webContents, { promise: values });
  }, POLLING_INTERVAL);
}

export async function getSourceById(
  id: string
): Promise<Electron.DesktopCapturerSource | undefined> {
  const sources = await desktopCapturer.getSources({
    types: ["window", "screen"],
  });
  return sources.find((s) => s.id === id);
}

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

  const rawWindows = windowManager.getWindows();
  const appMap = new Map<string, number>();

  const filteredWindows: WindowItem[] = rawWindows
    .filter((win) => {
      const title = win.getTitle().trim();
      const owner = win.getOwner() as { name?: string };
      const ownerName = owner?.name?.toLowerCase() || "";

      const ignoreTitles = [
        "search",
        "start",
        "program manager",
        "action center",
        "new notification",
        "windows shell experience host",
        "microsoft text input application",
        "rzmonitorforegroundwindow",
        "filter application windows",
        "picture in picture",
        "task switching",
        "orb z", //APP NAME CAUSE WE WONT RE-STREAM IT
      ];

      const titleLower = title.toLowerCase();

      if (!win.isVisible() || title === "") return false;
      if (ignoreTitles.some((t) => titleLower.includes(t))) return false;
      if (ownerName.includes("explorer") || ownerName.includes("system"))
        return false;

      return true;
    })
    .map((win) => {
      const bounds = win.getBounds();
      const owner = win.getOwner() as { name?: string };

      const rawName = owner.name?.replace(/\.[^/.]+$/, "") || "";
      const windowTitle = win.getTitle().trim();
      const baseName = rawName || windowTitle || "UnknownApp";
      const appName = baseName;

      const count = appMap.get(appName) || 0;
      appMap.set(appName, count + 1);

      const instanceSuffix = count > 0 ? ` ${count + 1}` : "";
      const title = `${appName}${instanceSuffix}`;

      return {
        type: "window",
        title,
        processId: win.processId,
        width: bounds.width ?? 0,
        height: bounds.height ?? 0,
        x: bounds.x ?? 0,
        y: bounds.y ?? 0,
      };
    });

  return [...screens, ...filteredWindows];
}
