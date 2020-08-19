import React from 'react';
import './Spinner.css';

const Spinner = () => {
	return (
		<div className="sk-chase container">
			<div className="sk-chase-dot" />
			<div className="sk-chase-dot" />
			<div className="sk-chase-dot" />
			<div className="sk-chase-dot" />
			<div className="sk-chase-dot" />
			<div className="sk-chase-dot" />
		</div>
	);
};

export default Spinner;
