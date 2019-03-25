<template>
  <div>
    <template v-for="field in getEntityForm(entity, editedIndex !== -1)">
      <render-field
        :key="'item-form-'+entity.name+'-'+field"
        :entity="entity"
        :field="field"
        :item="item"
        :edited-index="editedIndex"
        :rules="getFieldValidations(entity, field, item)"
        :change-handler="val => item[field] = val"
      />
    </template>
  </div>
</template>
<script>
import RenderField from './RenderField.vue';
import { getFieldValidations, getEntityForm } from '../../utils';

export default {
  components: { RenderField },
  props: {
    entity: { type: Object, required: true },
    editedIndex: { type: [String, Number], required: true },
    item: { type: Object, required: true },
  },
  methods: {
    getFieldValidations,
    getEntityForm,
  },
};
</script>
