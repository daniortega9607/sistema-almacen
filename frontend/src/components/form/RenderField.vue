<template>
  <component
    :is="entity.field_configs.form[field].formatter"
    v-if="entity.field_configs.form[field].formatter"
    :options="entity.field_configs.form[field].formatter_options"
    :label="entity.fields[field].display_name"
    :value="item[field]"
    :item="item"
    :field="field"
    :rules="rules"
    :change-handler="changeHandler"
    :edited-index="editedIndex"
  />
  <v-select
    v-else-if="entity.field_configs.form[field].type === 'select'"
    :key="'item-form-'+field"
    :value="item[field]"
    :label="entity.fields[field].display_name"
    :rules="rules"
    :items="entity.field_configs.form[field].items"
    :clearable="true"
    @change="changeHandler"
  />
  <v-textarea
    v-else-if="entity.field_configs.form[field].type === 'textarea'"
    :key="'item-form-'+field"
    :value="item[field]"
    :label="entity.fields[field].display_name"
    :rules="rules"
    @input="changeHandler"
  />
  <v-text-field
    v-else
    :key="'item-form-'+field"
    :value="item[field]"
    :type="
      entity.field_configs.form[field]
        && entity.field_configs.form[field].type || 'text'
    "
    :rules="rules"
    :label="entity.fields[field].display_name"
    browser-autocomplete="new-password"
    @input="changeHandler"
  />
</template>
<script>
export default {
  props: {
    entity: { type: Object, required: true },
    field: { type: String, required: true },
    item: { type: Object, required: true },
    rules: { type: Array, default: () => [] },
    changeHandler: { type: Function, required: true },
    editedIndex: { type: [String, Number], required: true },
  },
};
</script>
