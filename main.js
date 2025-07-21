const { app, BrowserWindow } = require('electron')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 900,
    height: 600,
    webPreferences: { // temporary for debugging
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    } // temporary
  })

  win.loadFile('index.html')

  // enable right-click to open DevTools console
  win.webContents.on('context-menu', (_, params) => {
    win.webContents.inspectElement(params.x, params.y);
  });
}

app.whenReady().then(() => {
  createWindow()
})