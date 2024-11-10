const { contextBridge, ipcRenderer } = require('electron')
const electron = require('electron');
const ipc = require('electron').ipcRenderer

contextBridge.exposeInMainWorld('expose', {
    Send: (channel, data) => {
        ipcRenderer.send(channel, data);
    },
    Receive: (channel, func) => {
        ipcRenderer.on(channel, (event, ...args) => func(...args));
    },
    appClose: () => {
        ipc.send('close')
    }
});




