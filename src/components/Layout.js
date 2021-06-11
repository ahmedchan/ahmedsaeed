import React from 'react'
import classNames from 'classnames'

const Layout = props => (
   <section className={classNames("section sec_pad_top sec_pad_bottom", props.classes)}>
      <div className="wrapper">
         {props.children}
      </div>
   </section>
)

export default Layout