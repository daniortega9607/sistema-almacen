<template>
  <v-text-field
    v-model="item[field]"
    :append-icon="showPassword ? 'visibility' : 'visibility_off'"
    :type="showPassword ? 'text' : 'password'"
    :rules="rules"
    :label="label"
    browser-autocomplete="new-password"
    @click:append="showPassword = !showPassword"
  />
</template>
<script>
export default {
  props: {
    item: { type: Object, required: true },
    field: { type: String, required: true },
    label: { type: String, default: '' },
    rules: { type: Array, default: () => [] },
  },
  data() {
    return {
      showPassword: false,
    };
  },
};
</script>
