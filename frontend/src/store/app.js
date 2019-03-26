const state = {
  drawer: null,
  selectedOffice: {},
  alerts: [],
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
  showAlert(store, alert) {
    store.alerts.push({ ...alert, show: true });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
