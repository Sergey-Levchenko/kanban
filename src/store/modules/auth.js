import fb, {registerVersion} from 'firebase/app';
const auth = {
  namespaced: true,
  state: {
    token: null,
  },
  getters: {
    isAuth: state => state.token != null,
  },
  actions: {
    async login({commit, dispatch, rootState}, payload) {
      await fb
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          if (rootState.common.error) {
            dispatch('common/clearError', {}, {root: true});
          }
          commit('LOGIN', user.user.uid);
        })
        .catch(error => {
          if (error.code == 'auth/user-not-found') {
            dispatch('common/setError', 'Такой пользватель не зарегестрирован', {root: true});
            throw new Error('Такой пользватель не зарегестрирован');
          }
          if (error.code == 'auth/wrong-password') {
            dispatch('common/setError', 'Не верный пароль', {root: true});
            throw new Error('Не верный пароль');
          }
        });
    },
    async logout({commit}) {
      await fb.auth().signOut();
      commit('CLEAR_USER');
    },
    async initUserBeforeLoad({commit, dispatch}, payload) {
      commit('LOGIN', payload);
      await dispatch('tasks/getTasks', {}, {root: true});
      dispatch('common/toggleLoading', false, {root: true});
    },
    async register({commit}, payload) {
      fb.auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(() => {
          fb.auth().onAuthStateChanged(user => {
            if (user) commit('LOGIN', user.uid);
          });
        })
        .catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
        });
    },
  },
  mutations: {
    LOGIN(state, payload) {
      state.token = payload;
    },
    CLEAR_USER(state) {
      state.token = null;
    },
  },
};

export default auth;
