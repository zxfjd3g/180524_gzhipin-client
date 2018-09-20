/*
包含n个action creator函数的模块
同步action: 对象
异步action: dispatch函数
 */
// 引入客户端io
import io from 'socket.io-client'

import {
  reqRegister,
  reqLogin,
  reqUpdateUser,
  reqUser,
  reqUserList
} from '../api'

import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_USER_LIST
} from './action-types'  // 有几个action type就会定义几个同步action

// 注册/登陆成功的同步action
const authSuccess = (user) => ({type: AUTH_SUCCESS, data:user})
// 注册/登陆失败的同步action
const errorMsg = (msg) => ({type: ERROR_MSG, data:msg})
// 接收用户的同步action
const receiveUser = (user) => ({type: RECEIVE_USER, data: user})
// 重置用户的同步action
export const resetUser = (msg) => ({type: RESET_USER, data: msg})
// 接收用户列表的同步action
export const receiveUserList = (userList) => ({type: RECEIVE_USER_LIST, data: userList})


/*
注册的异步action
 */
export function register({username, password, password2, type}) {

  // 前台表单验证
  if(!username) {  // 此时本质是同步action
    return errorMsg('必须指定用户名')
  } else if (!password) {
    return errorMsg('必须指定密码')
  } else if (password2!==password) {
    return errorMsg('密码必须一致')
  } else if (!type) {
    return errorMsg('必须指定用户类型')
  }

  return async dispatch => {
    // 发异步ajax请求注册
    const response = await reqRegister({username, password, type})

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
  }
}

/*
登陆的异步action
 */
export function login(username, password) {
  return async dispatch => {

    if(!username) {  // 必须分发一个同步action对象
      return dispatch(errorMsg('必须指定用户名'))  // 此时 return代表结束
    } else if (!password) {
      return dispatch(errorMsg('必须指定密码'))
    }

    // 发异步ajax请求注册
    const response = await reqLogin(username, password)
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
  }
}


/*
更新用户的异步action
 */
export function updateUser(user) {
  return async dispatch => {
    const response = await reqUpdateUser(user)
    const result = response.data
    if(result.code===0) { // 更新用户成功
      const user = result.data
      dispatch(receiveUser(user))
    } else { // 更新失败
      const msg = result.msg
      dispatch(resetUser(msg))
    }
  }
}


/*
获取当前用户的异步action
 */
export function getUser() {
  return async dispatch => {
    // 发ajax请求, 获取user
    const response = await reqUser()
    const result = response.data
    // 分发同步action
    if(result.code===0) {// 成功得到user
      dispatch(receiveUser(result.data))
    } else { // 失败
      dispatch(resetUser(result.msg))
    }
  }
}

/*
获取用户列表的异步action
 */
export function getUserList(type) {
  return async dispatch => {
    const response = await reqUserList(type)
    const result = response.data
    if(result.code===0) {
      const userList = result.data
      dispatch(receiveUserList(userList))
    }
  }
}

// 连接服务器, 得到代表连接的socket对象
const socket = io('ws://localhost:4000')

// 绑定监听, 接收服务发送的消息
socket.on('receiveMsg', (chatMsg) => {
  console.log('浏览器接收到服务器返回的消息', chatMsg)
})

/*
发送聊天消息的异步action
 */
export function sendMsg ({content, from, to}) {
  return dispatch => {
    // 发消息
    socket.emit('sendMsg', {content, from, to})
    console.log('浏览器向服务器发消息', {content, from, to})
  }
}


/*
async和await
1. 作用?
    简化promise的使用(不再使用.then来指定异步回调函数)
    以同步编程方式实现异步流程效果
2. 使用?
   用await: 在返回promise的函数调用左侧(不想要promise, 而是想要异步返回的结果)
   用async: await所在函数定义的左侧
 */