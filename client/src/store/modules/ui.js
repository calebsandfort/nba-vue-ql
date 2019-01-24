
const state = {
  showBackButton: false
}

const getters = {}

export const mutations = {
  setShowBackButton(state, showBackButton){
    state.showBackButton = showBackButton;
  }
}

export const actions = {}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}