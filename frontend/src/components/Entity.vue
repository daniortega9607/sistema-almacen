<template>
  <v-card v-if="entity">
    <v-card-title primary-title>
      <h1>{{ entity.display_name_plural }}</h1>
      <v-spacer />
      <v-dialog
        v-model="dialog"
        max-width="690px"
        :transition="isMobile ? 'dialog-bottom-transition' : 'dialog-transition'"
        scrollable
        :fullscreen="isMobile"
      >
        <template
          v-if="!entity.hideAddButton"
          v-slot:activator="{ on }"
        >
          <v-btn
            color="success"
            v-on="on"
          >
            Agregar
          </v-btn>
        </template>
        <v-card>
          <v-toolbar
            dark
            color="primary"
          >
            <v-btn
              v-if="isMobile"
              icon
              dark
              @click="dialog = false"
            >
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>{{ formTitle }}</v-toolbar-title>
            <v-spacer />
            <v-subheader v-if="item.updated_at && !isMobile">
              Ultima modificacion: {{ moment(item.updated_at).fromNow() }}
            </v-subheader>
            <v-toolbar-items v-if="isMobile">
              <v-btn
                dark
                flat
                @click="save"
              >
                Guardar
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-card-text>
            <v-form
              ref="form"
              @submit.prevent="save"
            >
              <template v-for="field in getEntityForm(entity, editedIndex !== -1)">
                <render-field
                  :key="'item-form-'+field"
                  :entity="entity"
                  :field="field"
                  :item="item"
                  :edited-index="editedIndex"
                  :rules="getFieldValidations(entity, field, item)"
                  :change-handler="val => item[field] = val"
                />
              </template>
            </v-form>
          </v-card-text>
          <v-card-actions v-if="!isMobile">
            <v-spacer />
            <v-btn
              color="blue darken-1"
              flat
              @click="close"
            >
              Cancelar
            </v-btn>
            <v-btn
              color="blue darken-1"
              flat
              @click="save"
            >
              Guardar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card-title>
    <div>
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
        :headers="getEntityHeaders(entity)"
        :search="search"
        :items="getItems({ entity:entity.apiUrl })"
        :custom-filter="customFilter"
        no-results-text="No se encontraron registros"
        rows-per-page-text="Registros por página"
        :rows-per-page-items="rowsPerPage"
        class="elevation-1"
      >
        <template v-slot:items="props">
          <td
            v-for="field in Object.keys(entity.field_configs.list)"
            :key="'item-'+props.index+'-'+field"
            :class="{
              'text-xs-center':entity.field_configs.list[field].align === 'center',
              'text-xs-right':entity.field_configs.list[field].align === 'right',
              'text-xs-left':entity.field_configs.list[field].align === 'left'
            }"
            @click="editItem(props.item)"
          >
            <component
              :is="entity.field_configs.list[field].formatter"
              v-if="entity.field_configs.list[field].formatter"
              v-bind="props.item"
            />
            <div v-else>
              {{ props.item[field] }}
            </div>
          </td>
          <td
            v-if="!entity.no_actions"
            class="justify-center layout px-0"
          >
            <v-icon
              small
              class="mr-2"
              @click="editItem(props.item)"
            >
              edit
            </v-icon>
            <v-icon
              small
              @click="deleteItem(props.item)"
            >
              delete
            </v-icon>
          </td>
        </template>
        <template v-slot:no-data>
          <v-btn
            color="primary"
            @click="initialize"
          >
            Reset
          </v-btn>
        </template>
      </v-data-table>
    </div>
  </v-card>
</template>

<script>
import {
  getEntityInfo,
  isValidEntity,
  getEntityHeaders,
  getEntityForm,
  getEntityDefaultItem,
  getFieldValidations,
} from '@/utils/entities';
import { getDataFromKey } from '../utils';
import RenderField from '@/components/form/RenderField.vue';
import { mapGetters } from 'vuex';
import moment from 'moment';

moment.locale('es');

export default {
  components: { RenderField },
  data: () => ({
    search: '',
    dialog: false,
    entity: null,
    editedIndex: -1,
    item: null,
    rowsPerPage: [5, 10, 25, { text: 'Todos', value: -1 }],

  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? `Crear ${this.entity.display_name}`
        : `Editar ${this.entity.display_name}`;
    },
    isMobile() {
      return (
        this.$vuetify.breakpoint.name === 'sm'
        || this.$vuetify.breakpoint.name === 'xs'
      );
    },
    ...mapGetters('entities', ['getItems']),
  },

  watch: {
    dialog(val) {
      if (!val) this.close();
      this.$refs.form.resetValidation();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      if (isValidEntity({ url: this.$route.params.entity })) {
        this.entity = getEntityInfo({ url: this.$route.params.entity });
        this.item = Object.assign({}, getEntityDefaultItem(this.entity));
        if (!this.$store.state.entities[this.entity.apiUrl].length) {
          this.$store.dispatch('entities/read', { entity: this.entity.apiUrl });
        }
        return;
      }
      this.$router.replace('/');
    },

    editItem(item) {
      this.editedIndex = this.$store.state.entities[this.entity.apiUrl].indexOf(
        item,
      );
      this.item = Object.assign({}, item);
      this.dialog = true;
    },

    async deleteItem(item) {
      const index = this.$store.state.entities[this.entity.apiUrl].indexOf(
        item,
      );
      if (window.confirm('¿Esta seguro de eliminar este registro?')) {
        const [err, res] = await this.$store.dispatch('entities/delete', {
          deletedItem: index,
          entity: this.entity.apiUrl,
          item,
        });
        if (!err) {
          this.$store.commit('app/showAlert', res);
        }
      }
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.item = Object.assign({}, getEntityDefaultItem(this.entity));
        this.editedIndex = -1;
      }, 300);
    },

    async save() {
      if (this.$refs.form.validate()) {
        if (this.editedIndex > -1) {
          const [err, res] = await this.$store.dispatch('entities/update', {
            updatedItem: this.editedIndex,
            entity: this.entity.apiUrl,
            item: this.item,
          });
          if (!err) {
            this.$store.commit('app/showAlert', res);
            this.close();
          } else if (
            err.response
            && err.response.data
            && err.response.data.error
          ) {
            const { data } = err.response;
            this.$store.commit('app/showAlert', {
              ...data,
              message: data.error[Object.keys(data.error)[0]][0],
            });
          }
        } else {
          const [err, res] = await this.$store.dispatch('entities/create', {
            entity: this.entity.apiUrl,
            item: this.item,
          });
          if (!err) {
            this.$store.commit('app/showAlert', res);
            this.close();
          } else if (
            err.response
            && err.response.data
            && err.response.data.error
          ) {
            const { data } = err.response;
            this.$store.commit('app/showAlert', {
              ...data,
              message: data.error[Object.keys(data.error)[0]][0],
            });
          }
        }
      } else {
        this.$refs.form.resetValidation();
        setTimeout(() => {
          this.$refs.form.validate();
        }, 400);
      }
    },

    customFilter(items, search, filter) {
      const inputSearch = search.toString().toLowerCase();
      if (inputSearch.trim() === '') return items;
      const searchKeys = this.entity.field_configs.search;
      return items.filter(item => (searchKeys || Object.keys(item)).some(key => filter(getDataFromKey(item, key.split('.')), inputSearch)));
    },

    getEntityHeaders,
    getEntityForm,
    getFieldValidations,
    moment,
  },
};
</script>
