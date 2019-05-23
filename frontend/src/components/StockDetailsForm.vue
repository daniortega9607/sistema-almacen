<template>
  <v-card>
    <v-card-title primary-title>
      <h2>{{ label }}</h2>
    </v-card-title>
    <v-card-text>
      <v-text-field
        v-model="stock.quantity_yd"
        type="number"
        label="Cantidad (yd)"
        browser-autocomplete="new-password"
        @input="convertYardsToMeters"
      />
      <v-text-field
        v-model="stock.buy_price_yd"
        type="number"
        label="Precio por yarda (USD)"
        @input="getTotalPrice"
      />
      <FormGenerator
        :entity="StockDetails"
        :edited-index="editedIndex"
        :item="stock"
      />
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn
        color="success"
        @click="save"
      >
        Agregar
      </v-btn>
    </v-card-actions>
    <v-card-text>
      <v-toolbar
        flat
        color="white"
      >
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Buscar"
          single-line
        />
      </v-toolbar>
      <v-data-table
        rows-per-page-text="Registros por página"
        :headers="getEntityHeaders(StockDetails)"
        :search="search"
        :items="item.details"
        no-results-text="No se encontraron registros"
        :rows-per-page-items="rowsPerPage"
      >
        <template v-slot:items="props">
          <td
            v-for="field in Object.keys(StockDetails.field_configs.list)"
            :key="'item-'+props.index+'-'+field"
            :class="{
              'text-xs-center':StockDetails.field_configs.list[field].align === 'center',
              'text-xs-right':StockDetails.field_configs.list[field].align === 'right',
              'text-xs-left':StockDetails.field_configs.list[field].align === 'left'
            }"
          >
            <component
              :is="StockDetails.field_configs.list[field].formatter"
              v-if="StockDetails.field_configs.list[field].formatter"
              v-bind="props.item"
            />
            <div v-else>
              {{ props.item[field] }}
            </div>
          </td>
          <td
            v-if="!StockDetails.no_actions"
            class="justify-center layout px-0"
          >
            <v-icon
              small
              @click="deleteItem(props.item)"
            >
              delete
            </v-icon>
          </td>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>
<script>
import { isEqual } from 'lodash';
import FormGenerator from './form/FormGenerator.vue';
import { getEntityHeaders } from '../utils';
import StockDetails from '../utils/entities/stock_details';

export default {
  components: { FormGenerator },
  props: {
    label: { type: String, default: '' },
    editedIndex: { type: [Number, String], required: true },
    item: { type: Object, required: true },
    changeHandler: { type: Function, required: true },
  },
  data() {
    return {
      search: '',
      stock: { quantity: null, buy_price: null, quantity_yd: null, buy_price_yd: null },
      details: [],
      StockDetails,
      rowsPerPage: [5, 10, 25, { text: 'Todos', value: -1 }],
    };
  },
  watch: {
    editedIndex(val) {
      if (val === -1) this.details = [];
      else this.details = this.item.details;
    },
  },
  methods: {
    convertYardsToMeters(value) {
      this.stock.quantity = parseFloat(value * 0.9144).toFixed(2);
    },
    getTotalPrice(value) {
      this.stock.buy_price = parseFloat(value * this.stock.quantity_yd).toFixed(2);
    },
    async save() {
      if (this.editedIndex === -1) {
        this.details.push(Object.assign({}, this.stock));
        this.changeHandler(this.details);
        this.item.stock = 0;
        this.details.forEach(
          (item) => { this.item.stock += parseFloat(item.quantity); },
        );
      } else {
        const [err, res] = await this.$store.dispatch('entities/create', {
          entity: StockDetails.apiUrl,
          item: { ...this.stock, stock_id: this.item.id },
          noUpdate: true,
        });
        if (!err) {
          this.details.push(Object.assign({}, res.data));
          const updatedItem = this.$store.state.entities.stocks.findIndex(
            ({ id }) => (
              isEqual(id, this.item.id) || parseInt(id, 10) === parseInt(this.item.id, 10)
            ),
          );
          this.item.stock = 0;
          this.details.forEach(
            (item) => { this.item.stock += parseFloat(item.quantity); },
          );
          await this.$store.dispatch('entities/update', {
            entity: 'stocks',
            item: this.item,
            updatedItem,
          });
          this.$store.commit('app/showAlert', res);
        }
      }
      Object.assign(this.stock, {
        quantity: null,
        quantity_yd: null,
        buy_price: null,
        buy_price_yd: null,
      });
    },
    async deleteItem(item) {
      const index = this.item.details.indexOf(item);
      if (window.confirm('¿Esta seguro de eliminar este registro?')) {
        this.item.details.splice(index, 1);
        if (this.editedIndex === -1) {
          this.item.stock = 0;
          this.item.details.forEach(
            (detail) => { this.item.stock += detail.quantity; },
          );
        } else {
          const [err, res] = await this.$store.dispatch('entities/delete', {
            deletedItem: index,
            entity: StockDetails.apiUrl,
            item,
            noDelete: true,
          });
          if (!err) {
            const updatedItem = this.$store.state.entities.stocks.findIndex(
              ({ id }) => (
                isEqual(id, this.item.id) || parseInt(id, 10) === parseInt(this.item.id, 10)
              ),
            );
            this.item.stock = 0;
            this.details.forEach(
              (detail) => { this.item.stock += parseFloat(detail.quantity); },
            );
            await this.$store.dispatch('entities/update', {
              entity: 'stocks',
              item: this.item,
              updatedItem,
            });
            this.$store.commit('app/showAlert', res);
          }
        }
      }
    },

    getEntityHeaders,
  },
};
</script>
