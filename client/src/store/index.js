import Vue from 'vue'
import Vuex from 'vuex'
import team from './modules/team'
import ui from './modules/ui'
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    team,
    ui
  },
  strict: debug
})