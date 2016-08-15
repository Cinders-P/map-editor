export default (state = {}, action) => {
	switch (action.type) {
	case 'SET_DRAG':
		if (action.payload === 'on') {
			return { ...state, drag: true };
		}
		return { ...state, drag: false };
	case 'CHANGE_TOOL':
		return { ...state, selected: action.payload };
	case 'CHANGE_SHEET':
		return { ...state,
			path: action.payload.path,
			row: action.payload.row,
			col: action.payload.col,
		};
	case 'CHANGE_HIGHLIGHT':
		return { ...state, highlight: action.payload.coords || state.highlight };
	default:
		return state;
	}
};
