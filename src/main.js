import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)
import API from '@/api/index'
Vue.prototype.$API = API
// console.log(API)

import CategorySelect from '@/components/CategorySelect/index.vue'
Vue.component('CategorySelect',CategorySelect)
import MyButton from '@/components/MyButton/index.vue'
Vue.component('MyButton',MyButton)
Vue.config.productionTip = false

import VueLazyload from 'vue-lazyload'
const gif = require('./assets/loading.gif')
// import gif from '@/assets/loading.gif'
Vue.use(VueLazyload,{loading: gif })

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

