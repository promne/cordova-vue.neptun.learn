import Vue from 'vue'
import Vuex from 'vuex'

import neptune from './neptune.module'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    neptune
  }
})
