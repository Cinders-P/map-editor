import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MTile from './MTile.jsx';
import { paintTile, setDrag } from '../ToolBar/actions.js';

const TileMap = ({ tileData, paintTile, brushData, size, setDrag, drag, selected }) =>
<div id='tileMap'
	className='flex-column'
	onMouseDown={setDrag.bind(null, 'on')}
	onMouseUp={setDrag.bind(null, 'off')}
	onDragStart={(e) => { e.preventDefault(); }}
	onDrop={(e) => { e.preventDefault(); }}>
	{tileData.map((row, i1) =>
		<div key={`r${i1}`} className='row' style={{
			height: `${+size + 1}px`,
		}}>
			{row.map((data, i2) =>
				<MTile
					key={`r${i1}c${i2}`}
					index={`${i1},${i2}`}
					data={data}
					paintTile={paintTile}
					brushData={brushData}
					size={size}
					drag={drag}
					selected={selected}
				/>
			)}
		</div>
	)}
</div>;

const mapStateToProps = state => ({
	tileData: state.tileData,
	brushData: state.brushData,
	size: state.fileData.grid,
	drag: state.brush.drag,
	selected: state.brush.selected,
});
const mapDispatchToProps = dispatch => bindActionCreators({ paintTile, setDrag }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TileMap);
