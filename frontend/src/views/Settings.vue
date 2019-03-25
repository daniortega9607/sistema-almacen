<template>
  <v-card v-if="entity">
    <v-card-title primary-title>
      <h1>{{ entity.display_name_plural }}</h1>
    </v-card-title>
    <v-card-text>
      <v-form
        ref="form"
        @submit.prevent="save"
      >
        <template v-for="field in getEntityForm(entity)">
          <component
            :is="entity.field_configs.form[field].formatter"
            v-if="entity.field_configs.form[field].formatter"
            :key="'item-form-'+field"
            :options="entity.field_configs.form[field].formatter_options"
            :label="entity.fields[field].display_name"
            :value="item[field]"
            :item="item"
            :field="field"
            :rules="getFieldValidations(entity, field, item)"
            :change-handler="val => item[field] = val"
          />
          <v-textarea
            v-else-if="entity.field_configs.form[field].type === 'textarea'"
            :key="'item-form-'+field"
            v-model="item[field]"
            :label="entity.fields[field].display_name"
            :rules="getFieldValidations(entity, field, item)"
          />
          <v-text-field
            v-else
            :key="'item-form-'+field"
            v-model="item[field]"
            :type="
              entity.field_configs.form[field]
                && entity.field_configs.form[field].type || 'text'
            "
            :rules="getFieldValidations(entity, field, item)"
            :label="entity.fields[field].display_name"
            browser-autocomplete="new-password"
          />
        </template>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn
        color="blue darken-1"
        flat
        @click="save"
      >
        Guardar
      </v-btn>
    </v-card-actions>
    <v-snackbar
      v-for="(alert, index) in alerts"
      :key="'alert-'+index"
      v-model="alert.show"
      :color="alert.status ? 'success':'error'"
      :right="true"
      :top="true"
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
import {
  getEntityInfo,
  isValidEntity,
  getEntityForm,
  getFieldValidations,
} from '@/utils/entities';

export default {
  data: () => ({
    entity: null,
    item: null,
    alerts: [],
  }),

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      if (isValidEntity({ url: 'ajustes' })) {
        this.entity = getEntityInfo({ url: 'ajustes' });
        this.item = Object.assign({}, this.$store.state.auth.user);
        return;
      }
      this.$router.replace('/');
    },

    async save() {
      if (this.$refs.form.validate()) {
        const [err, res] = await this.$store.dispatch('auth/updateUser', {
          entity: this.entity.apiUrl,
          item: this.item,
        });
        if (!err) {
          this.alerts.push({ ...res, show: true });
        } else if (err.response && err.response.data && err.response.data.error) {
          const { data } = err.response;
          this.alerts.push({
            ...data,
            message: data.error[Object.keys(data.error)[0]][0],
            show: true,
          });
        }
      } else {
        this.$refs.form.resetValidation();
        setTimeout(() => {
          this.$refs.form.validate();
        }, 400);
      }
    },

    getEntityForm,
    getFieldValidations,
  },
};
</script>
