import Vue from 'vue'
import Vuex from 'vuex'
import team from './modules/team'
import season from './modules/season'
import seasonMonth from './modules/seasonMonth'
import ui from './modules/ui'
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    team,
    season,
    seasonMonth,
    ui
  },
  strict: debug
})