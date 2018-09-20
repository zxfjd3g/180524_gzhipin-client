import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getUserList} from '../../redux/actions'

import UserList from '../../componnets/user-list/user-list'

/*
大神的主界面路由组件
 */
class Dashen extends Component {

  componentDidMount () {
    // 发请求异步从后台获取userList到redux的userList状态
    this.props.getUserList('laoban')
  }

  render () {
    return (
      <UserList userList={this.props.userList}/>
    )
  }
}

export default connect(
  state => ({userList: state.userList}),
  {getUserList}
)(Dashen)