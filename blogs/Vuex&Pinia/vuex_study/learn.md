---
title: Vuex 学习报告
date: 2022-05-11
tags:
 - Vuex
categories:
 -  Vuex
sidebar: 'auto'
---

# 前言 [官方文档](https://vuex.vuejs.org/zh/)
:::tip

今天这篇文章的主题是Vuex，所以看这篇文章之前最好是要有一定Vue基础的，没有学过Vue的话我建议先去看看Vue.js。不过我相信，对于前端小伙伴来说，Vue框架或多或少都会接触到。
:::

# Vuex 是什么？
***
> 官方说法：Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式 + 库。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。

# Vuex 有什么好处？
***
所谓的Vuex其实就是一个为Vue.js设计的数据仓库，就是把各个组件公用的数据放到一个仓库里面进行统一的管理，这样既使得非父子组件间的数据共享变得简单明了，也让程序变得更加可维护（将数据抽离了出来）,而且只要仓库里面的数据发生了变化，在其他组件里面数据被引用的地方也会自动更新。


## 1. 学习初始
***
这里使用 vuecli 来快速创建一个vue3项目，这里选择 JS 编写（使用 JS 或 TS 都可以）
```
vue create learn_vux
```
## 2. 安装
***
我们这里使用的是vuex4.x，安装的时候需要添加 next 指定版本
***
```
npm install vuex@next --save
```

## 3. 基本配置
***

### 3.1 创建仓库
在 src 目录下创建 `store/index.js` store 仓库
```js
import { createStore } from "vuex";

const store = createStore({

})

export default store
```

### 3.2 在 `main.js` 文件中，有以下两个步骤：
```js
import { createApp } from 'vue'
import App from './App.vue'

// 1. 导入 store
import store from './store'

// 2. 挂载到 Vue 根实例
createApp(App).use(store).mount('#app')
```
这样，一个 Vuex 仓库就构建完成啦！

## 4. state 选项的使用 [state](https://vuex.vuejs.org/zh/guide/state.html)
***
全局共享的数据，只允许在 mutation 中修改（后面会讲）
```js
import { createStore } from "vuex";

const store = createStore({
  // state 提供唯一的公共数据源，所有共享的数据都要统一放到 Store 的 state 中进行存储
  // state 必须写成函数的形式并在 return 的对象中存放数据
  state() {
    return {
      count: 10
    }
  }
})
export default store
```
### 4.1 在组件中的 template 和 script 中使用 state
```vue
<template>
  <!-- 获取state -->
  <h2>{{ $store.state.count }}</h2>
  <h2>{{ ucount }}</h2>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'App',
  setup() {
    // 在 setup 中，必须通过实例 useStore() 才能拿到 store 中的数据
    const store = useStore()
    // // 通过 compute 获取 store 数据（缺点是数据只能一条一条取）
    const ucount = computed(() => store.state.count);

    return {
      ucount,
    }
  }
}
</script>
```
## 5. mapState 辅助函数
***
1. 在组件中的 script 中使用 mapState，options API 的写法：
```vue
<template>
  <div>
    <h2>Home:{{ $store.state.counter }}</h2>
    <h2>Home:{{ sCounter }}</h2>
    <h2>Home:{{ sName }}</h2>
  </div>
</template>
<script>
// 使用 mapState 辅助函数
import { mapState } from 'vuex'
export default {
  // 也可以使用展开运算符和来原有的computed混合在一起；
  computed: {
    // 1. 数组写法
    // ...mapState(["counter", "name", "age", "height"])

    // 2. 对象写法（可以给state里面的值换个变量名）
    ...mapState({
      sCounter: state => state.counter,
      sName: state => state.name
    })
  }
}
</script>
```
2. 在组件中的 script 中使用 mapState，composition API 的写法：
```vue
<template>
  <div>
    <h2>{{counter}}</h2>
    <h2>{{name}}</h2>
    <h2>{{age}}</h2>
    <h2>{{height}}</h2>
    <hr>
  </div>
</template>

<script>
import { mapState, useStore } from 'vuex'
import { computed } from 'vue'

export default {
  setup() {
    // coderwhy老师的方法
    const storeStateFns = mapState(["counter", "name", "age", "height"])
    // {name: function, age: function, height: function}
    // 转化为：
    // {name: ref, age: ref, height: ref}
    const storeState = {}
    // 1. 取出 storeStateFns 中所有的 key，并遍历
    Object.keys(storeStateFns).forEach(fnKey => {
      // 2. 通过调用函数身上的 bind() 方法去绑定this，也就是store（属性为$store，值为store）
      const fn = storeStateFns[fnKey].bind({$store: store})
      // 3. 将 fn 函数转化为compute的形式赋值给每一个对应的key（其实就是store中state的变量，而函数则是每一个对应的值）
      storeState[fnKey] = computed(fn)
    })

    return {
      ...storeState
    }
  }
}
</script>
```
setup 中使用 mapState 会比较麻烦一点，现在来对这个方法进行封装：

在 src 目录下，创建 hook/useState.js 文件
```js
import { computed } from 'vue'
import { mapState, useStore } from 'vuex'

export function useState(mapper) {
  // 拿到store对象
  const store = useStore()

  // 获取到对应的对象的functions: {name: function, age: function}
  const storeStateFns = mapState(mapper)

  // 对数据进行转换
  const storeState = {}
  Object.keys(storeStateFns).forEach(fnKey => {
    const fn = storeStateFns[fnKey].bind({$store: store})
    storeState[fnKey] = computed(fn)
  })

  return storeState
}
```
在组件中的 script 使用方式如下：
```js
import { useState } from '../hooks/useState'

export default {
  setup() {
    // 数组、对象的写法都支持
    const storeState = useState(["counter", "name", "age", "height"])
    const storeState2 = useState({
      sCounter: state => state.counter,
      sName: state => state.name
    })

    return {
      ...storeState,
      ...storeState2
    }
  }
}
```
## 6. getters 选项的使用 [getters](https://vuex.vuejs.org/zh/guide/getters.html)
***
getters 可以对 Store 中已有的数据加工处理之后形成新的数据，类似 Vue 的计算属性。注意：getters 中只能返回用于展示的数据，不可修改数据
***
```js
import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      count: 10
    }
  },
  // Store 中数据发生变化，getters 的数据也会跟着变化。
  // 参数一：state，可以获取到 state 里面的数据
  // 参数二：getters，可以使用其他 getters 的值
  getters: {
    doubleCount(state, getters) {
      return state.count * 2
    }
    // doubleCount:state => {
    //   return state.count * 2
    // }
  }
})
export default store
```
注意：可以采用箭头函数的写法、state为上面的数据源、必须return出值

### 6.1 在组件中的 template 和 script 中使用 getters
```vue
<template>
  <!-- 获取getters -->
  <h2>doubleCount: {{ $store.getters.doubleCount}}</h2>
  <h2>doubleCount: {{dcount}}</h2>
</template>

<script>
import { computed } from 'vue';
import { useStore, mapState } from 'vuex'
export default {
  name: 'App',
  setup() {
    const store = useStore()
    // 获取getters
    const dcount = store.getters.doubleCount
    // 结合 computed 使用
    // const dcount = computed(() => store.getters.doubleCount)

    return {
      dcount
    }
  }
}
</script>
```

### 6.2 getters 的返回值可以是个函数
getters的返回值是一个函数，可以接收参数，然后调用这个函数。一般用于需要接收参数的时候使用
```js
import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      count: 10
    }
  },
  getters: {
    countN(state, getters) {
      // 调用时接收一个参数
      return function(n) {
        return state.count + n
      }
    }
  }
})
export default store
```
template 中使用时就要调用这个return的函数
```vue
<template>
  <h2>countN: {{$store.getters.countN(5)}}</h2>
</template>
```

## 7. mapGetters 辅助函数
***
1. 在组件中的 script 中使用 mapState，options API 的写法：
```vue
<template>
  <div>
    <h2>{{ ageInfo }}</h2>
    <h2>{{ heightInfo }}</h2>
    <h2>{{ sNameInfo }}</h2>
    <h2>{{ sAgeInfo }}</h2>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    // option API 写法
    computed: {
      // 数组写法
      ...mapGetters(["nameInfo", "ageInfo", "heightInfo"]),
      // 对象写法
      ...mapGetters({
        sNameInfo: "nameInfo",
        sAgeInfo: "ageInfo"
      })
    },
  }
</script>
```
2. 在组件中的 script 中使用 mapGetters，composition API 的写法：
* setup 中使用 mapGetters 跟使用 mapState 的方法差不多，这里也先封装成一个hook，然后直接调用。
在 src 目录下，创建 hook/useGetters.js 文件
```js
import { computed } from 'vue'
import { mapGetters, useStore } from 'vuex'

export function useGetters(mapper) {
  // 拿到store对象
  const store = useStore()

  // 获取到对应的对象的functions: {name: function, age: function}
  const storeStateFns = mapGetters(mapper)

  // 对数据进行转换
  const storeState = {}
  Object.keys(storeStateFns).forEach(fnKey => {
    const fn = storeStateFns[fnKey].bind({$store: store})
    storeState[fnKey] = computed(fn)
  })

  return storeState
}
```
在组件中的使用方式如下：
```vue
<template>
  <div>
    <h2>传统写法：{{ sNameInfo }}</h2>
    <h2>{{ nameInfo }}</h2>
    <h2>{{ ageInfo }}</h2>
    <h2>{{ heightInfo }}</h2>
    <hr>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useGetters } from '../hooks/useGetters'

export default {
  setup() {
    // 传统写法
    const store = useStore();
    const sNameInfo = computed(() => store.getters.nameInfo);

    // 封装 getters 后的写法
    const storeGetters = useGetters(["nameInfo", "ageInfo", "heightInfo"])

    return {
      sNameInfo,
      ...storeGetters
    }
  }
}
</script>
```

## 8. mutations 选项的使用 [mutations](https://vuex.vuejs.org/zh/guide/mutations.html)
***
一条重要的原则就是要记住 mutation 必须是同步函数
```js
import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      count: 10
    }
  },
  getters: {
    doubleCount(state, getters) {
      return state.count * 2
    }
  },
  // 1. Mutation 用于变更 Store中 的数据。
  // 2. 只能通过 mutation 变更 Store 数据，不可以直接操作 Store 中的数据。
  // 3. 通过这种方式虽然操作起来稍微繁琐一些，但是可以集中监控所有数据的变化。

  // 参数一：state，可以获取state中的数据
  // 参数二：载荷，即额外的参数
  // 在大多数情况下，载荷应该是一个对象，这样可以包含多个字段并且记录的 mutation 会更易读
  mutations: {
    increment(state, payload) {
      state.count += payload.num
    }
  }
})
export default store
```
### 8.1 在组件中的 template 和 script 中提交 mutations
```vue
<template>
  <div>
    <hr>
      <button @click="$store.commit('increment')">+1</button>
      <button @click="addTen">+10</button>
    <hr>
  </div>
</template>

<script>
export default {
  methods: {
    addTen() {
      // 普通的写法
      // this.$store.commit('incrementN', {num: 10})
      
      // 另外一种提交风格
      this.$store.commit({
        type: 'increment_n',
        num: 10, 
      })
    }
  }
}
</script>
```
## 9. mapMutations 辅助函数
***
```vue
<template>
  <div>
    <h2>当前计数: {{ $store.state.counter }}</h2>
    <hr>
      <button @click="increment">+1</button>
      <button @click="add">+1</button>
    <hr>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
  // options API 中的使用
  methods: {
    ...mapMutations(["increment", ]),
    ...mapMutations({
      add: "increment"
    })
  },

  // composition API 中的使用
  setup() {
    const storeMutations = mapMutations(["increment",])

    return {
      ...storeMutations
    }
  }
}
</script>
```

## 10. actions 选项的使用 [actions](https://vuex.vuejs.org/zh/guide/actions.html)
***
Action 类似于 mutation，不同在于：
* Action 提交的是 mutation，而不是直接变更状态。
* Action 可以包含任意异步操作。



```js
import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      count: 10
    }
  },
  getters: {
    doubleCount(state, getters) {
      return state.count * 2
    }
  },
  mutations: {
    increment(state, payload) {
      state.count ++
    }
  },
  // 1. actions 用于处理异步任务
  // 2. 在 actions 中，不能直接修改 state 中的数据
  // 3. 必须通过 context.commit() 触发某个 mutations 才行
  actions: {
    incrementAction(context, payload) {
      console.log(payload)
      setTimeout(() => {
        context.commit('increment')
      }, 1000);
    },
  }
})
export default store
```
### 10.1 组件中使用，派发 actions
```vue
<template>
  <div>
      <button @click="increment">+1</button>
      <button @click="add">+1</button>
    <hr>
  </div>
</template>

<script>
import { useStore, mapState } from 'vuex'

export default {
  // composition API 的写法
  setup() {
    const store = useStore()
    const add = () => {
      store.dispatch('incrementAction', {count: 100})
    }
  }

  // options API 的写法
  methods: {
    increment() {
      // 携带参数
      this.$store.dispatch("incrementAction", {count: 100})
    },
    decrement() {
      // 3.派发风格(对象类型)
      this.$store.dispatch({
        type: "decrementAction"
      })
    }
  }
}
</script>
```

## 11. mapActions 辅助函数
```vue
<template>
  <div>
    <h2>当前计数: {{ $store.state.counter }}</h2>
    <hr>
      <button @click="incrementAction">+1</button>
      <button @click="decrementAction">-1</button>
      <button @click="add">+1</button>
      <button @click="sub">-1</button>
    <hr>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  // options API 写法
  methods: {
    // ...mapActions(["incrementAction", "decrementAction"]),
    // ...mapActions({
    //   add: "incrementAction",
    //   sub: "decrementAction"
    // })
  },

  // composition API 写法
  setup() {
    const actions = mapActions(["incrementAction", "decrementAction"])
    const actions2 = mapActions({
      add: "incrementAction",
      sub: "decrementAction"
    })

    return {
      ...actions,
      ...actions2
    }
  }
}
</script>
```

## 12. modules 选项的使用 [modules](https://vuex.vuejs.org/zh/guide/modules.html)
Vuex 允许我们将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割。

由于modules 内容太多且稍显复杂，这里不在演示，若想继续学习可前往官网学习

