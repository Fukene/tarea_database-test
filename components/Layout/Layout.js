import React, { Fragment } from 'react'
import Sidebar from '../Sidebar/Sidebar'

function Layout(props) {
  return <Fragment>
    <Sidebar />
    <div>{props.children}</div>
  </Fragment>
}

export default Layout