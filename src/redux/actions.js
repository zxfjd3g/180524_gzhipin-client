/*
包含n个action creator函数的模块
同步action: 对象
异步action: dispatch函数
 */
import {
  reqRegister,
  reqLogin
} from '../api'

import {
  AUTH_SUCCESS,
  ERROR_MSG
} from './action-types'  // 有几个action type就会定义几个同步action

// 注册/登陆成功的同步action
const authSuccess = (user) => ({type: AUTH_SUCCESS, data:user})
// 注册/登陆失败的同步action
const errorMsg = (msg) => ({type: ERROR_MSG, data:msg})



/*
注册的异步action
 */
export function register({username, password, type}) {
  return dispatch => {
    // 发异步ajax请求注册
    reqRegister({username, password, type}).then(response => {
      const result = response.data // {code:0/1, msg: '', data: user}
      if(result.code==0) { // 成功了
        const user = result.data
        // 分发成功的同步action
        dispatch(authSuccess(user))
      } else { // 失败
        const msg = result.msg
        // 分发失败同步action
        dispatch(errorMsg(msg))
      }
    })
  }
}

/*
登陆的异步action
 */
export function login(username, password) {
  return dispatch => {
    // 发异步ajax请求注册
    reqLogin(username, password).then(response => {
      const result = response.data // {code:0/1, msg: '', data: user}
      if(result.code==0) { // 成功了
        const user = result.data
        // 分发成功的同步action
        dispatch(authSuccess(user))
      } else { // 失败
        const msg = result.msg
        // 分发失败同步action
        dispatch(errorMsg(msg))
      }
    })
  }
}