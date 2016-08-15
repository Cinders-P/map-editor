const { ipcRenderer } = window.require('electron');

export default {
	accessSave({ getState }) {
		ipcRenderer.on('GET_SAVEDATA', (event) => {
			const s = JSON.parse(JSON.stringify(getState().tileData));
			for (let r = 0; r < s.length; r++) {
				for (let c = 0; c < s[r].length; c++) {
					if (s[r][c].path) {
						s[r][c].path = /(\w+\..+)$/g.exec(s[r][c].path)[1];
					}
				}
			}
			event.sender.send('REPLY_SAVEDATA', {
				metaData: getState().fileData,
				tileData: s,
			});
		});
	},
	waitFileData: ({ dispatch }) =>
		new Promise(resolve => {
			ipcRenderer.on('FILE_DATA', (event, arg) => {
				dispatch({ type: 'SET_FILEDATA', payload: arg });
				dispatch({ type: 'INIT_TILEDATA', payload: { row: arg.row, col: arg.col } });
				resolve();
			});
		}),
	fileDataReducer(state = {}, action) {
		switch (action.type) {
		case 'SET_FILEDATA':
			return action.payload;
		default:
			return state;
		}
	},
};
