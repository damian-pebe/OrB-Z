const baseOptions: Electron.BrowserWindowConstructorOptions = {
  width: 800,
  height: 700,
  frame: false,
  titleBarStyle: "hidden",
  webPreferences: {
    nodeIntegration: true,
  },
};

const options =
  process.platform === "darwin"
    ? { ...baseOptions, scrollBounce: true as any }
    : baseOptions;

export default options;
