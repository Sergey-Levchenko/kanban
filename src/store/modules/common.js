const common = {
  namespaced: true,
  state: {
    loading: true,
  },
  actions: {
    toggleLoading({commit}, payload) {
      commit('TOGGLE_LOADING');
    },
  },
  mutations: {
    TOGGLE_LOADING(state, payload) {
      state.loading = payload;
    },
  },
};

export default common;
