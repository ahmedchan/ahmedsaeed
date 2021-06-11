import React from 'react'
import Scrollbar from 'react-scrollbar'

const ScrollBar = props => (
   <Scrollbar speed={0.8}
      className="scroll_area"
      smoothScrolling={false}
      verticalScrollbarStyle={{ background: '#6F81A6', width: '6px' }}
      verticalContainerStyle={{ background: 'transparent', width: '8px' }}>

      {props.children}

   </Scrollbar>
)

export default ScrollBar