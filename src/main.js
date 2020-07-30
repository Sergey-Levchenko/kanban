import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import Vuelidate from 'vuelidate';
import '@/plugins/firebase';
import './styles/main.scss';

Vue.use(Vuelidate);
Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');
