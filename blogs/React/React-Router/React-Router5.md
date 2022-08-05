---
title: React-Router5 基础学习
date: 2022-07-27
categories: 
  - React
tags: 
  - React-Router5
sidebar: 'auto'
---

# React-Router5 学习笔记

## 一、React-Router 介绍及说明

**介绍**：想了解更多详细知识，可前往 [React-Router中文网](https://react-router.docschina.org/)

> 引用：组件是 React 的核心功能，其拥有非常强大的声明式编程模型。React Router 是**导航组件**的集合，可与你的应用程序进行声明式的组合。无论你是想为你的 Web 应用程序添加**书签**，还是在 **React Native** 中进行组件化导航，React Router 都可以在 React 的任何位置渲染使用 - 所以请考虑使用！

React-Router 有三个版本，分别是：WEB、NATIVE、CORE，对于web开发人员来说，选择 **WEB** 版进行学习即可

**说明**：本笔记编写于 2022年7月27日 ，记录的是 React-Router5.x 的版本



## 二、React-Router 安装

学习 React-Router 需要安装 React 提供的第三方库：**react-router-dom**

```shell
npm install --save react-router-dom@5
```



## 三、路由的基本使用 - Link组件

### 1. 路由的使用步骤

* 在组件中导入对应路由链接组件，并**设置路由链接**
* 在组件中导入 Route 渲染组件，**注册路由**
* 在 index.js 中导入路由组件，**在 `<App>` 的最外侧包裹一个 `<BrowserRouter>` 或 `<HashRouter>`**
  * `<BrowserRouter>` 表示 **history** 模式的路由
  * `<HashRouter>` 表示 **Hash** 模式的路由

### 2. Link 介绍与属性

**介绍**：在应用程序周围提供声明式的,可访问的导航。无论你在何处渲染一个 `<Link>` ，都会在应用程序的 HTML 中渲染锚 （`<a>`）。

**Link 组件的属性**：

* **to**：string — 链接位置的字符串表示，通过连接位置的路径名，搜索和 hash 属性创建。
* **to**：Object — 一个可以具有以下任何属性的对象：
  - `pathname`: 表示要链接到的路径的字符串。
  - `search`: 表示查询参数的字符串形式。
  - `hash`: 放入网址的 hash，例如 `#a-hash`。
  - `state`: 状态持续到 `location`。
* **replace**：bool — 如果为 `true`，则单击链接将替换历史堆栈中的当前入口，不存在历史记录

**代码实例：App.jsx**
```jsx
import React, { Component } from 'react'
// 路由相关的都要从 react-router-dom 中导入
import { Link, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'

export default class App extends Component {
  render() {
    return (
      <div>
            {/* 1. 设置路由链接，React 中，靠路由链接跳转不同的组件 -- 路由链接*/}
            <Link  to="/home">Home</Link>
            <Link  to="/about" replace>About</Link>

            {/* 2. 使用 Route 渲染组件，注册路由 */}
            <Route path="/about" component={About}/>
            <Route path="/home" component={Home}/>
      </div>
    )
  }
}
```

**index.js**

```jsx
import { createRoot } from "react-dom/client";
import App from './App'
// 这里使用的是 history 模式的路由
import {BrowserRouter} from 'react-router-dom'

// 注意：这里使用的 React18 的写法
const root = createRoot(document.getElementById('root'))
root.render(
  <BrowserRouter>
    <App/>
  </BrowserRouter>
)
```



## 四、路由组件和一般组件

### 1. 写法不同
* 一般组件     `<Demo>`
* 路由组件     `<Route path="/demo" component={Demo}/>`

### 2. 存放位置不同
* 一般组件：components
* 路由组件：pages 或 views
	
### 3. 接收到的props不同
* 一般组件：写组件标签时传递了什么，就能收到什么

* 路由组件：接收到三个固定的属性

  * history：一些编程式导航的方法 push()、replace()、goForward()、go()、goBack() 等

  * location：当前路由的一些信息，参数。pathname、search、state 等

  * match：当前路由的一些信息，参数。path、url、params 等




## 五、NavLink 组件的使用

**介绍**：一个特殊版本的 Link，当它与当前 URL 匹配时，为其渲染元素添加样式属性。

**NavLink 组件的属性**：

* **activeName**：string — 要给出的元素的类处于活动状态时。**默认的给定类是 `active`**。它将与 `className` 属性一起使用。
* **activeStyle**：Object — 当元素处于 `active` 时应用于元素的样式

**代码示例 App.jsx**
```jsx
import React, { Component } from 'react'
import { NavLink, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'

export default class App extends Component {
  render() {
    return (
      <div>
            {/* 使用 NavLink -- 路由链接*/}
           	<NavLink activeClassName='coder' to="/about">About</NavLink>
            <NavLink activeStyle={{color: 'red'}} to="/home">Home</NavLink>

            {/* 2. 使用 Route 渲染组件，注册路由 */}
            <Route path="/about" component={About}/>
            <Route path="/home" component={Home}/>
      </div>
    )
  }
}
```



## 六、封装NavLink 组件

**代码示例：src/components/MyNavLink/index.jsx**

```jsx
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class MyNavLink extends Component {
  render() {
    console.log(this.props);
    return (
      // 标签体的内容会被收集到 props 上
      // 例如：children: 'About'，只要标签带有 children，就会展示标签体的内容
      <NavLink activeClassName='coder' {...this.props} />
    )
  }
}

```

**App.jsx**

```jsx
import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import MyNavLink from './components/MyNavLink'
import Home from './pages/Home'
import About from './pages/About'

export default class App extends Component {
  render() {
    return (
      <div>
            {/* 使用自己封装的路由链接 */}
            {/* 直接在标签体内写东西，会被当成 children 的值传过去，类似插槽*/}
            <MyNavLink to="/about">About</MyNavLink>
            <MyNavLink to="/home">
                <div>Coderbin</div>
            </MyNavLink>

            {/* 2. 使用 Route 渲染组件，注册路由 */}
            <Route path="/about" component={About}/>
            <Route path="/home" component={Home}/>
      </div>
    )
  }
}
```



## 七、Switch 组件的使用

**介绍**：渲染与该地址匹配的第一个子节点 `<Route>` 或者 `<Redirect>`。

**代码示例：App.jsx**

```jsx
import React, { Component } from 'react'
import { NavLink, Route, Switch } from 'react-router-dom'
import MyNavLink from './components/MyNavLink'
import Home from './pages/Home'
import About from './pages/About'

export default class App extends Component {
  render() {
    return (
      <div>
            {/* 设置路由链接 */}
            <NavLink to="/about">About</NavLink>
            <NavLink to="/home">Home</NavLink>

            {/* 注册路由 */}
            {/* 注册路由时，使用 Switch 组件包裹，可以实现单一匹配，一个路由对应一个组件 */}
            <Switch>
                <Route path="/about" component={About}/>
                <Route path="/home" component={Home}/>
                {/* 如果不使用 Switch 组件进行包裹，相同 path 的就会被匹配到，然后一起展示*/}
                {/* 使用了 Switch 组件进行包裹，就只会匹配到第一个相同的 path，而这个不会被匹配到*/}
                <Route path="/home" component={Test}/>
            </Switch>
      </div>
    )
  }
}
```

## 八、路由懒加载

### 1. 路由组件的lazyLoad

```jsx
import React, { Component, lazy, Suspense } from 'react'
import { NavLink, Route  } from 'react-router-dom'

//1.通过React的lazy函数配合import()函数动态加载路由组件 ===> 路由组件代码会被分开打包
const Home = lazy(() => import('./Home'))
const About = lazy(() => import('./About'))

export default class Lazyload extends Component {
  render() {
    return (
      <div>
        {/* 编写路由链接 */}
        <NavLink to='/home'>home</NavLink>&nbsp;&nbsp;
        <NavLink to='/about'>about</NavLink>

        {/* 注册路由 */}
        {/*2.通过<Suspense>指定在加载得到路由打包文件前显示一个自定义loading界面*/}
        {/* fallback 表示在跳转的过程中，展示的东西，可以是标签，或者一个组件(必须是正常引入的组件) */}
        <Suspense fallback={<h1>loading...</h1>}>
          <Route path="/home" component={Home}/>
          <Route path="/about" component={About}/>
        </Suspense>
        
      </div>
    )
  }
}
```



## 九、解决多级路径刷新页面样式丢失的问题

1. public/index.html 中 引入样式时不写 ./ 写 / （常用）

2. public/index.html 中 引入样式时不写 ./ 写 %PUBLIC_URL% （常用）

3. 使用HashRouter




## 十、路由的严格匹配与模糊匹配

1. 默认使用的是模糊匹配（简单记：【输入的路径】必须包含要【匹配的路径】，且顺序要一致）

2. 开启严格匹配：`<Route exact={true} path="/about" component={About}/>`

3. **严格匹配不要随便开启，需要再开，有些时候开启会导致无法继续匹配二级路由**




## 十一、Redirect 组件的使用  

**介绍**：渲染 `<Redirect>` 将使导航到一个新的地址。这个新的地址会覆盖 history 栈中的当前地址，类似服务器端（HTTP 3xx）的重定向。

**Redirect 组件的属性：**

* **to**：string — 重定向到的 URL，可以是任何 `path-to-regexp` 能够理解有效 URL 路径。在 `to` 中使用的 URL 参数必须由 `from` 覆盖。

```jsx
<Redirect to="/somewhere/else" />
```

* **to**：Object — 重定向到的 location，`pathname` 可以是任何 `path-to-regexp` 能够理解的有效的 URL 路径。
```jsx
<Redirect to={{pathname: "/login", search:"?utm=your+face", state:{ referrer: currentLocation }}}/>
```

* **push**：bool — 当为`true` 时，重定向会将新地址推入 history 中，而不是替换当前地址。
```jsx
<Redirect push to="/somewhere/else" />
```

**Redirect 组件的使用：**

1. 一般写在所有路由注册的最下方，当所有路由都无法匹配时，跳转到Redirect指定的路由

**代码示例：Appjsx**

```jsx
<Switch>
    <Route path="/about" component={About}/>
    <Route path="/home" component={Home}/>
    <Redirect to="/about"/>
</Switch>
```



## 十二、嵌套路由的使用方法

**使用嵌套路由的注意点**：

1. 嵌套路由的第一级路由在注册时，不可以写 **exact** 严格匹配 ！
2. 设置嵌套路由链接写 **to** 属性值时：二级路由的路径前要加一级路由的路径
3. 注册嵌套路由写 **path** 属性值时：要与路由链接的 to 属性值保持一致

**代码示例：Home.jsx**

```jsx
import React, { Component } from 'react'
import { NavLink, Route, Switch, Redirect } from 'react-router-dom'
import News from './News'
import Message from './Message'

export default class Home extends Component {
  render() {
    return (
      <div>
        <h3>我是 Home 的内容</h3>
        <div>
          <ul className="nav nav-tabs">
            <li>
              {/* 嵌套路由注意点一：嵌套路由的第一级路由不可以写 exact 严格匹配 */}
              {/* 嵌套路由注意点二：路由链接写 to 属性值时：二级路由的路径前要加一级路由的路径 */}
              <NavLink to="/home/news">News</NavLink>
            </li>
            <li>
              <NavLink className="list-group-item" to="/home/message">Message</NavLink>
            </li>
          </ul>
          {/* 注册路由 */}
          <Switch>
            {/* 嵌套路由注意点三：注册路由写 path 属性值时：要与路由链接的 to 属性值保持一致 */}
            <Route path="/home/news"  component={News}/>
            <Route path="/home/message" component={Message} />
            <Redirect to="/home/news"/>
          </Switch>
        </div>
      </div>
    )
  }
}

```





## 十三、向路由组件传递参数

### 1. 向路由组件传递 params 参数

**使用步骤**：

1. 路由链接(携带参数)：`<Link to='/demo/test/tom/18'}>详情</Link>`
2. 注册路由(声明接收)：`<Route path="/demo/test/:name/:age" component={Test}/>`
3. 接收参数：`this.props.match.params`


**代码示例：Message.jsx**

```jsx
import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'
import Detail from './Detail'

export default class Message extends Component {
  state = {
    messageArr: [
      {id: '01', title: '消息1'},
      {id: '02', title: '消息2'},
      {id: '03', title: '消息3'}
    ]
  }
  render() {
    return (
      <div>
        <ul>
          {
            this.state.messageArr.map(message => {
              return (
                <li key={message.id}>
                  {/* 注意：如果想在属性值写字符串模板，就要在 { } 里面写 */}
                  {/* 1. 向路由组件传递 params 参数，使用字符串模板直接写在后面就行 */}
                  <Link to={`/home/message/detail/${message.id}/${message.title}`}>{message.title}</Link>
                </li>
              )
            })
          }
        </ul>
        {/* 2. 注册路由时，要声明接收 params 参数 */}
        <Route path="/home/message/detail/:id/:title" component={Detail}/>
      </div>
    )
  }
}

```

**Detail.jsx**

```jsx
import React, { Component } from 'react'

const detialData = [
  {id: '01', content: '你好，中国'},
  {id: '02', content: '你好，React'},
  {id: '03', content: '你好，React-Router'}
]

export default class Detail extends Component {
  render() {
    // console.log(this.props);
    // 3. 接收路由携带的 params 参数， this.props.match.params 
    const { id, title } = this.props.match.params
    
    const detail = detialData.find(item => item.id === id)

    return (
      <ul>
        <li>ID: { id }</li>
        <li>TITLE: { title }</li>
        <li>CONTENT: { detail.content }</li>
      </ul>
    )
  }
}

```



### 2. 向组件传递 search 参数
**使用步骤**：

1. 路由链接(携带参数)：`<Link to='/demo/test?name=tom&age=18'}>详情</Link>`
2. 注册路由(无需声明，正常注册即可)：`<Route path="/demo/test" component={Test}/>`
3. 接收参数：`this.props.location.search`
4. 注意：获取到的 search 是urlencoded 编码字符串，需要借助 qs 解析


**代码示例：Message.jsx**

```jsx
import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'
import Detail from './Detail'

export default class Message extends Component {
  state = {
    messageArr: [
      {id: '01', title: '消息1'},
      {id: '02', title: '消息2'},
      {id: '03', title: '消息3'}
    ]
  }
  render() {
    return (
      <div>
        <ul>
          {
            this.state.messageArr.map(message => {
              return (
                <li key={message.id}>
                  {/* 注意：如果想在属性值写字符串模板，就要在 { } 里面写 */}
                  {/* 1. 向路由组件传递 search 参数，使用字符串模板，url 拼接的形式 */}
                  <Link to={`/home/message/detail/?id=${message.id}&title=${message.title}`}>{message.title}</Link>
                </li>
              )
            })
          }
        </ul>
        {/* 2. search 参数，不需要声明接收 */}
        <Route path="/home/message/detail" component={Detail}/>
      </div>
    )
  }
}

```

**Detail.jsx**

```jsx
import React, { Component } from 'react'

// 导入react的 qs 库，对获取的 search 字符串进行解析
import qs from 'qs'

const detialData = [
  {id: '01', content: '你好，中国'},
  {id: '02', content: '你好，React'},
  {id: '03', content: '你好，React-Router'}
]

export default class Detail extends Component {
  render() {
    // 3. 接收路由携带的 query 参数， this.props.location 
    const { search } = this.props.location  // 得到的结果：?id=01&title=消息1
    const { id, title } = qs.parse(search.slice(1)) // 去掉 ? 号
    
    const detail = detialData.find(item => item.id === id)
    return (
      <ul>
        <li>ID: { id }</li>
        <li>TITLE: { title }</li>
        <li>CONTENT: { detail.content }</li>
      </ul>
    )
  }
}

```


### 3. 向组件传递 state 参数
**使用步骤：**

<!-- 1. 路由链接(携带参数)：`<Link to={{pathname:'/demo/test',state:{name:'tom',age:18}}}>详情</Link>` -->
1. 路由链接(携带参数)：
```jsx
<Link to={{pathname:'/demo/test',state:{name:'tom',age:18}}}>详情</Link>
```
2. 注册路由(无需声明，正常注册即可)：`<Route path="/demo/test" component={Test}/>`
3. 接收参数：`this.props.location.state`
4. 注意：刷新也可以保留住参数

**代码示例：Message.jsx**

```jsx
import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'
import Detail from './Detail'

export default class Message extends Component {
  state = {
    messageArr: [
      {id: '01', title: '消息1'},
      {id: '02', title: '消息2'},
      {id: '03', title: '消息3'}
    ]
  }
  render() {
    return (
      <div>
        <ul>
          {
            this.state.messageArr.map(message => {
              return (
                <li key={message.id}>
                  {/* 注意：对于 {{}} ，外层 {} 表示里面写的是表达式，里层 {} 表示对象 */}
                  {/* 1. 向路由组件传递 state 参数，to 必须是个对象，pathname 路径，state 参数对象 */}
                  <Link to={{pathname:'/home/message/detail',state:{id:message.id,title:message.title}}}>{message.title}</Link>
                </li>
              )
            })
          }
        </ul>
        {/* 2. state 参数，不需要声明接收 */}
        <Route path="/home/message/detail" component={Detail}/>
      </div>
    )
  }
}

```

**Detail.jsx**

```jsx
import React, { Component } from 'react'

const detialData = [
  {id: '01', content: '你好，中国'},
  {id: '02', content: '你好，React'},
  {id: '03', content: '你好，React-Router'}
]

export default class Detail extends Component {
  render() {
    // 3. 接收路由携带的 state 参数， this.props.location.state
    const { id, title } = this.props.location.state || {} // 防止清除缓存，页面刷新导致获取不到数据
    const detail = detialData.find(item => item.id === id) || {}
    return (
      <ul>
        <li>ID: { id }</li>
        <li>TITLE: { title }</li>
        <li>CONTENT: { detail.content }</li>
      </ul>
    )
  }
}
```





## 十四、编程式路由导航
***
**介绍**：借助this.prosp.history对象上的API对操作路由跳转、前进、后退
* this.prosp.history.push()
* this.prosp.history.replace()
* this.prosp.history.goBack()
* this.prosp.history.goForward()
* this.prosp.history.go()


**代码示例：Detail.jsx**

```jsx
import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'
import Detail from './Detail'

export default class Message extends Component {
  state = {
    messageArr: [
      {id: '01', title: '消息1'},
      {id: '02', title: '消息2'},
      {id: '03', title: '消息3'}
    ]
  }

  // 编程式导航
  pushShow = (id, title) => {
    // TODO 调用 history.push() 方法，实现编程式导航
    // * 1. push 跳转 + 携带 params 参数
    // this.props.history.push(`/home/message/detail/${id}/${title}`)

    // * 2. push 跳转 + 携带 search 参数
    // this.props.history.push(`/home/message/detail?id=${id}&title=${title}`)

    // * 3. replace 跳转 + 携带 state 参数
    this.props.history.push({pathname:'/home/message/detail', state:{id, title}})
  }

  replaceShow = (id, title) => {
    return () => {
      // TODO 调用 history.replace() 方法，实现编程式导航
      // * 1. replace 跳转 + 携带 params 参数
      // this.props.history.replace(`/home/message/detail/${id}/${title}`)

      // * 2. replace 跳转 + 携带 search 参数
      // this.props.history.replace(`/home/message/detail?id=${id}&title=${title}`)

      // * 3. replace 跳转 + 携带 state 参数
      this.props.history.replace({pathname:'/home/message/detail', state:{id, title}})
    }
  }

  // 前进
  forward = () => {
    this.props.history.goForward()
  }

  // 后退
  back = () => {
    this.props.history.goBack()
  }

  // 根据值来决定前进还是后退
  go = () => {
    this.props.history.go(2)
  }

  render() {
    return (
      <div>
        <ul>
          {
            this.state.messageArr.map(message => {
              return (
                <li key={message.id}>
                  {/* 注意：对于 {{}} ，外层 {} 表示里面写的是表达式，里层 {} 表示对象 */}
                  {/* 1. 向路由组件传递 params|search|state 参数 */}
                  {/* <Link to={`/home/message/detail/${message.id}/${message.title}`}>{message.title}</Link> */}
                  {/* <Link to={`/home/message/detail?id=${message.id}&title=${message.title}`}>{message.title}</Link> */}
                  <Link to={{ pathname: '/home/message/detail', state: { id: message.id, title: message.title } }}>{message.title}</Link>
                  
                  &nbsp;<button onClick={()=>this.pushShow(message.id, message.title)}>push查看</button>
                  &nbsp;<button onClick={this.replaceShow(message.id, message.title)}>replace查看</button>
                </li>
              )
            })
          }
        </ul>
        {/* 2. 注册路由*/}
        {/* <Route path="/home/message/detail/:id/:title" component={Detail}/> */}
        <Route path="/home/message/detail" component={Detail}/>

        <button onClick={ this.forward }>前进</button>&nbsp;
        <button onClick={ this.back }>后退</button>&nbsp;
        <button onClick={ this.go }>go</button>
      </div>
    )
  }
}

```




## 十五、withRouter 的使用

**介绍**：您可以通过 `withRouter` 高阶组件访问 `history` 对象的属性和最近的 `<Route>` 的 `match` 。 当路由渲染时， `withRouter` 会将已经更新的 `match` ， `location` 和 `history` 属性传递给被包裹的组件。

其实就是让普通组件也具备路由组件所特有的 API

**代码示例：Header.jsx**

```jsx
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';

class Header extends Component {

  forward = () => {
    console.log('forward');
    this.props.history.goForward()
  }

  back = () => {
    console.log('back');
    this.props.history.goBack()
  }

  go = () => {
    console.log('go');
    this.props.history.go(2)
  }

  render() {
    // console.log('Header 组件接收的 props', this.props);
    return (
      <div className="page-header">
        <h2>React Router Demo</h2>

        <button onClick={ this.forward }>前进</button>&nbsp;
        <button onClick={ this.back }>后退</button>&nbsp;
        <button onClick={ this.go }>go</button>
      </div>
    )
  }
}

// withRouter 可以加工一般组件，让一般组件具备路由组件所特有的 API
// withRouter 的返回值是一个新组件
export default withRouter(Header)
```



## 十六、BrowserRouter与HashRouter的区别
**1. 底层原理不一样**
* BrowserRouter使用的是H5的history API，不兼容IE9及以下版本。
* HashRouter使用的是URL的哈希值。

**2. path表现形式不一样**
* BrowserRouter的路径中没有#,例如：localhost:3000/demo/test
* HashRouter的路径包含#,例如：localhost:3000/#/demo/test

**3. 刷新后对路由state参数的影响**
* (1).BrowserRouter没有任何影响，因为state保存在history对象中。
* (2).HashRouter刷新后会导致路由state参数的丢失！！！

**4. 备注:** HashRouter可以用于解决一些路径错误相关的问题。



​	
