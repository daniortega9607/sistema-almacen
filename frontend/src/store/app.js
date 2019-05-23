const emptySale = {
  id: 1,
  articles: [],
  balance: 0,
  total: 0,
  stock: true,
  customer_id: null,
  article_id: null,
  article_selected: [],
  article_quantity: null
}

const state = {
  drawer: null,
  selectedOffice: {},
  alerts: [],
  sales: [Object.assign({}, emptySale)],
};

const getters = {};

const actions = {};

const mutations = {
  addSale(store) {
    const id = (store.sales[store.sales.length-1] && store.sales[store.sales.length-1].id + 1) || 1;
    store.sales.push(Object.assign({}, { ...emptySale, id }));
  },
  deleteSale(store, id) {
    store.sales.splice(id, 1);

  },
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
