import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ProgressLineSVG from './ProgressLineSVG'

const capitalize = string => ( string && string[0].toUpperCase() + string.slice(1) )

class ProgressBar extends Component {

	static propTypes = {
		title: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.array
		]),
		color: PropTypes.string,
		value: PropTypes.number,
		type: PropTypes.string
	}

	static defaultProps = {
		title: 'title',
		color: '#223D72',
		value: 50,
		type: 'line'
	}

	progressTypes = type => {
		switch(type) {
			case 'line': 
				return this.displayProgressLine();
			case 'circle': 
				return this.displayProgressCircle();
			default: 
				return this.displayProgressLine();
		}
	}

	displayProgressLine() {
		const { value, title } = this.props;

		const progTextStyle = {
			top: '-25px', 
			right: 0, 
			color: 'inherit',
			position: 'absolute', 
			margin: 0, 
			padding: 0, 
			transform: 'translate(0px, 0px)'
		}

		return (
			<div className="progress-line " role="progressbar" aria-label={this.formatedProgressTitle(title)}>
				<strong className="progress-title">{this.formatedProgressTitle(title)}</strong>
				<div className="progress-bar" style={{position:'relative'}}>
					<ProgressLineSVG frontColor={this.adjustProgressColor(value)} value={value}  />
					<div className="progress-text" style={progTextStyle}>{value}%</div>
				</div>
			</div>
		)
	}

	displayProgressCircle() {
		const { color, title, value } = this.props;

		const innerPathStyle = {
			strokeDasharray: '298.493, 298.493', 
			strokeDashoffset: Number(value) / ( 0. + value )
		}

		const textStyle = {
			top: '50%', left: '50%', 
			color: 'inherit', 
			position: 'absolute', 
			margin: 0, padding: 0, 
			transform: 'translate(-50%, -50%)'
		}

		return (
			<div className="progress-chart">
				<div className="progress-bar"  style={{position: 'relative'}}>
					<svg viewBox="0 0 100 100" style={{display: 'block', width: '100%'}}>
						<path d="M 50,50 m 0,-47.5 a 47.5,47.5 0 1 1 0,95 a 47.5,47.5 0 1 1 0,-95" 
							stroke={color} 
							strokeWidth="5" 
							fillOpacity="0" 
							style={innerPathStyle}
							></path>
					</svg>
					<div className="progress-text" 
						style={textStyle}
					>
						{value}%
					</div>
				</div>
				<strong className="progress-title">{this.formatedProgressTitle(title)}</strong>
			</div>
		)
	}

	adjustProgressColor = value => {
		let newColor;
		if( value <= 40 ) {
			newColor = '#FF3328';
		}else if( value >= 40 && value <= 70 ) {
			newColor = '#00b2e0';
		}else{
			newColor = '#00CC5F';
		}

		return newColor;
	}

	formatedProgressTitle = title => {
		let name, captlizeArray = [];

		if( typeof(title) !== 'string' ) {

			for (let i = title.length - 1; i >= 0; i--) {
				captlizeArray.push(capitalize(title[i]));
			}
			name = captlizeArray.reverse().join(' / ');
		}else{
			name = capitalize(title);
		}

		return name;
	}

	render(){
		return this.progressTypes( this.props.type );
	}
}

// ProgressBar.defaultProps = {
// 	title: 'title',
// 	color: '#223D72',
// 	value: 50,
// 	type: 'line'
// }


export default ProgressBar
