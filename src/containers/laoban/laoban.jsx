import React, {Component} from 'react'
import {connect} from 'react-redux'

/*
老板的主界面路由组件
 */
class Laoban extends Component {
  render () {
    return (
      <div>Laoban</div>
    )
  }
}

export default connect(
  state => ({}),
  {}
)(Laoban)