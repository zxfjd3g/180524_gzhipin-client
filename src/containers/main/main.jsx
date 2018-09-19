import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'

import LaobanInfo from '../laoban-info/laoban-info'
import DashenInfo from '../dashen-info/dashen-info'

/*
主界面路由组件
 */
export default class Main extends Component {

  render () {
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