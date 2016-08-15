export default (state = [], action) => {
	const x = action.payload;
	// keeps the original array intact by creating a new copy instead of a reference
	const newState = state.slice();
	const t = [];
	switch (action.type) {
	case 'INIT_TILEDATA':
		for (let r = 0; r < x.row; r++) {
			t[r] = [];
			for (let c = 0; c < x.col; c++) {
				t[r].push({
					path: '',
					pos: null,
				});
			}
		}
		return t;
	case 'PAINT_TILE':
		newState[x.row][x.col] = {
			path: x.path,
			pos: x.pos,
		};
		return newState;
	default:
		return state;
	}
};
