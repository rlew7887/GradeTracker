const { app, BrowserWindow } = require('electron')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600
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