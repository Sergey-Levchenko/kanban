const common = {
  namespaced: true,
  state: {
    loading: true,
    error: '',
    confirmText: '',
    nextDelete: null,
  },
  getters: {
    confirmDisplay: state => !!state.confirmText,
  },
  actions: {
    toggleLoading({commit}) {
      commit('TOGGLE_LOADING');
    },
    setError({commit}, payload) {
      commit('SET_ERROR', payload);
    },
    clearError({commit}) {
      commit('CLEAR_ERROR');
    },
    setConfirm({commit}, payload) {
      commit('SET_COMFIRM', payload);
    },
    clearConfirm({commit, state, dispatch}, payload) {
      if (state.nextDelete.type === 'task') {
        payload &&
          dispatch('tasks/deleteTaskById', {id: state.nextDelete.id, index: state.nextDelete.index}, {root: true});
      }
      if (state.nextDelete.type === 'list') {
        payload && dispatch('tasks/deleteListById', state.nextDelete.id, {root: true});
      }
      commit('CLEAR_COMFIRM');
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
    SET_COMFIRM(state, payload) {
      state.confirmText = payload.text;
      state.nextDelete = {
        id: payload.id,
        index: payload.index,
        type: payload.type,
      };
    },
    CLEAR_COMFIRM(state) {
      state.confirmText = '';
      state.nextDelete = null;
    },
  },
};

export default common;
