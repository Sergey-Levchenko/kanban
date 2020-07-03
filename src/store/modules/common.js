const common = {
  namespaced: true,
  state: {
    loading: true,
    error: '',
  },
  actions: {
    toggleLoading({commit}, payload) {
      commit('TOGGLE_LOADING');
    },
    setError({commit}, payload) {
      commit('SET_ERROR', payload);
    },
    clearError({commit}) {
      commit('CLEAR_ERROR');
    },
  },
  mutations: {
    TOGGLE_LOADING(state, payload) {
      state.loading = payload;
    },
    SET_ERROR(state, payload) {
      state.error = payload;
    },
    CLEAR_ERROR(state) {
      state.error = '';
    },
  },
};

export default common;
