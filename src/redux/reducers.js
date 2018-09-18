/*
包含n个reducer函数的模块
reducer函数: 根据老的state和指定的action 生产新的state
 */
import {combineReducers} from 'redux'

import {
  AUTH_SUCCESS,
  ERROR_MSG
} from './action-types'

// 管理user数据
const initUser = {
  username: '', // 用户名
  type: '', // 用户类型
  msg: '', // 需要显示的错误信息
  redirectTo: '', // 需要自动重定向的路径
}
function user (state=initUser, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      const user = action.data
      return {...user, redirectTo: '/'}
    case ERROR_MSG:
      const msg = action.data
      return {...state, msg}
    default:
      return state
  }
}


export default combineReducers({
  user
})

/*
combineReducers()执行的结果是一个新的reducer函数
整合后的reducer管理的状态结构为:  对象: {user: user()}
 */