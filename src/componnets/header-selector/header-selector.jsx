import React, {Component} from 'react'
import {List, Grid} from 'antd-mobile'

export default class HeaderSelector extends Component {
  render () {

    const headerList = []
    for (var i = 0; i < 20; i++) {
      headerList.push({
        // 必须用require()动态加载一个图片模块
        // webpack默认就可以编译打包ES6和commonjs
        icon: require('./images/头像'+(i+1)+'.png'), // 图片对象
        text: '头像'+(i+1)
      })
    }

    return (
      <List renderHeader={() => '请选择头像'}>
        <Grid data={headerList}
              columnNum={5}></Grid>
      </List>
    )
  }
}