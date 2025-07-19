//TODO ALWAYS UPDATE preload.cts AS WELL
export type screensType = {
  promise: getScreen[];
};

export type getScreen = {
  promise: string;
};

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
