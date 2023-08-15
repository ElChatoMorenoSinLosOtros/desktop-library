/* eslint-disable import/order */
// eslint-disable-next-line import/no-extraneous-dependencies
import { app, BrowserWindow } from 'electron';
import path from 'node:path';

process.env.DIST = path.join(__dirname, '../dist');
process.env.PUBLIC = app.isPackaged
  ? process.env.DIST
  : path.join(process.env.DIST, '../public');

let win: BrowserWindow | null;
const { VITE_DEV_SERVER_URL } = process.env;

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString());
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL).catch((e: Error) => {
      throw Error(e.message);
    });
  } else {
    win
      .loadFile(path.join(process.env.DIST, 'index.html'))
      .catch((e: Error) => {
        throw Error(e.message);
      });
  }
}

app.on('window-all-closed', () => {
  win = null;
});

app
  .whenReady()
  .then(createWindow)
  .catch((e: Error) => {
    throw Error(e.message);
  });
