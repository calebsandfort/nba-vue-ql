import {apolloClient} from "../../apollo"
import * as seasonMonthApi from "../../api/seasonMonth"

const state = {
  list: [],
  seasonMonth: null
}

const getters = {
  count: function (state) {
    return state.list.length;
  }
}

export const mutations = {
  setList(state, list){
    state.list = list;
  },

  setSeasonMonth(state, seasonMonthId){
    state.seasonMonth = state.list.find(seasonMonth => seasonMonth.id == seasonMonthId);
  }
}

export const actions = {
  async fetchList({ commit }, requestVariables){
    const response = await seasonMonthApi.getAll(apolloClient, requestVariables);
    commit('setList', response.data.seasonMonths);
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}