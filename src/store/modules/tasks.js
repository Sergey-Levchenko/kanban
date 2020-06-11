import {v4 as uuidv4} from 'uuid';
import fb from 'firebase/app';

const tasks = {
  namespaced: true,
  state: {
    data: [],
  },
  getters: {
    getData: state => state.data,
  },
  actions: {
    async getTasks({commit, rootState}) {
      const tasks = await fb
        .firestore()
        .doc('kanban2/' + rootState.auth.token)
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
    addTaskById({commit, rootState, dispatch}, payload) {
      // await fb
      //   .firestore()
      //   .doc('kanban2/' + rootState.auth.token)
      //   .collection('data')
      //   .where('id', '==', '964cd2d7-c086-452d-b1e0-81310df8ee99')
      //   .get()
      //   .then(res => {
      //     res.docs.forEach(doc => {
      //       // console.log(doc.data().list);
      fb.firestore()
        .doc('kanban2/' + rootState.auth.token + '/data/' + payload.id)
        .update({
          list: fb.firestore.FieldValue.arrayUnion(payload.inputValue),
        })
        .then(() => {
          dispatch('getTasks');
        });
      //     });
      //   });

      // .update({
      //   regions: fb.firestore.FieldValue.arrayUnion(payload),
      // });
      //   .where('name', '==', 'План на месяц')
      //   //   .doc(rootState.auth.token)
      //   .get()
      //   .then(res => {
      //     res.docs.forEach(doc => {
      //       console.log(doc.data());
      //     });
      //   });
      // .whereField("vitamins", arrayContains: "B6")
      // commit('SET_TASK_BY_ID', payload);
    },
    deleteTaskById({rootState, state, dispatch}, payload) {
      const newList = state.data.find(item => item.id == payload.id).list.filter((item, i) => i != payload.index);
      fb.firestore()
        .doc('kanban2/' + rootState.auth.token + '/data/' + payload.id)
        .update({
          list: newList,
        })
        .then(() => {
          dispatch('getTasks');
        });
    },
    saveAllTasks({state, rootState}, payload) {
      state.data.forEach(item => {
        fb.firestore()
          .doc('kanban2/' + rootState.auth.token + '/data/' + item.id)
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
    createList({commit, dispatch, rootState}, payload) {
      console.log(payload);
      fb.firestore()
        .collection('kanban2/' + rootState.auth.token + '/data')
        .add({
          name: payload,
          list: [],
          timestamp: Date.now(),
        })
        .then(() => {
          dispatch('getTasks');
        });
    },
    deleteListById({dispatch, rootState}, payload) {
      fb.firestore()
        .doc('kanban2/' + rootState.auth.token + '/data/' + payload)
        .delete()
        .then(() => {
          dispatch('getTasks');
        });
    },
  },
  mutations: {
    GET_TASKS(state, payload) {
      state.data = payload;
    },
    EDIT_SAVE(state, payload) {
      state.data.find(item => item.id == payload.id).list[payload.index] = payload.text;
    },
  },
};

export default tasks;
