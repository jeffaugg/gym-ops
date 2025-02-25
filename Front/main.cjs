const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

function createWindow() {
  const isDev = !app.isPackaged;
  app.commandLine.appendSwitch("disable-frame-rate-limit");
  app.commandLine.appendSwitch("disable-gpu-vsync");


  let win = new BrowserWindow({
    width: 1200,
    height: 800,
    autoHideMenuBar: true,
    webPreferences: {
      preload: isDev
        ? path.join(__dirname, "preload.js")
        : path.join(app.getAppPath(), "dist", "preload", "preload.js"),
      nodeIntegration: false, // Disable for security reasons
      contextIsolation: true, // Enable for security reasons
      enableRemoteModule: false,
    },
  });

  win.setMenuBarVisibility(false);

  if (isDev) {
    win.loadURL("http://localhost:5173");
  } else {
    win.loadFile(path.join(app.getAppPath(), "dist", "index.html"));
  }

  win.webContents.on("did-fail-load", (event, errorCode, errorDescription) => {
    console.error(`Failed to load: ${errorDescription} (${errorCode})`);
  });

  win.webContents.on("did-finish-load", () => {
    win.webContents.executeJavaScript(`
      const meta = document.createElement('meta');
      meta.httpEquiv = 'Content-Security-Policy';
      meta.content = "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://fonts.googleapis.com; img-src 'self' data:; connect-src 'self' http://164.68.101.141:3001";
      document.getElementsByTagName('head')[0].appendChild(meta);
    `);
  });

  win.on("closed", () => {
    win = null;
  });
}

// Adicione manipuladores IPC
ipcMain.on("toMain", (event, args) => {
  // Processar dados recebidos do renderer
  console.log("Dados recebidos do renderer:", args);

  // Lógica do processo principal
  const resultado = `Processado pelo processo principal: ${args}`;

  // Enviar resposta de volta ao renderer
  event.reply("fromMain", resultado);
});

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});