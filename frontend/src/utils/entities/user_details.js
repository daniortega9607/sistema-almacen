import AutocompleteBox from '../../components/form/AutocompleteBox.vue';
import Customer from './customer';

export const UserTypes = [
  { text: 'Administrador', value: 1 },
  { text: 'Vendedor', value: 2 },
  { text: 'Cliente', value: 3 },
];
const UserDetails = {
  name: 'UserDetails',
  display_name_plural: 'Detalles',
  field_configs: {
    form: {
      user_type: {
        type: 'select',
        items: UserTypes,
        required: true,
      },
      customer_id: {
        formatter: AutocompleteBox,
        formatter_options: { entity: Customer, fromStore: true },
        hideOnUpdate: true,
      },

    },
  },
  fields: {
    user_type: { display_name: 'Tipo de Usuario' },
    customer_id: { display_name: 'Cliente' },
  },
};

export default UserDetails;
