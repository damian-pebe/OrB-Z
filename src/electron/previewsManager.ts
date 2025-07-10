import { BrowserWindow } from "electron";

const POLLING_INTERVAL = 500;

export function pollResources(mainWindow: BrowserWindow) {
  setInterval(async () => {
    const values = await getValue();
    // console.log(values)
    mainWindow.webContents.send("statistics", values);
  }, POLLING_INTERVAL);
}

function getValue() {
  return new Promise<string>((resolve) => {
    resolve("promise");
  });
}


export function getPreviews(){
    return getValue()
}