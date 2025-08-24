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

export type DesktopSource = {
  id: string;
  name: string;
  type: "screen" | "window";
  thumbnail: string;
};

type DesktopCapturerSourceMinimal = {
  id: string;
  name: string;
  thumbnail?: string;
};

export type getScreen = ScreenItem | WindowItem;

type EventPayloadMapping = {
  screens: screensType;
  getScreenView: getScreen[];
  getDesktopSources: DesktopSource[];
};

const { contextBridge, ipcRenderer } = electron;

contextBridge.exposeInMainWorld("electron", {
  minimize: () => ipcRenderer.invoke("window:minimize"),
  close: () => ipcRenderer.invoke("window:close"),
  subscribeViewer: (callback) => {
    return ipcOn("screens", (stats) => {
      callback(stats);
    });
  },
  getScreenView: () => ipcInvoke("getScreenView"),

  getSourceById: (id: string) => ipcRenderer.invoke("getDesktopSourceById", id),

  invoke: (channel, ...args) => ipcRenderer.invoke(channel, ...args),

  previewDesktopSource: (sourceId: string) => {
    window.dispatchEvent(
      new CustomEvent("source-selected", { detail: sourceId })
    );
  },
} satisfies Window["electron"]);

// ipc helpers

function ipcOn<Key extends keyof EventPayloadMapping>(
  key: Key,
  callback: (payload: EventPayloadMapping[Key]) => void
) {
  const cb = (_: Electron.IpcRendererEvent, payload: any) => callback(payload);
  ipcRenderer.on(key, cb);
  return () => ipcRenderer.off(key, cb);
}

function ipcInvoke<Key extends keyof EventPayloadMapping>(
  key: Key,
  ...args: unknown[]
): Promise<EventPayloadMapping[Key]> {
  return ipcRenderer.invoke(key, ...args);
}
