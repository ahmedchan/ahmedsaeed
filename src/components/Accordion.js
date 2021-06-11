import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AccordionSection from './AccordionSection'


class Accordion extends Component {
   static propTypes = {
      allowMultipleOpen: PropTypes.bool,
      children: PropTypes.instanceOf(Object).isRequired,
   };

   constructor(props) {
      super(props);

      const openSections = {};

      this.props.children.forEach(child => {
         if (child.props.isOpen) {
            openSections[child.props.label] = true;
         }else{
            openSections[child.props.label] = false;
         }
      });


      this.state = { openSections };
   }

   onClick = label => {
      const {
         props: { allowMultipleOpen },
         state: { openSections },
      } = this;

      console.log('!!openSections[label]: ', !!openSections[label])

      const isOpen = !!openSections[label];

      if (allowMultipleOpen) {
         this.setState({
            openSections: {
               ...openSections,
               [label]: !isOpen
            }
         });
      } else {
         this.setState({
            openSections: {
               [label]: !isOpen
            }
         });
      }
   };

   render() {
      const {
         onClick,
         props: { children },
         state: { openSections },
      } = this;

      return (
         <div>
            {children.map((child, index) => (
               <AccordionSection
                  key={index}
                  isOpen={!!openSections[child.props.label]}
                  label={child.props.label}
                  onClick={onClick}
               >
                  {child.props.children}
               </AccordionSection>
            ))}
         </div>
      );
   }
}

export default Accordion