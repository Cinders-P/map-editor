import React from 'react';

const MTile = ({ data, paintTile, brushData, index, size, drag, selected }) => {
	let style = {
		minWidth: `${size}px`,
		minHeight: `${size}px`,
	};
	if (data.path) {
		style.backgroundImage = `url(file:${data.path})`;
		style.backgroundPosition = `${data.pos[0]}px ${data.pos[1]}px`;
	}
	return <div className='tile'
		onClick={paintTile.bind(null, brushData, index, selected)}
		onMouseOver={() => { if (drag) paintTile(brushData, index, selected); }}
		style={style}></div>;
};
export default MTile;
