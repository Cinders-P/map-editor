import React from 'react';
const Tile = ({ path, pos, highlight, highlighted, size }) => {
	if (path) {
		if (highlighted) {
			return <div className='tile'
				style={{
					backgroundImage: `url(file:${path})`,
					backgroundPosition: `${pos.x}px ${pos.y}px`,
					minWidth: `${size}px`,
					minHeight: `${size}px`,
					boxShadow: 'inset 0 0 0 2px RebeccaPurple',
				}}></div>;
		}
		return <div className='tile'
			onClick={highlight.bind(null, [pos.x / -size, pos.y / -size], path, [pos.x, pos.y])}
			style={{
				backgroundImage: `url(file:${path})`,
				backgroundPosition: `${pos.x}px ${pos.y}px`,
				minWidth: `${size}px`,
				minHeight: `${size}px`,
			}}></div>;
	}
	return <div className='tile' style={{
		minWidth: `${size}px`,
		minHeight: `${size}px`,
	}}></div>;
};
export default Tile;
