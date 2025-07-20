//TODO ALWAYS UPDATE preload.cts AS WELL
export type screensType = {
  promise: getScreen[];
};

export type ScreenItem = {
  type: "screen";
  id: number;
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

//TODO UNTIL HERE

type UnsubscribeFunction = () => void;

declare global {
  interface Window {
    electron: {
      subscribeViewer: (
        callback: (screens: screensType) => void
      ) => UnsubscribeFunction;
      getScreenView: () => Promise<getScreen[]>;
    };
  }
}
