import {apolloClient} from "../../apollo"
import * as gameApi from "../../api/game"

const state = {
  list: [],
  game: null
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

  setGameFromList(state, gameId){
    state.game = state.list.find(game => game.id == gameId);
  },

  setGameFromObject(state, game){
    state.game = game;
  }
}

export const actions = {
  async fetchList({ commit }, requestVariables){
    const response = await gameApi.getAllQueryable(apolloClient, requestVariables);
    commit('setList', response.data.gamesQueryable);
  },

  async fetchItem({ commit }, requestVariables){
    const response = await gameApi.get(apolloClient, requestVariables);
    commit('setGameFromObject', response.data.game);
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}