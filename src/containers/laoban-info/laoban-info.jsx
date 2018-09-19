import React, {Component} from 'react'
import {connect} from 'react-redux'
import {NavBar, InputItem, TextareaItem, Button, WingBlank, List, WhiteSpace} from 'antd-mobile'

import  HeaderSelector from '../../componnets/header-selector/header-selector'

/*
老板信息完善路由组件
 */
class LaobanInfo extends Component {
  render () {
    return (
      <div>
        <NavBar>老板信息完善</NavBar>
        <HeaderSelector/>
        <WingBlank>
          <List>
            <InputItem placeholder='招聘职位'>招聘职位:</InputItem>
            <InputItem placeholder='公司名称'>公司名称:</InputItem>
            <InputItem placeholder='职位薪资'>职位薪资:</InputItem>
            <TextareaItem
              title="招聘职位:"
              placeholder='招聘职位'
              rows={3}/>
            <Button type='primary'>保存</Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}

export default connect(
  state => ({}),
  {}
)(LaobanInfo)