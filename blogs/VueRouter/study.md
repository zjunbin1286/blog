---
title: 001 路由学习
date: 2022-01-27
categories: 
  - VueRouter
tags: 
  - VueRouer
sidebar: 'auto'
---

# Vue-Router 4.x [官方文档](https://next.router.vuejs.org/zh/)

::: tip 介绍
Vue Router 是 Vue.js 的官方路由。它与 Vue.js 核心深度集成，让用 Vue.js 构建单页应用变得轻而易举。
:::

>声明：以下伪代码在 vue3 环境运行

## 1. 安装
***
```
npm i vue-router@4
```

## 2. 配置步骤
***
（1） src目录下，创建 router/index.js 文件
```javascript
// 1. 按需导入路由对应的函数，和需要的跳转的组件
import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './components/Home.vue'

// 2. 声明路由规则
const routes = [
  { path: '/home', name: 'Home', component: Home}
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
***
**在组件中的 template 模板中声明**

```vue
<template>
    <router-view></router-view>
</template>
```

## 4. 路由链接 router-link
***
### 4.1 router-link 的属性
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
（5） `replace` 属性：替换地址，**不存在历史记录**
```vue
<template>
  <router-link to='/home' replace>首页</router-link>
</template>
```
（6） `exact-active-class`属性：
链接精准激活时，应用于渲染的 router-link 的 class，默认是router-link-exact-active；

### 4.2 router-link 的 slot
1. 在vue-router3.x的时候，router-link有一个`tag`属性，可以决定router-link到底渲染成什么元素：
* 但是在vue-router4.x开始，该属性被移除了；
* 而给我们提供了更加具有灵活性的`v-slot`的方式来定制渲染的内容；
2. v-slot如何使用呢？
* 首先，我们需要使用custom表示我们整个元素要自定义，如果不写，那么自定义的内容会被包裹在一个 a 元素中；
* 其次，我们使用v-slot来作用域插槽来获取内部传给我们的值：
3. prop 的值：
* href：解析后的 URL；
* route：解析后的规范化的route对象；
* navigate：触发导航的函数；
* isActive：是否匹配的状态；
* isExactActive：是否是精准匹配的状态；
```html
<template>
<!-- <router-link> 的插槽，里面是什么就渲染什么-->
    <!-- props: href 跳转的链接 -->
    <!-- props: route对象 -->
    <!-- props: navigate导航函数 前往路由所在的位置-->
    <!-- props: isActive 是否当前处于活跃的状态 -->
    <!-- props: isExactActive 是否当前处于精确的活跃状态 -->
    <!-- custom 属性，表示整个元素要自定义 -->
    <router-link to="/home" v-slot="props" custom>
      <button @click="props.navigate">{{props.href}}</button>
      <button @click="props.navigate">哈哈哈</button>
      <span :class="{'active': props.isActive}">{{props.isActive}}</span>
      <span :class="{'active': props.isActive}">{{props.isExactActive}}</span>
      <!-- <p>{{props.route}}</p> -->
    </router-link>
</template>
```

## 5. 编程式导航
***
```javascript
import { useRouter } from 'vue-router'

// 创建 router 对象，调出方法
const router = useRouter()
const click = () => {
  // 1. 普通写法
  // router.push('/home')
  // router.replace('/about')

  // 2. 对象的写法，可以添加 query 参数，跳转到对应页面后，可以通过 route.query 获取到 query 参数
  router.push({
    path: '/home',
    query: {
      name: 'CoderBin'
      age: 18
    }
  })
}
```
**拓展**

**`router`**：是 vue-router 的一个 **对象**，这个对象是 **全局的对象**，包含了所有的路由，和许多关键的 **属性和对象**

**`route`**：是一个跳转的路由对象，每个路由都会有一个 route 对象，是一个 **局部的对象**，可获取当前组件对应的 **name、path、query、params**等...

## 6. 动态路由
***
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

## 7. 设置 NotFound 页面
***
对于那些没有匹配到的路由，我们通常会匹配到固定的某个页面

比如NotFound的错误页面中，这个时候我们可编写一个动态路由用于匹配所有的页面；
```js
const route = [
    {
    // 对于那些没有匹配到的路由，我们通常会匹配到固定的某个页面
    // 注意：
    // 1. "/:pathMatch(.*)" 会匹配到不存在的路由地址
    // 2. 我们可以通过 $route.params.pathMatch 获取到传入的参数：
    // 3. 还有一种写法："/:pathMatch(.*)*"，就是后面多了个*号，区别在于获取参数时会以 / 号为分隔符，组成一个数组
    path: "/:pathMatch(.*)",
    component: () => import("../pages/NotFound.vue")
  }
]
```

## 8. 路由懒加载
***
::: tip 介绍
1. 把不同路由对应的组件分成不同代码块，当路由**被访问时才加载对应组件**；<br>
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
## 9. 嵌套路由 
***
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
## 10. 路由重定向
***
`router/index.js`中，使用 `redirect` 选项实现
```js
// 路由规则
const routes = [
  // 当访问根路径时，自动跳转至 /home
  { path: '/', redirect: 'home'},
  { path: '/home', component: Home}
]
```


## 11. 参数传递
***
在组件中，使用 `query` 属性，以对象形式传递参数
```vue
<template>
  <router-link :to="{path: '/about'}", query:{name: 'jack', age: 22}></router-link>
</template>
```
注意：抽离成方法也行

## 12. 全局前置守卫 & 路由元信息
***
1. `全局前置守卫`：当一个导航触发，在**跳转之前**会被这个前置守卫拦截下来，并执行守卫里面的相关操作

2. `meta 路由元信息`：如果希望将任意信息**附加到路由上**，如过渡名称，谁可以访问等，就可以通过接收属性对象的 `meta` 属性来实现，并且他在`路由地址`和`导航守卫` 上都可以被访问到

注意：`router/index.js` 中，mate 要作为**选项**被写到路由规则中，值可以是任意类型，一般用对象形式。
* 在对应组件中可以通过`route.meta`获取meta值
```js
import { useRoute } from "vue-router"
const route = useRoute()
console.log('home 的路由元信息：',route.meta);
```
* 在前置导航守卫中可以通过`to.meta`获取meta值；
```js
const routes = [
  { path: '/home', component: Home, meta: {title: '首页'}}
]

// 声明全局前置守卫
/**
 * 返回值问题:
 *    1.false: 不进行导航
 *    2.undefined或者不写返回值: 进行默认导航
 *    3.字符串: 路径, 跳转到对应的路径中
 *    4.对象: 类似于 router.push({path: "/login", query: ....})
 */
router.beforeEach((to, from) => {
  // to: Route对象, 即将跳转到的Route对象
  // from: Route对象, 
  // next: 第三个参数可选，vue-router4.x 已经不推荐使用，推荐使用return控制跳转
  console.log('导航守卫里面获取路由元信息：',to.meta);
  if (to.path !== "/login") {
    const token = window.localStorage.getItem("token");
    if (!token) {
      return "/login"
    }
  }
  // return false;    //不进行导航 
})
```
## 13. 全局后置钩子（守卫）
***
**后置钩子**：当跳转到了当面界面，做一些操作

`router/index.js` 中
```js
router.after((to,from)=>{
  document.title = to.meta.title
})
```
## 14. 路由独享的守卫（了解）
***
直接在路由规则上定义 beforeEnter 守卫
```js
const route = [
  { path: '/home', component: Home,
    beforeEnter: (to, from ) => { /* 一些操作 */ }
  }
]
```
注：只在**进入当前路由时**触发，可传递数组进去 beforeEnter :  [fn1, fn2]

## 15. 组件内的守卫（了解）
***
在组件内自由定义导航守卫，极少用到
```js
OnBeforeRouteUpdate((to, from, next) => { .... })
OnBeforeRouteLeave((to, from, next) => { .... })
```
## 16. keep-aclive 组件缓存
***
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
<keep-alive include="Home"> ... </keep-alive>
```

## 17. router-view 的 slot，配合 transition 实现切换组件时候的动画
***
router-view也提供给我们一个插槽，可以用于 transition 和 keep-alive 组件来包裹你的路由组件：
* Component：要渲染的组件；
* route：解析出的标准化路由对象；
```html
<template>
  <!-- 注意：这里直接将 transition 和 keep-alive 一起用了 -->
  <router-view v-slot="props">
    <transition>
      <keep-alive>
        <component :is="props.Component"></component>
      </keep-alive>
    </transition>
  </router-view>
</template>

<style scope>
  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }

  .v-enter-active,
  .v-leave-active {
    transition: opacity 1s ease;
  }
</style>
```

## 18. 动态添加路由
***
说明：某些情况下我们可能需要动态的来添加路由：
* 比如根据用户不同的权限，注册不同的路由；
* 这个时候我们可以使用一个方法 addRoute；
```js
//TODO 动态添加路由
// 例如：用户的身份为管理员的时候，才注册某些带权限的路由，这个一般在前置导航守卫里面做判断
const categoryRoute = {
  path: "/category",
  component: () => import("../pages/Category.vue")
}
// 添加顶级路由对象，也就是最外层的路由
router.addRoute(categoryRoute);

// 添加二级路由对象，某一路由的子路由
router.addRoute("home", {
  path: "moment",
  component: () => import("../pages/HomeMoment.vue")
})
```

## 19. 动态删除路由
***
删除路由有以下三种方式：
1. 添加一个已经存在的，`name` 属性值相同的路由，替换旧的路由
```js
router.addRoute({path: '/about', name: 'order', component: './About.vue'})
```
2. 通过 `removeRoute()` 方法，传入路由的名称，删除路由，一般用这一种方式
```js
router.addRoute({path: '/about', name: 'about', component: './About.vue'})
// 删除路由
router.removeRoute('about')
```
3. 通过 `addRoute()` 方法的返回值回调
```js
const removeRoute = router.addRoute(routeRecord)
removeRoute() //删除路由如果存在的话
```

## 20. 路由的其他方法补充
***
1. `router.hasRoute()`: 检查路由是否存在
2. `router.getRoute()`: 获取一个包含所有路由记录的数组


结束


第一篇文章，完结撒花~~ ✿✿ヽ(°▽°)ノ✿