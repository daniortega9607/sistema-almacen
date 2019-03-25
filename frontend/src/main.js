import Vue from 'vue';
import './plugins/vuetify';
import router from './router';
import store from './store';
import './registerServiceWorker';
import 'vue-swatches/dist/vue-swatches.min.css';

Vue.config.productionTip = false;

const RouterView = () => <router-view/>;

new Vue({
  router,
  store,
  render: h => h(RouterView),
}).$mount('#app');
