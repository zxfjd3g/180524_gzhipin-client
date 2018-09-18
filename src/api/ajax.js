/*
使用axios封装一个ajax请求函数
函数的返回值是promise
 */
import axios from 'axios'

export default function ajax(url, data={}, type='GET') {
  if(type==='GET') {
    // 将data中所有数据转换成query参数字符串接到url中
    // Object.keys(obj): 得到obj对象自身所有属性的属性名组成的数组
    let queryString = ''
    Object.keys(data).forEach(key => {
      const value = data[key]
      queryString += key + '=' + value + '&'
    })
    if(queryString) { // username=tom&password=123&
      queryString = queryString.substring(0, queryString.length-1)
      url += '?' + queryString
    }

    // 发get请求
    return axios.get(url)
  } else {
    // 发post请求
    return axios.post(url, data)
  }
}