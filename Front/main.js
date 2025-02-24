import { app, BrowserWindow } from "electron";
import path from "path";

function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        autoHideMenuBar: true 
    })
  
    win.loadURL("http://localhost:5173/")
}

app.whenReady().then(() => {
    createWindow()
})