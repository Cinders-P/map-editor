const { ipcMain } = require('electron');

module.exports = (win, newFile) => {
	ipcMain.once('NEW_FILE', (event, arg) => {
		win.webContents.send('FILE_DATA', arg);
		win.maximize();
		newFile.close();
	});
};
