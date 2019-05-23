<template>
  <v-card v-if="item.office_id">
    <v-card-title primary-title>
      <h2>Rollos Disponibles</h2>
      <v-spacer/>
      <v-btn color="success" @click="addSelected">Agregar</v-btn>
    </v-card-title>
    <v-card-text>
      <component :is="'AutocompleteBox'" v-bind="product"/>
      <v-text-field type="number" label="Cantidad" v-model="quantity"/>
      <v-data-table
        v-model="selected"
        rows-per-page-text="Registros por página"
        :headers="[
            {text:'Producto', value:'product'},
            {text:'Cantidad', value:'quantity', align:'right'},
            {text:'Precio de Compra (USD)', value:'buy_price', align:'right'},
        ]"
        :items="getStockDetails({office: item.office_id, product:product_id, quantity, selected: rollsSelected})"
        no-results-text="No se encontraron registros"
        select-all
      >
        <template v-slot:items="props">
          <td>
            <v-checkbox v-model="props.selected" primary hide-details></v-checkbox>
          </td>
          <td>{{props.item.product}}</td>
          <td class="text-xs-right">{{props.item.quantity}}</td>
          <td class="text-xs-right">{{props.item.buy_price}}</td>
        </template>
      </v-data-table>
    </v-card-text>
    <v-card-title primary-title>
      <h2>{{ label }}</h2>
    </v-card-title>
    <v-card-text>
      <v-data-table
        :headers="[
            {text:'Producto', sortable: false},
            {text:'Cantidad', align:'right', sortable: false},
            {text:'Precio de Compra (USD)', align:'right', sortable: false},
            {text:'', sortable: false}
        ]"
        :items="item.details"
        no-results-text="No se encontraron registros"
        :rows-per-page-items="[{ text: 'Todos', value: -1 }]"
      >
        <template v-slot:items="props">
          <td>{{props.item.stock_detail.product}}</td>
          <td class="text-xs-right">{{props.item.stock_detail.quantity}}</td>
          <td class="text-xs-right">{{props.item.stock_detail.buy_price}}</td>
          <td class="justify-center layout px-0">
            <v-icon small @click="deleteItem(props.item)">delete</v-icon>
          </td>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>
<script>
import { getEntityHeaders } from "../utils";
import StockDetails from "../utils/entities/stock_details";
import { mapGetters } from "vuex";
import AutocompleteBox from "./form/AutocompleteBox.vue";
import Product from "../utils/entities/product";

export default {
  components: { AutocompleteBox },
  data() {
    return {
      selected: [],
      search: null,
      StockDetails,
      product: null,
      product_id: null,
      quantity: null,
      rollsSelected: []
    };
  },
  props: {
    label: { type: String, default: "" },
    editedIndex: { type: [Number, String], required: true },
    item: { type: Object, required: true },
    changeHandler: { type: Function, required: true }
  },
  created() {
    this.product = Object.assign(
      {},
      {
        label: "Modelo",
        options: {
          fromStore: true,
          entity: Product,
          concatedKeys: ["sku", "fabric.name", "design.name", "color.name"]
        },
        changeHandler: val => {
          this.product_id = val;
        }
      }
    );
  },
  methods: {
    addSelected() {
      this.selected.forEach(element => {
        this.rollsSelected.push(element.id);
        this.item.details.push(
          Object.assign(
            {},
            {
              stock_detail: {
                product: element.product,
                quantity: element.quantity,
                buy_price: element.buy_price
              },
              stock_detail_id: element.id
            }
          )
        );
      });
      this.calculateTotal();
      this.selected = [];
    },
    calculateTotal() {
        this.item.details.forEach()
    },
    deleteItem(item) {
        const index = this.rollsSelected.indexOf(item.stock_detail_id);
        if (index !== -1) {
            this.rollsSelected.splice(index, 1);
            const detail = this.item.details.findIndex(detail => detail.stock_detail_id === item.stock_detail_id);
            if (detail !== -1) {
                this.item.details.splice(detail, 1)
            }
        }
        this.calculateTotal();
    },
    getEntityHeaders
  },
  computed: {
    ...mapGetters("entities", ["getStockDetails"])
  }
};
</script>
