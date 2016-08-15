import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { select, changeSheet, highlightSprite } from './actions.js';
import SpriteMap from './SpriteMap.jsx';

const fs = window.require('fs');
const sizeOf = window.require('image-size');
const electron = window.require('electron');
const remote = electron.remote;
const dialog = remote.dialog;

const openFile = (changeSheet, highlightSprite, size) => {
	dialog.showOpenDialog({
		filters: [{ name: 'Images', extensions: ['jpg', 'png', 'gif'] }],
	}, fileNames => {
		// check if path is accessible
		fs.access(fileNames[0], fs.R_OK, (err) => {
			if (!err) {
				const spriteRes = sizeOf(fileNames[0]);
				highlightSprite(null, null);
				changeSheet(
					fileNames[0].replace(/\\/g, '/'),
					Math.ceil(spriteRes.width / size),
					Math.ceil(spriteRes.height / size)
				);
			} else {
				dialog.showErrorBox('Cannot Read This File', err.message);
			}
		});
	});
};

const Brush = ({ select, brush, changeSheet, highlightSprite, size }) =>
<div id='brush' className='flex-column'>
	<div className='toolRow'>
		{brush.selected === 0 ?
			<span>
			<div className='box active inline-block' onClick={select.bind(null, 0)}>
				<img className='flaticon' src='../assets/brush.svg'/>
				<p className='no-margin'>Brush</p>
			</div>
			<div className='box inline-block' onClick={select.bind(null, 1)}>
				<img className='flaticon' src='../assets/eraser.svg'/>
				<p className='no-margin'>Eraser</p>
			</div>
		</span> :
		<span>
			<div className='box inline-block' onClick={select.bind(null, 0)}>
				<img className='flaticon' src='../assets/brush.svg'/>
				<p className='no-margin'>Brush</p>
			</div>
			<div className='box active inline-block' onClick={select.bind(null, 1)}>
				<img className='flaticon' src='../assets/eraser.svg'/>
				<p className='no-margin'>Eraser</p>
			</div>
		</span> }
			<div className='box inline-block pointer'
				onClick={openFile.bind(null, changeSheet, highlightSprite, size)}>
				<img className='flaticon' src='../assets/picture.svg'/>
				<p className='no-margin'>Open</p>
			</div>
	</div>
	<p>No file selected.</p>
	<div className='viewer'>
		<SpriteMap />
	</div>
</div>;

const mapStoreToProps = store => ({ brush: store.brush, size: store.fileData.grid });
const mapDispatchToProps = dispatch =>
	bindActionCreators({ select, changeSheet, highlightSprite }, dispatch);

export default connect(mapStoreToProps, mapDispatchToProps)(Brush);
