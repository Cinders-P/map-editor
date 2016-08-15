export default (state = {}, action) => {
	switch (action.type) {
	case 'CHANGE_HIGHLIGHT':
		return {
			path: action.payload.path || state.path,
			pos: action.payload.pos || state.pos,
		};
	default:
		return state;
	}
};
