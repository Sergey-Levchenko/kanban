import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import store from '../store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/board/:_id',
    name: 'board',
    component: () => import('../views/Board.vue'),
    beforeEnter: (to, from, next) => {
      store.dispatch('tasks/setCurrentBoard', {id: to.params._id}, {root: true});
      store.dispatch('tasks/getTasks',{}, {root: true});
      next();
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

// router.beforeEach((to, from, next) => {
// store.dispatch('common/toggleLoading', true);
// console.log('from - ', from);
// console.log('to - ', to);
// console.log(router);
// if (to.name == 'board' && store.tasks.data.length) console.log(store.tasks.data.length);
// next();
// });

export default router;
