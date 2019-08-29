// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import vuetify from '@/plugins/vuetify'
import VueKonva from 'vue-konva'

import router from './router'
import store from './store'

import App from './App'
import _ from 'lodash'

Vue.config.productionTip = false

Vue.use(VueKonva)

Object.defineProperty(Vue.prototype, '$_', { value: _ })

/* eslint-disable no-new */
new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
