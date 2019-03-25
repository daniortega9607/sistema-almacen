import { isEqual } from 'lodash';
import { fetch, getDataFromKey } from '../utils';
import { getStoredEntities } from '../utils/entities';

const state = {
  ...getStoredEntities(),
};

const getters = {
  getItems: store => ({ entity, params = { office: null } }) => {
    let items = store[entity];
    if (params.office && entity === 'stocks') {
      items = items.filter(item => (
        isEqual(item.office_id, params.office.id)
        || parseInt(item.office_id, 10) === parseInt(params.office.id, 10)));
    }
    return items;
  },
  getSearchableItems: store => ({ entity, keys = ['name'] }) => store[entity].map((item) => {
    let text = '';
    keys.forEach((key) => {
      text += `${getDataFromKey(item, key.split('.')) ? `${getDataFromKey(item, key.split('.'))} ` : ''}`;
    });
    return { text, value: item.id };
  }),
};

const actions = {
  async read({ commit }, { entity }) {
    const [err, res] = await fetch({ url: `/api/${entity}` });
    if (!err) {
      commit('read', { items: res, entity });
    }
  },
  async create(store, { item, entity, noUpdate }) {
    const [err, res] = await fetch({ url: `/api/${entity}`, data: item, method: 'post' });
    if (!err && !noUpdate) {
      if (res.exists) {
        const updatedItem = store.state[entity].findIndex(({ id }) => (
          isEqual(id, res.data.id) || parseInt(id, 10) === parseInt(res.data.id, 10)));
        store.commit('update', { item: res.data, entity, updatedItem });
      } else store.commit('create', { item: res.data, entity });
    }
    return [err, res];
  },
  async update({ commit }, { item, entity, updatedItem }) {
    const [err, res] = await fetch({ url: `/api/${entity}/${item.id}`, data: item, method: 'put' });
    if (!err) {
      commit('update', { item: res.data, entity, updatedItem });
    }
    return [err, res];
  },
  async delete({ commit }, {
    item, entity, deletedItem, noDelete,
  }) {
    const [err, res] = await fetch({ url: `/api/${entity}/${item.id}`, method: 'delete' });
    if (!err && !noDelete) {
      commit('delete', { item: deletedItem, entity });
    }
    return [err, res];
  },
  async initialValues(store) {
    const deleted = {};
    const updated = {};
    Object.keys(store.state).forEach(async (entity) => {
      if (store.state[entity].length) {
        deleted[entity] = [];
        updated[entity] = [];
        console.log(entity)
        const [err, res] = await fetch({ url: `/api/${entity}/init`, data: store.state[entity].map(({ id }) => ({ id })), method: 'post' });
        if (!err) {
          res.forEach((item) => {
            if (item.deleted_at) deleted[entity].push(item.id);
            else updated[entity].push(item);
          });
        }
        deleted[entity].forEach((index) => {
          const item = store.state[entity].findIndex(({ id }) => (
            isEqual(id, index) || parseInt(id, 10) === parseInt(index, 10)));
          if (item !== -1) {
            store.commit('delete', { entity, item });
          }
        });
        updated[entity].forEach((item) => {
          const updatedItem = store.state[entity].findIndex(({ id }) => (
            isEqual(id, item.id) || parseInt(id, 10) === parseInt(item.id, 10)));
          if (updatedItem !== -1) {
            store.commit('update', { entity, item, updatedItem });
          } else store.commit('create', { item, entity });
        });
      } else {
        store.dispatch('read', { entity });
      }
    });
  },
};

const mutations = {
  read(store, { items, entity }) {
    store[entity] = items;
  },
  create(store, { item, entity }) {
    store[entity].push(item);
  },
  update(store, { item, entity, updatedItem }) {
    Object.assign(store[entity][updatedItem], item);
  },
  delete(store, { item, entity }) {
    store[entity].splice(item, 1);
  },
  reset(store) {
    Object.assign(store, { ...getStoredEntities() });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
