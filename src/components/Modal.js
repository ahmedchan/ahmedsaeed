import React from 'react'
import Backdrop from "./Backdrop"
import ReactDom from 'react-dom'
import classNames from 'classnames'

const Modal = props => {
   return ReactDom.createPortal(
      <div>
         <Backdrop />
         <div className={classNames("modal animated fast flipInY", props.classes)}>
            <div className="modal_content">
               <header className="modal_header">
                  <h2 className="modal_title">{props.title || 'put title as "title" props'}</h2>
               </header>
               <div className="modal_body">{props.children || 'put content as "children" props'}</div>
            </div>
         </div>
      </div>
      ,
      document.getElementById('modal-root')
   )
}

export default Modal