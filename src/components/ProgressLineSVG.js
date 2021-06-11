import React from 'react'
import PropTypes from 'prop-types'

const ProgressLineSVG = ({ value, strokeWidth, frontColor, backColor }) => (

	<svg viewBox="0 0 100 4" preserveAspectRatio="none" style={{width:'100%', height:'100%', transition: 'all 0.1s ease-in-out'}}>
		<path d="M 0,2 L 100,2" stroke={backColor} strokeWidth={strokeWidth} fillOpacity="0"></path>
		<path d="M 0,2 L 100,2" stroke={frontColor} strokeWidth={strokeWidth} fillOpacity="0" style={{
			strokeDasharray: '100, 100',
			strokeDashoffset: 100 - Number(value),
			transition: 'all 0.1s ease-in-out'}}></path>
	</svg>
)

ProgressLineSVG.propTypes = {
	backColor: PropTypes.string.isRequired,
	frontColor: PropTypes.string.isRequired,
	strokeWidth: PropTypes.number
}

ProgressLineSVG.defaultProps = {
	backColor: 'rgba(0,0,0,0.2)',
	strokeWidth: 5
}

export default ProgressLineSVG