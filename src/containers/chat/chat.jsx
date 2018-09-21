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

    this.setState({
      content: ''
    })
  }

  render () {

    const {user, chat} = this.props
    const {users, chatMsgs} = chat



    // 得到当前用户的id
    const meId = user._id
    // 得到目标用户的id
    const targetId = this.props.match.params.userid
    // 得到当前聊天的chatId
    const chatId = [meId, targetId].sort().join('-')

    // 得到当前登陆用户与目标用户的所有msg组件的数组
    const msgs = chatMsgs.filter(msg => msg.chat_id=chatId)

    // 得到目标用户
    const targetUser = users[targetId]
    const targetHeader = require(`../../assets/images/${targetUser.header}.png`)

    return (
      <div id='chat-page'>
        <NavBar>aa</NavBar>
        <List>
          {
            msgs.map(msg => {

              if(msg.to===meId) { // 他发给我的
                return (
                  <Item
                    key={msg._id}
                    thumb={targetHeader}
                  >
                    {msg.content}
                  </Item>
                )
              } else { // 我发给他
                return (
                  <Item
                    key={msg._id}
                    className='chat-me'
                    extra='我'
                  >
                    {msg.content}
                  </Item>
                )
              }
            })
          }
        </List>

        <div className='am-tab-bar'>
          <InputItem
            placeholder="请输入"
            extra={
              <span onClick={this.send}>发送</span>
            }
            onChange={val => this.setState({content: val})}
            value={this.state.content}
          />
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user, chat: state.chat}),
  {sendMsg}
)(Chat)