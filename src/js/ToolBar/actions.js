export const select = (num) => ({ type: 'CHANGE_TOOL', payload: num });

export const changeSheet = (path, row, col) => ({
	type: 'CHANGE_SHEET',
	payload: { path, row, col },
});

export const highlightSprite = (coords, path, pos) => (dispatch) => {
	dispatch({
		type: 'CHANGE_HIGHLIGHT',
		payload: { coords, path, pos },
	});
	dispatch({
		type: 'CHANGE_TOOL',
		payload: 0,
	});
};

export const paintTile = (brushData, key, selected) => {
	// i.e. selected === 0
	if (!selected) {
		return ({
			type: 'PAINT_TILE',
			payload: {
				path: brushData.path,
				pos: brushData.pos,
				row: +key.slice(0, key.indexOf(',')),
				col: +key.slice(key.indexOf(',') + 1),
			},
		});
	}
	return ({
		type: 'PAINT_TILE',
		payload: {
			path: '',
			pos: null,
			row: +key.slice(0, key.indexOf(',')),
			col: +key.slice(key.indexOf(',') + 1),
		},
	});
};

export const setDrag = (type) => ({
	type: 'SET_DRAG',
	payload: type,
});
