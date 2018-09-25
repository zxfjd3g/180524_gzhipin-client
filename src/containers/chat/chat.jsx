import React, {Component} from 'react'
import {connect} from 'react-redux'
import {NavBar, List, InputItem, Icon, Grid} from 'antd-mobile'

import {sendMsg} from '../../redux/actions'

const Item = List.Item

/*
聊天组件
 */
class Chat extends Component {

  state = {
    content: '',
    isShow: false, // 标识表情列表是否显示
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
      content: '',
      isShow: false
    })
  }

  toggleShow =  () => {

    const isShow = !this.state.isShow

    if(isShow) {
      // 异步手动派发resize事件,解决表情列表显示的bug
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'))
      }, 0)
    }

    this.setState({isShow})
  }

  componentWillMount () {
    const emojis = ['😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀'
      ,'😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣'
      ,'😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣'
      ,'😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣']
    this.emojis = emojis.map(emoji => ({text: emoji}) )
  }

  componentDidMount() {
    // 初始显示列表
    window.scrollTo(0, document.body.scrollHeight)
  }

  componentDidUpdate () {
    // 更新显示列表
    window.scrollTo(0, document.body.scrollHeight)
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
    const msgs = chatMsgs.filter(msg => msg.chat_id===chatId)

    // 得到目标用户
    const targetUser = users[targetId]
    if(!targetUser) { // 如果还没查询得到数据
      // return null // 先暂时不做任何显示
      return <div>LOADING...</div>  // 先暂时显示一个加载中的提示
    }
    const targetHeader = require(`../../assets/images/${targetUser.header}.png`)

    return (
      <div id='chat-page'>
        <NavBar
          className='fix-top'
          icon={<Icon type='left'/>}
          onLeftClick={() => this.props.history.goBack()}
        >
          {targetUser.username}
        </NavBar>
        <List style={{marginTop: 50, marginBottom: 50}}>
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
              <div>
                <span onClick={this.toggleShow}>😁</span>
                <span onClick={this.send}>发送</span>
              </div>
            }
            onChange={val => this.setState({content: val})}
            value={this.state.content}
            onFocus = {() => this.setState({isShow: false})}
          />

          {
            this.state.isShow ? (
              <Grid
                data={this.emojis}
                columnNum={8}
                carouselMaxRow={4}
                isCarousel={true}
                onClick={(item) => {
                  this.setState({content: this.state.content+item.text})
                }}
              />
            ) : null
          }

        </div>
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user, chat: state.chat}),
  {sendMsg}
)(Chat)