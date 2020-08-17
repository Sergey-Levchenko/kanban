import {v4 as uuidv4} from 'uuid';
import fb from 'firebase/app';

const tasks = {
  namespaced: true,
  state: {
    data: [],
    boards: [],
    currentBoard: '',
  },
  getters: {
    getDataLength: state => state.data.length,
  },
  actions: {
    async getBoards({commit, rootState}) {
      const boards = await fb
        .firestore()
        .collection('users/')
        .doc(rootState.auth.token)
        .get()
        .then(res => {
          if (res.exists) return res.data().boards;
        });
      commit('GET_BOARDS', boards);
    },
    addBoard({dispatch, rootState}) {
      fb.firestore()
        .collection('kanban2/')
        .add({})
        .then(async ref => {
          const boards = await fb
            .firestore()
            .collection('users/')
            .doc(rootState.auth.token)
            .update({
              boards: fb.firestore.FieldValue.arrayUnion({id: ref.id}),
            })
            .then(() => {
              dispatch('getBoards');
            });
        });
    },
    setCurrentBoard({commit}, {id}) {
      commit('SET_CURRENT_BOARD', id);
    },
    async getTasks({commit, state}) {
      const tasks = await fb
        .firestore()
        .doc('kanban2/' + state.currentBoard)
        .collection('data')
        .orderBy('timestamp')
        .get()
        .then(res => {
          return res.docs.map(doc => {
            if (doc.exists) return {id: doc.id, ...doc.data()};
          });
        });
      commit('GET_TASKS', tasks);
    },
    addTaskById({state, rootState, dispatch}, payload) {
      fb.firestore()
        .doc('kanban2/' + state.currentBoard + '/data/' + payload.id)
        .update({
          list: fb.firestore.FieldValue.arrayUnion(payload.inputValue),
        })
        .then(() => {
          dispatch('getTasks');
        });
    },
    deleteTaskById({state, dispatch}, payload) {
      const newList = state.data.find(item => item.id == payload.id).list.filter((item, i) => i != payload.index);
      fb.firestore()
        .doc('kanban2/' + state.currentBoard + '/data/' + payload.id)
        .update({
          list: newList,
        })
        .then(() => {
          dispatch('getTasks');
        });
    },
    saveAllTasks({state}) {
      state.data.forEach(item => {
        fb.firestore()
          .doc('kanban2/' + state.currentBoard + '/data/' + item.id)
          .update({
            name: item.name,
            list: item.list,
          });
      });
    },
    editSave({commit, dispatch}, payload) {
      commit('EDIT_SAVE', payload);
      dispatch('saveAllTasks');
    },
    createList({dispatch, state}, payload) {
      fb.firestore()
        .collection('kanban2/' + state.currentBoard + '/data')
        .add({
          name: payload,
          list: [],
          timestamp: Date.now(),
        })
        .then(() => {
          dispatch('getTasks');
        });
    },
    deleteListById({dispatch, state}, payload) {
      fb.firestore()
        .doc('kanban2/' + state.currentBoard + '/data/' + payload)
        .delete()
        .then(() => {
          dispatch('getTasks');
        });
    },
  },
  mutations: {
    GET_BOARDS(state, payload) {
      state.boards = payload;
    },
    SET_CURRENT_BOARD(state, payload) {
      state.currentBoard = payload;
    },
    GET_TASKS(state, payload) {
      state.data = payload;
    },
    EDIT_SAVE(state, payload) {
      state.data.find(item => item.id == payload.id).list[payload.index] = payload.text;
    },
  },
};

export default tasks;
