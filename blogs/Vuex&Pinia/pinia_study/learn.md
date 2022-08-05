---
title: Pinia 学习报告
date: 2022-03-11
tags:
 - Pinia
categories:
 -  Pinia
sidebar: 'auto'
---
# 前言 [官方文档](https://pinia.vuejs.org/)
:::tip

Pinia.js 是新一代的状态管理器，由 Vue.js团队中成员所开发的，因此也被认为是下一代的 Vuex，即 Vuex5.x，在 Vue3.0 的项目中使用也是备受推崇。
:::
**Pinia.js 有如下特点：**
* 完整的 typescript 的支持；
* 足够轻量，压缩后的体积只有1.6kb;
* 去除 mutations，只有 state，getters，actions（这是我最喜欢的一个特点）；
* actions 支持同步和异步；
* 没有模块嵌套，只有 store 的概念，store 之间可以自由使用，更好的代码分割；
* 无需手动添加 store，store 一旦创建便会自动添加；

## 1. 学习初始
***
这里使用 vite 来快速创建一个vue3项目，这里选择 TS 编写（使用 JS 或 TS 都可以）
```
npm init vite@latest
```

## 2. 安装
***
```
npm i pinia
```

## 3. 基本配置
***
### 3.1 在 `main.ts` 文件中，有以下三个步骤：
```ts
import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)

// 1. 导入 pinia
import { createPinia } from 'pinia'

// 2. 创建 pinia 实例
const pinia = createPinia()

// 3. 挂载到 Vue 根实例
app.use(pinia)

app.mount('#app')
```

### 3.2 创建仓库
在 src 目录下创建 `/store/index.ts` pinia 仓库
```ts
import { defineStore } from "pinia";

export const useMineStore = defineStore('main', {
  state: () => {
    return {}
  },

  actions: {
  },
  
  getters: {
  }
})
```
这样，一个 pinia 仓库就构建完成啦！

## 4. 仓库解读
***
```ts
import { defineStore } from "pinia";

/**
 * 1. 定义并导出容器
 * 参数 1：容器的 ID，必须唯一，将来 Pinia 会把所有的容器挂载到根容器（命名合法即可）
 * 参数 1：选项对象
 * 返回值：一个函数，调用得到容器实例
 */
export const useMineStore = defineStore('main', {
  //* 类似于组件中的 data，用来存储全局状态
  // 1. 必须是函数：这样是为了在服务器渲染的时候避免交叉请求导致的数据转态污染
  // 2. 必须是箭头函数：这是为了更好的 TS 类型推导
  state: () => {
    return {
      count: 100,
      foo: 'bar'
    }
  },
  //* 类似于组件的 methods，封装业务逻辑，修改 state
  // 不要用 箭头函数定义 actions ，否则里面无法使用 this！因为箭头函数绑定的是外部 this
  actions: {

  },
  //* 类似组件的 computed，封装计算属性，具有缓存功能
  getters: {

  }
})
```

## 5. 组件中使用仓库数据
***
这里以 `src/components` 下的组件为例
```vue
<template>
  <div>
    <p>{{ mainStore.count }}</p>    
  </div>  
</template>

<script lang="ts" setup>
// 1. 按需导入仓库
import { useMineStore } from '../store'
// 2. 创建 store 实例
const mainStore = useMineStore()
// 3. 使用 mianStore 中的 state 里面的数据
console.log(mainStore.count);

</script>
```

## 6. 注意解构赋值的正确方式！
***
**如果直接使用普通的解构赋值方式，被解构出来的数据将不具备响应式！**

以下通过点击按钮改变 count 的值来说明这个问题
```vue
<template>
  <div>
    <!-- 页面刷新时会显示初始数据，但是点击按钮修改了store里面count的数据的时候，是不会同步到这里的 -->
    <p>{{ count }}</p>
    <button @click="handlerChangeState">修改count</button>
  </div>  
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useMineStore } from '../store'
const mainStore = useMineStore()

// 普通的解构赋值
const { count } = mainStore

// 点击修改 count 的值，修改 store 里面的值的方式后面会讲，这里不用注意
const handlerChangeState = () => {
  mainStore.count++
}

</script>
```
说明：通过普通解构赋值拿出来的数据，是有问题的！这样的数据不再是响应式！是一次性的！
因为 Pinia 其实是把 state 里的数据都做了 reactive 处理了（reactive直接使用普通的解构赋值的数据也不具备响应式）

<font color=047ffd>**解决方法**</font>：<font color=red>**使用 Pinia 官方提供的 API**</font>，`storeToRefs`
```vue
<template>
  <div>
    <!-- 这里的 count 是响应式的！-->
    <p>{{ count }}</p>
    <button @click="handlerChangeState">修改count</button>
  </div>  
</template>

<script lang="ts" setup>
// 导入官方提供的 API
import { storeToRefs } from 'pinia';
import { useMineStore } from '../store'
const mainStore = useMineStore()

// 普通的解构赋值
// const { count } = mainStore

// 解决方法：使用 Pinia 官方提供的 API
const {count,foo } = storeToRefs(mainStore)

// 点击修改 count 的值
const handlerChangeState = () => {
  mainStore.count++
}
</script>
```
说明：Pinia 把解构出来的数据做 ref 响应式处理了

## 7. 组件内修改 sotre 的数据
***
依旧使用上面的案例进行说明:
* 方式一：组件中直接修改 state 中的数据

```vue
<script lang="ts" setup>
import { useMineStore } from '../store'
const mainStore = useMineStore()

// 点击修改 count 的值
const handlerChangeState = () => {
  // 方式一：直接修改 state 中的数据
  mainStore.count++
  mainStore.foo = 'hello'
}
</script>
```

* 方式二：`$patch({ })` 接收一个修改对象，如果需要修改多个数据，建议使用 $patch 批量更新，具有性能优化的效果
```vue
<script lang="ts" setup>
import { useMineStore } from '../store'
const mainStore = useMineStore()

// 点击修改 count 的值
const handlerChangeState = () => {
  // 方式二：使用 $patch({}) 修改数据
  mainStore.$patch({
    count: mainStore.count+1,
    foo: 'hello'
  })
}
</script>
```

* 方式三：`$patch((state)=>{ })` 接收一个函数 更好的批量更新的方式：$patch 一个函数，state 则为store中的 state，也具有性能优化的效果
```vue
<script lang="ts" setup>
import { useMineStore } from '../store'
const mainStore = useMineStore()

// 点击修改 count 的值
const handlerChangeState = () => {
  // 方式三：使用 $patch((state)=>{ }) 修改数据
  mainStore.$patch(state => {
    state.count++;
    state.foo = 'hello';
    state.arr.push(4)
  })
}
</script>
```

* 方式四：逻辑比较多的时候可以封装到 actions 做处理
```vue
<script lang="ts" setup>
import { useMineStore } from '../store'
const mainStore = useMineStore()

// 点击修改 count 的值
const handlerChangeState = () => {
  // 方式四：逻辑比较多的时候可以封装到 actions 做处理
  mainStore.changeState(10)
}
</script>
```

回到 `store/index.ts` 中，在 actions 下编写对应逻辑

```ts
import { defineStore } from "pinia";

export const useMineStore = defineStore('main', {
  state: () => {
    return {
      count: 100,
      foo: '',
      arr: [1, 2, 3]
    }
  },

  actions: {
    // 可以通过 this 访问到 state 中的数据
    changeState(num: number) {
      console.log(this);
      console.log(this.count, num);
      this.count += num;
      this.foo = 'hello';
      this.arr.push(4);
    }
  },
  
  getters: {
  }
})
```
总结：建议使用第四种方式，方便后期维护

## 8. getters 的使用
*** 
getter 类似计算属性，它并不会修改state的数据，只会通过计算得出结果用作于展示，必须要有返回值 return
### 8.1 函数接收一个可选参数：state 状态对象，好处是会自动判断这个函数的返回值是什么类型
```ts
import { defineStore } from "pinia";

export const useMineStore = defineStore('main', {
  state: () => {
    return {
      count: 100,
    }
  },

  actions: {
  },
  
  getters: {
    count10(state) {
      console.log('count 调用了');
      return state.count + 10;

      // 注意：如果接收了一个 state 参数，内部却用了 this，也是可以的
      // return this.count + 10;
    },
  }
})
```

### 8.2 注意：如果在 getters 中的函数不接受参数 state，而内部却使用了 this，则必须手动指定返回值类型，否则 TS 类型推导不出来
```ts
import { defineStore } from "pinia";

export const useMineStore = defineStore('main', {
  state: () => {
    return {
      count: 100,
    }
  },

  actions: {
  },
  
  getters: {
    // 手动指定返回值类型
    count10(): number {
      console.log('count 调用了');
      return this.count + 10;
    }
  }
})
```

### 8.3 getters 中的函数允许相互调用
* 这里的 newArr 函数过滤了 arr 数组中为3的值并返回一个数组，然后被 newArr1 使用了新的数组，在组件中也可以访问 newArr1 去获取到值。
* 这只是用来演示 getters 中的函数可以相互调用，再以后的项目中，可以实现其他更好的功能。
```ts
import { defineStore } from "pinia";

export const useMineStore = defineStore('main', {
  state: () => {
    return {
      arr: [1, 2, 3],
    }
  },

  actions: {
  },
  
  getters: {
    newArr(state) {
      return state.arr.filter(item => item!==3)
    },
    // getters 里面的函数可以互相调用到，直接使用 this 即可
    newArr2() {
      return this.newArr
    }
  }
})
```

<font color=red></font>
<font color=047ffd></font>