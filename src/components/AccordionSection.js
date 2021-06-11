import React, { Component } from 'react'
import PropTypes from 'prop-types'
import arrowDown from '../img/icons/down-arrow.svg'
import arrowUp from '../img/icons/up-arrow.svg'

class AccordionSection extends Component {
   static propTypes = {
      children: PropTypes.instanceOf(Object).isRequired,
      isOpen: PropTypes.bool.isRequired,
      label: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired,
   };

   onClick = () => {
      this.props.onClick(this.props.label);
   };

   render() {
      const { onClick, props: { isOpen, label } } = this;

      return (
         <div className={'panel' + (isOpen ? ' panel_opened' : ' ') }>
            <div className="panel_header" onClick={onClick} style={{ cursor: 'pointer' }}>
               <span className="panel_title">{label}</span>
               <span className="panel_arrow" style={{ float: 'right' }}>
                  {!isOpen && <img src={arrowDown} alt="" style={{ width: '12px'}} />}
                  {isOpen && <img src={arrowUp} alt="" style={{ width: '12px' }} />}
               </span>
            </div>
            {isOpen && (
               <div className="panel_body">
                  {this.props.children}
               </div>
            )}
         </div>
      );
   }
}

export default AccordionSection