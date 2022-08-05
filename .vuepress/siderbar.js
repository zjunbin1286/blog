const { createSideBarConfig } = require('./util')

const JAVASCRIPT_PATH = '/blogs/JavaScript'
const CSS_PATH = '/blogs/CSS'
const NODE_PATH = '/blogs/Node'
const VUEXPINIA_PATH = '/blogs/Vuex&Pinia'
const VUE_PATH = '/blogs/Vue3'
const INTERVIEW_PATH = '/blogs/Interview'
const HTTP_PATH = '/blogs/HTTP'
const VUEROUTER_PATH = '/blogs/VueRouter'
const REACT_PATH = '/blogs/React'


module.exports = {

  // javaScript
  [JAVASCRIPT_PATH]: [
    createSideBarConfig('JS-基础', JAVASCRIPT_PATH + '/js-base'),
    createSideBarConfig('JS-深入数组', JAVASCRIPT_PATH + '/js-array'),
    createSideBarConfig('JS-手撕代码系列', JAVASCRIPT_PATH + '/js-api'),
    createSideBarConfig('JS-V8引擎原理', JAVASCRIPT_PATH + '/js-v8'),
    createSideBarConfig('JS-异步I/O及异步编程', JAVASCRIPT_PATH + '/js-async'),
  ],

  // css
  [CSS_PATH]: [createSideBarConfig('CSS 技巧', CSS_PATH)],

  // vue
  [VUE_PATH]: [
    createSideBarConfig('vue3 学习', VUE_PATH + '/study'),
    createSideBarConfig('vue3 项目', VUE_PATH + '/demo'),
  ], 

  // Vuex&Pinia
  [VUEXPINIA_PATH]: [
    createSideBarConfig('Vuex 学习', VUEXPINIA_PATH + '/vuex_study'),
    createSideBarConfig('Pinia 学习', VUEXPINIA_PATH + '/pinia_study'),
  ],
  
  // node
  [NODE_PATH]: [
    createSideBarConfig('node 学习', NODE_PATH + '/study')
  ],

  // Interview
  [INTERVIEW_PATH]: [
    createSideBarConfig('vue', INTERVIEW_PATH + '/vue'),
    createSideBarConfig('html', INTERVIEW_PATH + '/html'),
    createSideBarConfig('javascript', INTERVIEW_PATH + '/javascript'),
  ],

  // HTTP
  [HTTP_PATH]: [createSideBarConfig('http 学习', HTTP_PATH)],

  // VueRouter
  [VUEROUTER_PATH]: [
    createSideBarConfig('Router 学习', VUEROUTER_PATH)
  ],

  // React全家桶
  [REACT_PATH]: [
    createSideBarConfig('React 学习', REACT_PATH + '/React'),
    createSideBarConfig('React-Router 路由', REACT_PATH + '/React-Router'),
    createSideBarConfig('Redux_React-Redux 状态管理', REACT_PATH + '/Redux_React-Redux'),
  ]
}