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
        :headers="getEntityHeaders(StockDetails)"
        :search="search"
        :items="item.details"
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
    <v-snackbar
      v-for="(alert, index) in alerts"
      :key="'alert-'+index"
      v-model="alert.show"
      :color="alert.status ? 'success':'error'"
      :top="true"
      absolute
    >
      {{ alert.message }}
      <v-btn
        flat
        icon
        @click="alert.show = false"
      >
        <v-icon>clear</v-icon>
      </v-btn>
    </v-snackbar>
  </v-card>
</template>
<script>
import FormGenerator from './form/FormGenerator.vue';
import { getEntityHeaders } from '../utils';
import StockDetails from '../utils/entities/stock_details';
import { isEqual } from "lodash";

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
      stock: { quantity: null, remaining_quantity: null, quantity_yd: null },
      details: [],
      alerts: [],
      StockDetails,
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
      this.stock.quantity = value * 0.9144;
      this.stock.remaining_quantity = this.stock.quantity;
    },
    async save() {
      if (this.editedIndex === -1) {
        this.details.push(Object.assign({}, this.stock));
        this.changeHandler(this.details);
        this.item.stock = 0;
        this.details.forEach(
          (item) => { this.item.stock += parseFloat(item.remaining_quantity); },
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
            ({ id }) => isEqual(id, this.item.id) || parseInt(id) === parseInt(this.item.id)
          );
          this.item.stock = 0;
          this.details.forEach(
            (item) => { this.item.stock += parseFloat(item.remaining_quantity); },
          );
          await this.$store.dispatch('entities/update', {
            entity: 'stocks',
            item: this.item,
            updatedItem,
          });
          this.alerts.push({ ...res, show: true });
        }
      }
      Object.assign(this.stock, {
        quantity: null,
        remaining_quantity: null,
        quantity_yd: null,
      });
    },
    async deleteItem(item) {
      const index = this.item.details.indexOf(item);
      if (window.confirm('¿Esta seguro de eliminar este registro?')) {
        this.item.details.splice(index, 1);
        if (this.editedIndex === -1) {
          this.item.stock = 0;
          this.item.details.forEach(
            (detail) => { this.item.stock += detail.remaining_quantity; },
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
              ({ id }) => isEqual(id, this.item.id) || parseInt(id) === parseInt(this.item.id)
            );
            this.item.stock = 0;
            this.details.forEach(
              (detail) => { this.item.stock += parseFloat(detail.remaining_quantity); },
            );
            await this.$store.dispatch('entities/update', {
              entity: 'stocks',
              item: this.item,
              updatedItem,
            });
            this.alerts.push({ ...res, show: true });
          }
        }
        /*
        if (!err) {
          this.alerts.push({ ...res, show: true });
        } */
      }
    },

    getEntityHeaders,
  },
};
</script>
