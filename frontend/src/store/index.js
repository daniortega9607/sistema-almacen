import Vue from 'vue';
import Vuex from 'vuex';
import auth from './auth';
import app from './app';

Vue.use(Vuex);

const Store = {
  modules: {
    auth,
    app
  },
};

export default new Vuex.Store(Store);
