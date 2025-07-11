
const electron = require("electron");

electron.contextBridge.exposeInMainWorld("electron", {
  subscribeViewer: (callback: (screens: any) => void) => {
    electron.ipcRenderer.on("screens", (_: any, stats: [string]) => {
      callback(stats);
    });
  },
  getScreenView: () => electron.ipcRenderer.invoke("getScreenView"),
});

//? Call it from Google Dev Tools
//* Open DevTools Ctrl+Shift+i

// electron.getScreenView();

//electron.subscribeViewer((data) => {
//     console.log("Received:", data);
// });
