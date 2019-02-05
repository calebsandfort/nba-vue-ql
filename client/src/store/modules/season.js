import {apolloClient} from "../../apollo"
import * as seasonApi from "../../api/season"

const state = {
  list: [],
  season: null
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

  setSeason(state, seasonId){
    state.season = state.list.find(season => season.id == seasonId);
  }
}

export const actions = {
  async fetchList({ commit }, requestVariables){
    const response = await seasonApi.getAll(apolloClient, requestVariables);
    commit('setList', response.data.seasons);
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}