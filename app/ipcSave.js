const { dialog, ipcMain } = require('electron');
const json = require('jsonfile');
const fs = require('fs');

const writeToFile = (filename, win) => {
	win.webContents.send('GET_SAVEDATA');
	ipcMain.once('REPLY_SAVEDATA', (event, arg) => {
		console.log(arg);
		// json.writeFile(filename, { hello: 'hey' }, err => {
		// 	if (err) {
		// 		dialog.showErrorBox('Error Saving Data', err.message);
		// 	}
		// });
	});
};
const cb = (i, win) => {
	dialog.showSaveDialog({
		defaultPath: `${__dirname}/maps/tilemap-${i}`,
		filters: [
			{ name: 'Javascript Object Notation', extensions: ['json'] },
		],
	}, filename => {
		if (filename) {
			writeToFile(filename, win);
		}
	});
};

const saveFile = (win) => {
	new Promise(resolve => {
		fs.access(`${__dirname}/maps/`, fs.F_OK, err => {
			if (err) {
				fs.mkdirSync(`${__dirname}/maps/`);
			}
			resolve();
		});
	}).then(() => {
		fs.readdir(`${__dirname}/maps/`, (err, files) => {
			let i = 0;
			while (++i) {
				if (!files.includes(`tilemap-${i}.json`)) {
					cb(i, win);
					break;
				}
			}
		});
	});
};

module.exports = function (WHat) {};
