import { fetch, setHeaders } from '../utils';

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
      setHeaders();
      commit('login', { user: res.user, token: res.token });
    }
    return [err, res];
  },
  logout: ({ commit }) => {
    commit('logout');
  },
  updateUser: async ({ commit }, { item, entity }) => {
    const [err, res] = await fetch({ url: `/api/${entity}/${item.id}`, data: item, method: 'put' });
    if (!err) {
      commit('updateUser', { user: res.data });
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
  logout: (store) => {
    store.authenticated = false;
    store.token = null;
    store.user = null;
  },
  updateUser: (store, { user }) => {
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
