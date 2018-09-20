import React, {Component} from 'react'
import {connect} from 'react-redux'
import {NavBar, List, InputItem} from 'antd-mobile'

import {sendMsg} from '../../redux/actions'

const Item = List.Item

/*
聊天组件
 */
class Chat extends Component {

  state = {
    content: ''
  }

  send = () => {
    // 聊天的内容
    const {content} = this.state
    // 发送者的id
    const from = this.props.user._id
    // 接收者的id
    const to = this.props.match.params.userid

    this.props.sendMsg({content, from, to})
  }

  render () {
    return (
      <div id='chat-page'>
        <NavBar>aa</NavBar>
        <List>
          <Item
            thumb={require('../../assets/images/头像1.png')}
          >
            你好
          </Item>
          <Item
            thumb={require('../../assets/images/头像1.png')}
          >
            你好2
          </Item>
          <Item
            className='chat-me'
            extra='我'
          >
            很好
          </Item>
          <Item
            className='chat-me'
            extra='我'
          >
            很好2
          </Item>
        </List>

        <div className='am-tab-bar'>
          <InputItem
            placeholder="请输入"
            extra={
              <span onClick={this.send}>发送</span>
            }
            onChange={val => this.setState({content: val})}
          />
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  {sendMsg}
)(Chat)