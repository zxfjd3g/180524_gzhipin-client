import React from 'react'

import logo from './images/logo.png'
import './logo.less'
/*
应用图标UI组件
 */
export default function Logo(props) {
  return (
    <div className='logo-container'>
      <img src={logo} alt="logo" className='logo'/>
    </div>
  )
}