const { app, BrowserWindow, Menu } = require('electron');
const ipc = require('./ipcRelay.js');
const saveFile = require('./ipcSave.js');

process.env.NODE_ENV = 'production';

// Let window be global so it isn't garbage collected by the system.
let win;
let newFile;
// function declarations
const initNewFile = () => {
	newFile = new BrowserWindow({
		width: 300,
		height: 200,
		resizable: false,
		title: 'New File',
		show: false,
		autoHideMenuBar: true,
	});
	newFile.loadURL(`file:${__dirname}/app/html/new.html`);
	newFile.once('ready-to-show', () => {
		newFile.show();
	});
	ipc(win, newFile);
};

const menu = [{
	label: 'File',
	submenu: [{
		label: 'New File',
		accelerator: 'CmdOrCtrl+N',
		click() {
			if (!newFile.isDestroyed()) {
				newFile.show();
			} else {
				initNewFile();
			}
		},
	},
		{
			label: 'Save As',
			accelerator: 'CmdOrCtrl+S',
			click() {
				saveFile(win);
			},
		},
		{
			label: 'Open Dev Tools',
			accelerator: 'CmdOrCtrl+Shift+I',
			click: () => {
				win.webContents.toggleDevTools();
			},
		},
		{
			label: 'Quit',
			accelerator: 'CmdOrCtrl+Q',
			role: 'quit',
		},
	],
}];

Menu.setApplicationMenu(Menu.buildFromTemplate(menu));

function createWindow() {
	win = new BrowserWindow({
		width: 1200,
		height: 700,
		useContentSize: true,
		resizable: true,
		title: 'Map Editor',
		show: false,
		// autoHideMenuBar: true,
	});
	win.loadURL(`file:${__dirname}/app/html/index.html`);

	initNewFile();

	win.on('closed', () => {
		win = null;
	});
}

// Give electron some time to setup.
app.on('ready', createWindow);

app.on('window-all-closed', () => {
	// MacOS applications typically stay active in the menu bar until ctrl + Q is used
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	// Another special case for mac
	if (win === null) {
		createWindow();
	}
});
