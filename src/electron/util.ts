import { ipcMain } from "electron";
import type { WebContents } from "electron";
import type { EventPayloadMapping } from "../../types/types.js";

export function isDev(): boolean {
  return process.env.NODE_ENV === "development";
}

export function ipcMainHandle<Key extends keyof EventPayloadMapping>(
  key: Key,
  handler: () => EventPayloadMapping[Key]
) {
  ipcMain.handle(key, () => {
    return handler();
  });
}

export function ipcWebContentsSend<Key extends keyof EventPayloadMapping>(
  key: Key,
  webContents: WebContents,
  payload: EventPayloadMapping[Key]
) {
  webContents.send(key, payload);
}

// export function validateEventFrame(frame: WebFrameMain) {
//   if (isDev() && new URL(frame.url).host === "localhost:5123") {
//     return;
//   }

//   if (frame.url !== pathToFileURL(getUIPath()).toString()) {
//     throw new Error("Malicious event");
//   }
// }