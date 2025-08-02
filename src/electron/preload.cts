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

export type getScreen = ScreenItem | WindowItem;

type EventPayloadMapping = {
  screens: screensType;
  getScreenView: getScreen[];
  getDesktopSources: DesktopSource[];
};

const { contextBridge, ipcRenderer, desktopCapturer } = electron;

contextBridge.exposeInMainWorld("electron", {
  subscribeViewer: (callback) => {
    return ipcOn("screens", (stats) => {
      callback(stats);
    });
  },
  getScreenView: () => ipcInvoke("getScreenView"),

  invoke: (channel, ...args) => ipcRenderer.invoke(channel, ...args),

  previewDesktopSource: (sourceId: string) => {
    window.dispatchEvent(
      new CustomEvent("source-selected", { detail: sourceId })
    );
  },

  getSourceById: (id: string) => ipcRenderer.invoke("getDesktopSourceById", id),
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

export async function getSourceById(
  id: string
): Promise<DesktopCapturerSource | undefined> {
  const sources = await desktopCapturer.getSources({
    types: ["window", "screen"],
  });
  return sources.find((s) => s.id === id);
}
