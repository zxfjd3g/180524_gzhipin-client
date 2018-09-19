import React, {Component} from 'react'
import {connect} from 'react-redux'

/*
个人中心路由组件
 */
class Personal extends Component {
  render () {
    return (
      <div>Personal</div>
    )
  }
}

export default connect(
  state => ({}),
  {}
)(Personal)