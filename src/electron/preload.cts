const electron = require("electron");

export type screensType = {
  promise: getScreen[];
};

export type ScreenItem = {
  type: "screen";
  id: number;
  title?: string;
  width: number;
  height: number;
  x: number;
  y: number;
  scaleFactor: number;
};

export type WindowItem = {
  type: "window";
  title: string;
  processId: number;
  width: number;
  height: number;
  x: number;
  y: number;
};

export type getScreen = ScreenItem | WindowItem;

type EventPayloadMapping = {
  screens: screensType;
  getScreenView: getScreen[];
};



electron.contextBridge.exposeInMainWorld("electron", {
  subscribeViewer: (callback) => {
    return ipcOn("screens", (stats) => {
      callback(stats);
    });
  },
  getScreenView: () => ipcInvoke("getScreenView"),
} satisfies Window["electron"]);

function ipcOn<Key extends keyof EventPayloadMapping>(
  key: Key,
  callback: (payload: EventPayloadMapping[Key]) => void
) {
  // cb === callback
  //! this makes so the function return a function, but not call it, so we can unsub
  const cb = (_: Electron.IpcRendererEvent, payload: any) => callback(payload);
  electron.ipcRenderer.on(key, cb);
  return () => electron.ipcRenderer.off(key, cb);
}

function ipcInvoke<Key extends keyof EventPayloadMapping>(
  key: Key
): Promise<EventPayloadMapping[Key]> {
  return electron.ipcRenderer.invoke(key);
}
