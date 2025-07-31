//TODO ALWAYS UPDATE preload.cts AS WELL
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

//TODO UNTIL HERE

type UnsubscribeFunction = () => void;

declare global {
  interface Window {
    electron: {
      subscribeViewer: (
        callback: (screens: screensType) => void
      ) => UnsubscribeFunction;
      getScreenView: () => Promise<getScreen[]>;
      // NEW: generic invoke function for calling IPC handlers
      invoke: <T = unknown>(channel: string, ...args: unknown[]) => Promise<T>;

      // NEW: used to preview a source in renderer
      previewDesktopSource: (sourceId: string) => void;
    };
  }
}
