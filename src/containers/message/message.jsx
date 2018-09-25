import React, {Component} from 'react'
import {connect} from 'react-redux'
import {List, Badge} from 'antd-mobile'

const Item = List.Item
const Brief = Item.Brief


/*
消息列表路由组件
 */
class Message extends Component {

  /*
  获取得到跟所有人的最后一条聊天消息的列表
  1. 创建一个用于保存所有lastMsg的对象容器: lastMsgsObj ---key是chat_id, value是msg
  2. 遍历所有的msg, 查看当前msg是否是当前聊天的lastMsg, 如果是, 保存到对象容器中
  3. 得到对象容器的value组成的数组: lastMsgs
  4. 对lastMsg根据create_time进行降序排列
   */
  getLastMsgs =  (chatMsgs, meId) => {
    // 1. 创建一个用于保存所有lastMsg的对象容器: lastMsgsObj ---key是chat_id, value是msg
    const lastMsgsObj = {}
    // 2. 遍历所有的msg, 查看当前msg是否是当前聊天的lastMsg, 如果是, 保存到对象容器中
    chatMsgs.forEach(msg => {

      // msg对自身进行统计
      // 必须是别人发给我的未读消息
      if(!msg.read && msg.to===meId) {// read为false
        msg.unReadCount = 1
      } else {
        msg.unReadCount = 0
      }

      // 得到当前的chat_id
      const chatId = msg.chat_id
      // 得到当前已保存的lastMsg
      let lastMsg = lastMsgsObj[chatId]
      // 如果没有
      if(!lastMsg) {
        // 将当前msg添加为lastMsg
        lastMsgsObj[chatId] = msg
      // 如果有
      } else {
        // 计算最新的unReadCount
        const unReadCount = lastMsg.unReadCount + msg.unReadCount

          // 如果当前msg比lastMsg还要晚, 替换
        if(msg.create_time>lastMsg.create_time) {
          lastMsgsObj[chatId] = msg
        }

        // 将最新的unReadCount保存到lastMsg上
        lastMsgsObj[chatId].unReadCount = unReadCount
      }
    })
    // 3. 得到对象容器的value组成的数组: lastMsgs
    const lastMsgs = Object.values(lastMsgsObj)

    // 4. 对lastMsg根据create_time进行降序排列
    lastMsgs.sort((msg1, msg2) => msg2.create_time-msg1.create_time)

    return lastMsgs
  }


  render() {

    const {chat, user} = this.props
    const meId = user._id
    const {users, chatMsgs} = chat

    // 获取得到跟所有人的最后一条聊天的列表
    const lastMsgs = this.getLastMsgs(chatMsgs, meId)


    return (
      <List style={{marginTop: 50, marginBottom: 50}}>
        {
          lastMsgs.map(msg => {
            const targetId = msg.to===meId ? msg.from : msg.to
            const targetUser = users[targetId]

            return (
              <Item
                key={msg._id}
                extra={<Badge text={msg.unReadCount}/>}
                thumb={require(`../../assets/images/${targetUser.header}.png`)}
                arrow='horizontal'
                onClick={() => this.props.history.push(`/chat/${targetId}`)}
              >
                {msg.content}
                <Brief>{targetUser.username}</Brief>
              </Item>
            )
          })
        }
      </List>
    )
  }
}

export default connect(
  state => ({chat: state.chat, user: state.user}),
  {}
)(Message)