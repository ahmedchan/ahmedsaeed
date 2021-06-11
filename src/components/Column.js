import React from 'react'
import classNames from 'classnames'

const Column = props => (
   <div className={classNames("content_column", props.classes)}>
      <div className="wrapper">
         {props.children}
      </div>
   </div>
)

export default Column