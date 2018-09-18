# day01
## 1. 项目开发准备
    1). 项目描述: 整体业务功能/功能模块/主体的技术/开发模式
    2). 技术选型: 数据展现/用户交互/组件化, 后端, 前后台交互, 模块化, 项目构建/工程化, 其它
    3). API接口: 接口的4个组成部分, 接口文档, 对/调/测接口
    
## 2. 搭建项目
    1). 使用create-react-app脚手架创建模板项目(工程化)
    2). 应用的开发环境运行与生产环境打包运行
    2). 引入antd-mobile, 并实现按需打包和自定义主题
    3). 引入react-router-dom(v4): 
        HashRouter/Route/Switch
        history: push()/replace()/back()
    4). 引入redux
        redux/react-redux/redux-thunk
        redux: createStore()/combineReducers()/applyMiddleware()
        react-redux: <Provider store={store}> / connect()(Xxx)
        4个重要模块: store/reducers/actions/action-types

## 3. 登陆/注册界面
    1). 创建3个1级路由: main/login/register
    2). 完成登陆/注册的静态组件
        antd组件: NavBar/WingBlank/WhiteSpace/List/InputItem/Radio/Button
        路由跳转: this.props.history.replace('/login')
        收集表单输入数据: state/onChange/变量属性名
        
# day02

## 代理的理解
    1). 是什么?
        具有特定功能的一些程序
    2). 运行在哪?
        客户端应用
    3). 作用?
        监视/拦截/转发请求
    4). 配置代理
        package.json中: "proxy": "http://localhost:4000"
    5). 注意:
        只是开发环境使用, 生产环境没有
        
## redux管理哪些数据
    1). 多个组件共享的状态
    2). 从后台获取的数据
