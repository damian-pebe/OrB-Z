export type screensType = {
  promise: [string];
};

export type getScreen = {
  promise: string;
};

declare global {
  interface Window {
    electron: {
      subscribeViewer: (callback: (screens: screensType) => void) => void;
      getScreenView: () => Promise<getScreen>;
    };
  }
}
