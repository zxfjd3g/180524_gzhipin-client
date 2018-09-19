import React, {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import LaobanInfo from '../laoban-info/laoban-info'
import DashenInfo from '../dashen-info/dashen-info'

/*
主界面路由组件
 */
export default class Main extends Component {

  render () {
    // 判断用户是否登陆(cookie中是否有userid), 如果没有, 自动跳转到登陆界面
    const userid = Cookies.get('userid')
    if(!userid) {
      return <Redirect to='/login'/>
    }

    return (
      <div>
        <Switch>
          <Route path='/laobaninfo' component={LaobanInfo}/>
          <Route path='/dasheninfo' component={DashenInfo}/>
        </Switch>
      </div>
    )
  }
}