import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Card, WingBlank, WhiteSpace} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import QueueAnim from 'rc-queue-anim'

const Header = Card.Header
const Body = Card.Body



/*
用户列表组件
 */
class UserList extends Component {

  static propTypes = {
    userList: PropTypes.array.isRequired
  }

  render () {
    // 过滤得到完善了信息的user数组
    const userList = this.props.userList.filter(user => user.header)
    return (
      <WingBlank style={{marginTop: 50, marginBottom: 50}}>
        {/*alpha left right top bottom scale scaleBig scaleX scaleY*/}
        <QueueAnim type='bottom'>
          {
            userList.map((user, index) => (
              <div key={user._id}>
                <WhiteSpace/>
                <Card onClick={() => this.props.history.push(`/chat/${user._id}`)}>
                  <Header
                    thumb={require(`../../assets/images/${user.header}.png`)}
                    extra={user.username}
                  />
                  <Body>
                  {user.post ? <div>职位: {user.post}</div> : null}
                  {user.company ?<div>公司: {user.company}</div> : null}
                  {user.salary ? <div>月薪: {user.salary}</div> : null}
                  {user.info ?<div>描述: {user.info}</div> : null}
                  </Body>
                </Card>
              </div>
            ))
          }
        </QueueAnim>
      </WingBlank>
    )
  }
}

export default withRouter(UserList)