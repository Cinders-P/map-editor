import React from 'react';
import { connect } from 'react-redux';
import Tile from './Tile.jsx';
import { highlightSprite } from './actions.js';

const SpriteMap = ({ brush, highlight, size }) => {
	const tiles = [];
	for (let i = 0; i < brush.row; i++) {
		tiles[i] = [];
		for (let k = 0; k < brush.col; k++) {
			if (brush.highlight.join('') === `${i}${k}`) {
				tiles[i].push(<Tile
					key={(i * brush.row) + k}
					path={ brush.path }
					pos={{ x: i * -size, y: k * -size }}
					highlight={highlight}
					highlighted
					size={size}
					/>);
			} else {
				tiles[i].push(<Tile
				key={(i * brush.row) + k}
				path={ brush.path }
				pos={{ x: i * -size, y: k * -size }}
				highlight={highlight}
				size={size}
				/>);
			}
		}
	}
	let i = 0;
	if (tiles.length) {
		if (brush.wrap) {
			return (
				<div className='flex-wrap flex-row font-0 overflow-auto'>
					{ tiles.map(row =>
						<span
							key={(brush.row * brush.col) + ++i}
							style={{ width: `${+size + 1}px` }}
						>{ row }</span>
					)}
				</div>
			);
		}
		return (
			<div className='flex-wrap flex-row font-0 overflow-auto'>
				{ tiles.map(row =>
					<div key={(brush.row * brush.col) + ++i} style={{ width: `${+size + 1}px` }} >
						{ row }
					</div>
				)}
			</div>
		);
	}
	return <p>No file selected.</p>;
};

const mapStateToProps = state => ({ brush: state.brush, size: state.fileData.grid });
const mapDispatchToProps = dispatch => ({
	highlight: (coords, path, pos) => { dispatch(highlightSprite(coords, path, pos)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(SpriteMap);
