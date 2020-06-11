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
    async login({commit}, payload) {
      const user = await fb
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .catch(function(error) {
          console.log(error.code);
          console.log(error.message);
        });

      commit('LOGIN', user.user.uid);
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
