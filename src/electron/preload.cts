const electron = require("electron");

electron.contextBridge.exposeInMainWorld("electron", {
  subscribeScreenRecording: (callback: (statistics: any) => void) => callback({}),
  getScreenRecording: () => console.log("static"),
});

//? Call it from Google Dev Tools
//* Open DevTools Ctrl+Shift+i

// electron.getScreenRecording(); 

//electron.subscribeScreenRecording((data) => {
//     console.log("Received:", data);
// });
