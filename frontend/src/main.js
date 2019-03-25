import Vue from 'vue';

Vue.config.productionTip = false;
Vue.config.devtools = true;

import './plugins/vuetify';
import router from './router';
import store from './store';
import './registerServiceWorker';
import 'vue-swatches/dist/vue-swatches.min.css';


const RouterView = () => <router-view/>;

new Vue({
  router,
  store,
  render: h => h(RouterView),
}).$mount('#app');
