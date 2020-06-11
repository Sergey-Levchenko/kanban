import Vue from 'vue';
import Vuex from 'vuex';
import tasks from './modules/tasks';
import auth from './modules/auth';
import common from './modules/common';

Vue.use(Vuex);

export default new Vuex.Store({
  namespaced: true,
  state: {},
  mutations: {},
  actions: {},
  modules: {tasks, auth, common},
});
