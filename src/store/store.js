import Vue from 'vue'
import Vuex from 'vuex'
import nav from './modules/nav'
import font from './modules/fontSize'
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
      nav,
      font,
  },
})
