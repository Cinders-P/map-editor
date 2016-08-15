import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import TileMap from './TileMap/TileMap.jsx';
import ToolBar from './ToolBar/ToolBar.jsx';
import tileDataReducer from './TileMap/tileDataReducer.js';
import brushReducer from './ToolBar/brushReducer.js';
import brushDataReducer from './ToolBar/brushDataReducer.js';
import ipc from './ipc.js';

const initialState = {
	fileData: {},
	tileData: [],
	brush: {
		drag: false,
		selected: 0,
		path: '',
		row: 0,
		col: 0,
		highlight: [],
	},
	brushData: {
		path: '',
		pos: null,
	},
};

const masterReducer = combineReducers({
	fileData: ipc.fileDataReducer,
	tileData: tileDataReducer,
	brush: brushReducer,
	brushData: brushDataReducer,
});

const middleware = applyMiddleware(logger(), thunk);

let store = createStore(masterReducer, initialState, middleware);
ipc.accessSave(store);
ipc.waitFileData(store).then(() => {
	// document.addEventListener('DOMContentLoaded', () => {
	// });
	ReactDOM.render(
			<Provider store={store}>
				<div className='flex-row full-height'>
					<TileMap/>
					<ToolBar/>
				</div>
			</Provider>, document.getElementById('root')
		);
});
