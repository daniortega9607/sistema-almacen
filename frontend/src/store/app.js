const state = {
  drawer: null,
  selectedOffice: {},
};

const getters = {};

const actions = {};

const mutations = {
  drawer(store, drawer) {
    store.drawer = drawer;
  },
  selectOffice(store, office) {
    store.selectedOffice = office;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
