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
## 1. 搭建后台应用并测试
    1). 使用webstorm创建基于node+express的后台应用
    2). 自定义测试路由
    3). 使用nodemon库来实例自动重运行

## 2. 测试使用mongoose操作mongodb
    1). 连接数据库
    2). 定义schema和Model
    3). 通过Model函数对象或Model的实例的方法对集合数据进行CRUD操作 

## 3. 完成注册/登陆的后台 
    1). models.js
        连接数据库: mongoose.connect(url)
        定义文档结构: schema
        定义操作集合的model: UserModel
    2). routes/index.js
        根据接口编写路由的定义
        注册: 流程
        登陆: 流程
        响应数据结构: {code: 0, data: user}, {code: 1, msg: 'xxx'}  
    3). postman的优点(相对于浏览器)
        可以方便的发送post请求
        可以将发送过的请求保存下来

## 4. 完成注册/登陆前台
    1). ajax
        ajax请求函数(通用): 使用axios库, 返回的是promise对象
        后台接口请求函数: 针对具体接口定义的ajax请求函数, 返回的是promise对象
        代理: 跨域问题/配置代理解决
        await/async: 同步编码方式实现异步ajax请求 
    2). redux
        store.js
          生成并暴露一个store管理对象
        reducers.js
          包含n个reducer函数--> 向外暴露的是一个整合后的reducer函数---> {a: a(), b: b()}
          根据老state和指定action来产生返回一个新的state
        actions.js
          包含n个action creator函数
          同步action: 返回一个action对象({type: 'XXX', data: xxx})
          异步action: 返回一个函数: disptach => {执行异步代码, 结束时dispatch一个同步action}
        action-types.js
          包含n个同步action的type名称常量
    3). component
        UI组件: 
            组件内部没有使用任何redux相关的API
            通过props接收容器组件传入的从redux获取数据
            数据类型: 一般和函数
        容器组件
            connect(
              state => ({user: state.user}),
              {action1, action2}
            )(UI组件)

## 5. 代理
    1). 是什么?
        具有特定功能的程序
    2). 运行在哪?
        前台应用端
    3). 作用?
        解决开发环境的跨域请求问题: 监视/拦截/转发请求
    4). 配置代理
        告诉代理一些信息: 转发的目标地址


# day03
 
## 1. 完善注册/登陆功能
     1). 动态计算成功后跳转的path: 设计工具函数
     2). 前台表单验证: 在action中 
     3). 使用async和await简化poromise的使用
 
## 2. 用户信息完善
    1). 用户信息完善界面路由组件: 
        组件: dashen-info/laoban-info/header-selector
        界面: Navbar/List/Grid/InputItem/Button/TextareaItem
        收集用户输入数据: onChange监听/state 
        注册2级路由: 在main路由组件
    2). 后台路由处理: 更新用户信息
    3). 前台接口请求函数
    4). 前台redux
        action-types
        异步action/同步action
        reducer
    5). 前台组件
        UI组件包装生成容器组件
        读取状态数据
        更新状态
 
## 3. 主界面
    1). 拆分界面, 抽取组件(一般/路由)
    2). 封装导航路由相关数据(数组/对象)
    3). NavFooter组件
        1). 过滤navList
        2). 包装一般组件使其可以访问路由相关属性: withRouter()
        3). 通过js实现路由跳转(编程式导航: js路径跳转): history.replace()
        
# day04
## 1. 整体main组件的逻辑
    1). 是否登陆过: cookie中是否有userid  ---> 跳转login
    2). 当前是否已经登陆: state中的user中是否有_id  --> 显示请求的提示信息界面
    3). 实现自动登陆: 在componentDidMount()发请求获取当前用户信息
    4). 根路径的自动跳转: 跳转到对应的路由界面
    5). 404页面的设计: NotFound组件的path不需要指

## 2. Personal组件
    1). 读取user信息显示
    2). 退出登陆
 
## 3. Laoban/Dashen组件
    1). 为大神/老板列表组件抽取用户列表组件: user-list
    2). 异步读取指定类型用户列表数据
        后台路由
        api
        redux
        component
 
## 4. 实时聊天
    1). socket.io
         实现实时聊天的库
         包装的H5 WebSocket和轮询---> 兼容性/编码简洁性
         包含2个包:
           socket.io: 用于服务器端
           socket.io-client: 用于客户端
         基本思想: 远程自定义事件机制
             绑定事件监听(订阅消息): 事件名(消息名), 回调函数
             触发事件(发布消息): 事件名, 数据
             on(name, function(data){}): 绑定监听
             emit(name, data): 发送消息
            
             io: 服务器端核心的管理对象: 内部管理着n个连接对象(socket)
             socket: 客户端与服务器的连接对象
     2). 收发消息
         前台应用
             chat组件: 收集数据分发发消息的异步action
             actions: 连接socketio服务器/ 发送消息
         后台应用
             models: 定义操作chatMsgs集合的ChatModel
             socketIO: 监视连接 / 监听浏览器发送的聊天消息 / 保存聊天信息 / 向所有连接的浏览器端发消息
             
# day05
## 1. chat组件
    1). 后台
        models
          添加操作chatMsgs集合的ChatModel
        routes
          获取当前用户的聊天消息列表: /msglist
          修改指定消息为已读: /readmsg
        socketio
          接收浏览器客户发送的消息数据, 保存完成后, 群发给所有连接的浏览器
    2). 前台
        api
          reqChatMsgList()
          reqReadChatMsg(from)
        redux
          异步获取消息列表
          绑定接收新的聊天消息的监听
          发送聊天消息给服务器
          管理chat数据的reducer
        组件
          读取user/chat状态数据显示
          发送聊天消息
          对chatMsgs进行过滤
          实现自动滑动到底部显示
          表情包功能

# day06

## 1. chat组件
    实现自动滑动到底部显示
    表情包功能
    
## 2. Message组件
    对消息进行分组保存, 且只保存每个组最后一条消息
    对于对象容器和数组容器的选择
    数组排序
    
## 3. 未读消息
    每个组的未读数量统计
    总未读数量统计显示
    查看消息后, 更新未读数量
    
## 4. 项目打包发布运行
    npm run build --> 生成本地打包文件(build)
    build中所有文件复制到server端的public下
    npm start运行服务器应用
    就可以访问了 
    
## 5. 快捷键
    * 向下复制一行(Duplicate Lines)                          Ctrl+Down
    * 向下移动行	                                            Alt+Down
    * 向下开始新的一行	                                    Shift+Enter
    * 单选注释                                               Ctrl + /
    * 多行注释                                               Ctrl+Shift+/
    * 格式化代码	                                            Ctrl+shift+F
    * 大小写转换                                             Ctrl+shift+X
    * 查找/替换(当前)                                        Ctrl+F
    * 查找/替换(全局)                                        Ctrl+H
    * 删除一行或选中行	                                    Ctrl+D
    * 查找文件	                                            Double Shift
    * 提示方法参数类型(Parameter Info)	                    Ctrl+Alt+/
    * 展开所有代码(Expand All)                               Alt+A 
    * 收缩所有代码(Collapse All)                             Alt+C 
    * 代码导航                                               Alt+Right/Left    