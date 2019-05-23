<template>
  <div>
    <v-toolbar color="white" tabs>
      <v-toolbar-title>
        <h1>Ventas</h1>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="success" @click="addSale">Agregar Venta</v-btn>
      <template v-slot:extension>
        <v-tabs v-model="tabs" color="transparent">
          <v-tab v-for="sale in sales" :key="sale.id">Venta #{{ sale.id }}</v-tab>
        </v-tabs>
      </template>
    </v-toolbar>
    <v-tabs-items v-model="tabs">
      <v-tab-item v-for="(sale, i) in sales" :key="i">
        <v-card>
          <v-card-text>
            <v-form v-model="valid">
              <v-container fluid>
                <v-layout>
                  <v-flex xs12 md8>
                    <autocomplete-box
                      label="Cliente"
                      :value="sale.customer_id"
                      :changeHandler="v => sale.customer_id = v"
                      :item="sale"
                      :options="{ fromStore: true, entity: Customer }"
                    />
                  </v-flex>
                  <v-flex xs12 md4>
                    <v-checkbox v-model="sale.stock" label="Descontar de Almacen"></v-checkbox>
                  </v-flex>
                </v-layout>
                <v-layout>
                  <v-flex xs12>
                    <autocomplete-box
                      label="Modelo"
                      :value="sale.article_id"
                      :changeHandler="v => sale.article_id = v"
                      :item="sale"
                      :options="{ 
                          fromStore: true,
                          entity: Product,
                          concatedKeys: ['sku', 'fabric.name', 'design.name', 'color.name'] 
                        }"
                    />
                  </v-flex>
                </v-layout>
                <v-layout v-if="sale.article_id">
                  <v-flex>
                    <v-card>
                      <v-card-title>
                        <h2>Rollos Disponibles</h2>
                      </v-card-title>
                      <v-card-text>
                        <v-text-field
                          type="number"
                          label="Buscar por cantidad"
                          v-model="sale.article_quantity"
                        />
                        <v-data-table
                          v-model="sale.article_selected"
                          rows-per-page-text="Registros por página"
                          :headers="[
                            {text:'Cantidad', value:'quantity', align:'right'}
                        ]"
                          :items="getStockDetails({office: selectedOffice.id, product:sale.article_id, quantity: sale.article_quantity})"
                          no-results-text="No se encontraron registros"
                          select-all
                        >
                          <template v-slot:items="props">
                            <td>
                              <v-checkbox v-model="props.selected" primary hide-details></v-checkbox>
                            </td>
                            <td class="text-xs-right">{{props.item.quantity}}</td>
                          </template>
                        </v-data-table>
                      </v-card-text>
                    </v-card>
                  </v-flex>
                </v-layout>
                <v-layout>
                  <v-spacer></v-spacer>
                  <v-btn color="success">Agregar Articulo</v-btn>
                </v-layout>
                <v-layout>
                    <v-flex xs7 lg2 offset-lg6>
                        <h1>Total:</h1>
                    </v-flex>
                    <v-flex xs5>
                        <h2 class="text-xs-right">{{sale.total}}</h2>
                    </v-flex>
                </v-layout>
                <v-layout>
                    <v-flex xs7 lg2 offset-lg6>
                        <h1>Saldo:</h1>
                    </v-flex>
                    <v-flex xs5>
                        <h2 class="text-xs-right">{{sale.balance}}</h2>
                    </v-flex>
                </v-layout>
              </v-container>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" @click="confirmDeleteSale(i)">Cancelar Venta</v-btn>
          </v-card-actions>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>
<script>
import { mapState, mapMutations, mapGetters } from "vuex";
import AutocompleteBox from "../components/form/AutocompleteBox.vue";
import Customer from "../utils/entities/customer";
import Product from "../utils/entities/product";

export default {
  components: { AutocompleteBox },
  methods: {
    confirmDeleteSale(id) {
      if (confirm("¿Esta seguro de cancelar esta venta?")) {
        this.deleteSale(id);
      }
    },
    ...mapMutations("app", ["addSale", "deleteSale"])
  },
  computed: {
    ...mapState("app", ["sales", "selectedOffice"]),
    ...mapGetters("entities", ["getStockDetails"])
  },
  data: () => ({
    tabs: null,
    valid: false,
    firstname: "",
    lastname: "",
    nameRules: [
      v => !!v || "Name is required",
      v => v.length <= 10 || "Name must be less than 10 characters"
    ],
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ],
    Customer,
    Product
  })
};
</script>