import { fetch } from '../utils';

const state = {
  authenticated: localStorage.getItem('user') !== null,
  token: null,
  user: localStorage.getItem('user') !== null ? JSON.parse(localStorage.user) : null,
};

const getters = {};

const actions = {
  login: async ({ commit }, data) => {
    const [err, res] = await fetch({ url: '/api/login', method: 'post', data });
    if (!err) {
      localStorage.user = JSON.stringify(res.user);
      localStorage.token = res.token;
      commit('login', { user: res.user, token: res.token });
    }
    return [err, res];
  },
};

const mutations = {
  login: (store, { token, user }) => {
    store.authenticated = true;
    store.token = token;
    store.user = user;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
