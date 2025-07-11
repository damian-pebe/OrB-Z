const electron = require("electron");
export type screensType = {
  promise: getScreen[];
};

export type getScreen = {
  promise: string;
};
type EventPayloadMapping = {
  screens: screensType;
  getScreenView: getScreen;
};

function ipcInvoke<Key extends keyof EventPayloadMapping>(
  key: Key
): Promise<EventPayloadMapping[Key]> {
  return electron.ipcRenderer.invoke(key);
}

function ipcOn<Key extends keyof EventPayloadMapping>(
  key: Key,
  callback: (payload: EventPayloadMapping[Key]) => void
) {
  electron.ipcRenderer.on(key, (_: any, payload: any) => callback(payload));
}

electron.contextBridge.exposeInMainWorld("electron", {
  subscribeViewer: (callback) => {
    ipcOn("screens", (stats) => {
      callback(stats);
    });
  },
  getScreenView: () => ipcInvoke("getScreenView"),
} satisfies Window["electron"]);
