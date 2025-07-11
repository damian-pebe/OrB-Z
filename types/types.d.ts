export type screensType = {
  promise: getScreen[];
};

export type getScreen = {
  promise: string;
};

//TODO ALWAYS UPDATE preload.cts as well
type EventPayloadMapping = {
  screens: screensType;
  getScreenView: getScreen;
};

declare global {
  interface Window {
    electron: {
      subscribeViewer: (callback: (screens: screensType) => void) => void;
      getScreenView: () => Promise<getScreen>;
    };
  }
}
