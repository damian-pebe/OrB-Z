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

electron.contextBridge.exposeInMainWorld("electron", {
  subscribeViewer: (callback) => {
    return ipcOn("screens", (stats) => {
      callback(stats);
    });
  },
  getScreenView: () => ipcInvoke("getScreenView"),
} satisfies Window["electron"]);

function ipcInvoke<Key extends keyof EventPayloadMapping>(
  key: Key
): Promise<EventPayloadMapping[Key]> {
  return electron.ipcRenderer.invoke(key);
}

function ipcOn<Key extends keyof EventPayloadMapping>(
  key: Key,
  callback: (payload: EventPayloadMapping[Key]) => void
) {
  // cd === callback
  //! this makes so the function return a function, but not call it, so we can unsub
  const cb = (_: Electron.IpcRendererEvent, payload: any) => callback(payload);
  electron.ipcRenderer.on(key, cb);
  return () => electron.ipcRenderer.off(key, cb);
}
