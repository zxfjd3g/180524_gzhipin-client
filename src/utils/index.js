/*
包含n个工具函数的模块
 */

/*
得到需要自动跳转的path
结果
  /laobaninfo
  /dasheninfo
  /laoban
  /dashen
条件:
  type
  header
 */
export function getRedirectPath(type, header) {
  let path = ''
  if(type==='laoban') {
    path = '/laoban'
  } else {
    path = '/dashen'
  }

  if(!header) { // 信息没有完善
    path += 'info'
  }

  return path
}