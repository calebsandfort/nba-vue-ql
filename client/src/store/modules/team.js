import {apolloClient} from "../../apollo"
import * as teamApi from "../../api/team"

const state = {
  list: [],
  team: null
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

  setTeam(state, teamId){
    state.team = state.list.find(team => team.id == teamId);
  }
}

export const actions = {
  async fetchList({ commit, state }){
    if(state.list.length == 0) {
      const response = await teamApi.getAll(apolloClient);
      commit('setList', response.data.teams);
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}