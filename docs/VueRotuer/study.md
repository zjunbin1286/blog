---
title: 001 路由学习
date: 2022-01-27
# categories: 
#   - VueRouter
# tages: 
#   - VueRouer
# sidebar: 'auto'
---

# Vue-Router 4.x [官网](https://next.router.vuejs.org/zh/)

::: tip 介绍
1. Vue Router 是 Vue.js 的官方路由。它与 Vue.js 核心深度集成，让用 Vue.js 构建单页应用变得轻而易举。功能包括：<br>
2. 嵌套路由映射<br>
3. 动态路由选择<br>
4. 模块化、基于组件的路由配置<br>
5. 路由参数、查询、通配符<br>
6. 展示由 Vue.js 的过渡系统提供的过渡效果<br>
7. 细致的导航控制<br>
8. 自动激活 CSS 类的链接<br>
9. HTML5 history 模式或 hash 模式<br>
12. 可定制的滚动行为<br>
11. URL 的正确编码<br>

:::

>声明：以下伪代码在 vue3 环境运行

## 1. 安装

```
npm i vue-router@4
```

## 2. 配置步骤

（1） src目录下，创建 router/index.js 文件
```javascript
// 1. 按需导入路由对应的函数，和需要的跳转的组件
import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './components/Home.vue'

// 2. 声明路由规则
const routes = [
  { path: '/home', components: Home}
]

// 3. 创建路由对象
const router = createRouter({
  history: createWebHashHistory(),  // 这里采用的是 hash 模式
  routes                            // 上面声明的路由规则
})

// 4. 向外共享路由对象
export default router
```

（2） ` main.js` 文件中
```javascript
import { createApp } from 'vue'
import App from './App.vue'
// 1. 导入路由对象
import router from './router/index.js'

// 2. 使用 use() 将路由对象安装为 vue 全局插件
createApp(App).use(router).mount('#app')
```
## 3. 路由出口 router-view

**在组件中的 template 模板中声明**

```vue
<template>
    <router-view></router-view>
</template>
```

## 4. 路由链接 router-link

**在组件中的 template 模板中声明**

（1）**`to 属性`**：跳转的地址
```vue
<template>
  <rouer-link to="/home">首页</rouer-link>
</template>
```
（2）  `active-class 属性`：链接被激活时触发的样式类
```vue
<template>
  <rouer-link to="/home" active-class="current">首页</rouer-link>
</template>

<style>
  /* 缺点：只能一个个添加该属性 */
  .current {
    color: red;
  }
</style>
```
（3） `router 默认样式类`
```vue
<style>
  /* 只要某一路由链接被触发，就会默认触发此类 */
.router-link-active {
  color: red
}
</style>
```
（4） `linkActiveClass` ：是创建路由对象时的一个可选项
```javascript
const router = createRouter({
  ···
  linkActiveClass = 'current'
  // 此类优先级最高，在组件中有路由链接被触发，有此类的样式就会执行，
})
```
（5） `replace 属性`：替换地址，**不存在历史记录**
```vue
<template>
  <router-link to='/home' replace>首页</router-link>
</template>
```

## 5. 编程式导航
```javascript
import { useRouter } from 'vue-router'

// 创建 router 对象，调出方法
const router = useRouter()
const click = () => {
  router.push('/home')
  // router.replace('/about')
}
```
**拓展**

**`router`**：是 vue-router 的一个 **对象**，这个对象是 **全局的对象**，包含了所有的路由，和许多关键的 **属性和对象**

**`route`**：是一个跳转的路由对象，每个路由都会有一个 route 对象，是一个 **局部的对象**，可获取当前组件对应的 **name、path、query、params**等...

## 6. 动态路由
`router/index.js` 中，路径里面的 id 就为 **动态参数**
```javascript
routes = [
  { path: '/new/:id', component: New}
]
```
`App.vue` 中，这个 id 值可以通过请求数据，动态获取 id，以实现 **动态路由**
```vue
<template>
  <router-link to='/new/001'>新闻</router-link>
</template>
```
### 6.1 获取动态路由参数
第一种方式：`New.vue` 中，注意：其中的 id 为路由规则中定义的**路由参数名**
```vue
<template>
  <p>{{ $route.params.id }}</p>
</template>
```
第二种方式：`New.vue` 中
```vue
<script setup>
  import { useRoute } from 'vue-router'
  
  const route = useRoute()
  console.log(route.params.id)
</script>
```

## 7. 路由懒加载
::: tip 介绍
1. 把不同路由对应的组件分成不同代码块，当路由`被访问时才加载对应组件`；<br>
2. 性能优化，更加高效；<br>
:::
```js
// 1. 可以这样导入
const Home = () => import('./components/Home.vue')

// 3. 把组件按组分块，这样打包时候会被打包到一个地方
const New = () => import(/*webpackChunckName:"group-new"*/'./components/New.vue')

const route = [
  { path: '/home', component: Home},
  // 2. 也可以直接写在路由规则中，这种称为 动态导入
  { path: '/about', component: ()=>import('./components/About.vue')}
]
```
## 8. 嵌套路由 
`router/index.js`中，使用 `children` 选项实现，注意：子路由里面不需要加 / 号
```js
// 路由规则
const routes = [
  path: 'mine',
  component: Mine,
  children: [
    { path: 'msg', component: Msg}
  ]
]
```
## 9. 路由重定向
`router/index.js`中，使用 `redirect` 选项实现
```js
// 路由规则
const routes = [
  // 当访问根路径时，自动跳转至 /home
  { path: '/', redirect: 'home'},
  { path: '/home', component: Home}
]
```

## 10. 参数传递
在组件中，使用 `query` 属性，以对象形式传递参数
```vue
<template>
  <router-link :to="{path: '/about'}", query:{name: 'jack', age: 22}></router-link>
</template>
```
注意：抽离成方法也行

## 11. 全局前置守卫 & 路由元信息
`全局前置守卫`：当一个导航触发，在**跳转之前**会被这个前置守卫拦截下来，并执行守卫里面的相关操作

`meta 路由元信息`：如果希望将任意信息**附加到路由上**，如过渡名称，谁可以访问等，就可以通过接收属性对象的 `meta` 属性来实现，并且他在`路由地址`和`导航守卫` 上都可以被访问到

`router/index.js` 中，mate 要作为**选项**被写到路由规则中，值可以是任意类型，一般用对象形式
```js
const routes = [
  { path: '/home', component: Home, meta: {title: '首页'}}
]

// 声明全局前置守卫
router.beforeEach((to,from,next)=>{
  // to 将要去到的地址
  // from 来的地址
  // next 是一个函数，表示放行，一般 next() 即可，也可以 next('/login') 表示强制跳转到该登陆界面
  
  // 这里可以控制跳转的登录界面，比如禁止用户在  URL 地址栏输入地址，如果不是登录界面，就强制跳转 
})
```
## 12. 全局后置钩子（守卫）
**后置钩子**：当跳转到了当面界面，做一些操作

`router/index.js` 中
```js
router.after((to,from)=>{
  document.title = to.meta.title
})
```
## 13. 路由独享的守卫（了解）
直接在路由规则上定义 beforeEnter 守卫
```js
const route = [
  { path: '/home', component: Home,
    beforeEnter: (to, from ) => { /* 一些操作 */ }
  }
]
```
注：只在**进入当前路由时**触发，可传递数组进去 beforeEnter :  [fn1, fn2]

## 14. 组件内的守卫（了解）
在组件内自由定义导航守卫，极少用到
```js
OnBeforeRouteUpdate((to, from, next) => { .... })
OnBeforeRouteLeave((to, from, next) => { .... })
```
## 15. keep-aclive
将当前导航到的组件**缓存下来**，下次使用时，直接取出，**避免了组件重复创建与销毁（数据不断请求）**
`App.vue` 中，直接添加以下代码即可
```vue
<router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
</router-view>
```
（1） `exclude` 属性，任何名称匹配的组件都**不会被缓存**
```vue
<router-view v-slot="{ Component }">
    <keep-alive exclude="About"
      <component :is="Component" />
    </keep-alive>
</router-view>
```
也可以多个：
```vue
<keep-alive :exclude="['About', 'New']"> ... </keep-alive>
```
（2） `include` 属性，任何名称匹配的组件都**会被缓存**
```vue
<keep-alive exclude="Home"> ... </keep-alive>
```
结束


第一篇文章，完结撒花~~ ✿✿ヽ(°▽°)ノ✿