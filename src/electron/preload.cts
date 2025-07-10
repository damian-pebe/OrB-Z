const electron = require("electron");

electron.contextBridge.exposeInMainWorld("electron", {
  subscribeViewer: (callback: (statistics: any) => void) => {
    electron.ipcRenderer.on("statistics", (_: any, stats: any) => {
      callback(stats);
    });
  },
  getScreenView: () => console.log("static"),
});

//? Call it from Google Dev Tools
//* Open DevTools Ctrl+Shift+i

// electron.getScreenView();

//electron.subscribeViewer((data) => {
//     console.log("Received:", data);
// });
