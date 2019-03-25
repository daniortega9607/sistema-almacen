<template>
  <v-autocomplete
    :value="value"
    :loading="loading"
    :items="items"
    :search-input.sync="search"
    :label="label"
    :clearable="true"
    :rules="rules"
    cache-items
    hide-no-data
    @change="changeHandler"
  />
</template>
<script>
import { debounce } from 'lodash';
import { fetch } from '../../utils';

export default {
  props: {
    label: { type: String, default: '' },
    rules: { type: Array, default: () => [] },
    value: { type: [String, Object, Number], default: null },
    changeHandler: { type: Function, required: true },
    item: { type: Object, default: () => ({}) },
    options: { type: Object, default: () => ({}) },
  },
  data() {
    return {
      loading: false,
      items: [],
      search: null,
    };
  },
  watch: {
    search(val) {
      if (val && val !== this.value && !this.options.fromStore) this.debounce('querySelections', val);
    },
    'item.id': function updatedItem(val) {
      if (val && this.value !== null && !this.options.fromStore) { this.getItem(this.value); }
    },
  },
  created() {
    if (this.options.fromStore) {
      this.items = this.$store.getters['entities/getSearchableItems']({
        entity: this.options.entity.apiUrl,
        keys: this.options.concatedKeys,
      });
    }
  },
  methods: {
    debounce: debounce(function debounced(callback, options) {
      this[callback](options);
    }, 600),
    async getItem(id) {
      if (!this.options.fromStore) {
        const [err, res] = await fetch({
          url: `/api/${this.options.entity.apiUrl}`,
          params: { id, search: true },
        });
        if (!err) {
          this.items = res;
        }
      }
    },
    async querySelections(v) {
      this.loading = true;
      if (this.options.entity.apiUrl) {
        const [err, res] = await fetch({
          url: `/api/${this.options.entity.apiUrl}`,
          params: { search: this.search },
        });
        if (!err) {
          this.items = res.filter(e => (
            (e.text || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
          ));
        }
      }
      this.loading = false;
    },
  },
};
</script>
