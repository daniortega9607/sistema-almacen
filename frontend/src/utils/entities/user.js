import PasswordField from '../../components/form/PasswordField.vue';
import FormGenerator from '../../components/form/FormGenerator.vue';
import UserDetails from './user_details';

const UserDetailsForm = ({ props }) => (
  <FormGenerator
    entity={UserDetails}
    editedIndex={props.editedIndex}
    item={props.item.details}
  />
);

const User = {
  name: 'User',
  display_name: 'Usuario',
  display_name_plural: 'Usuarios',
  apiUrl: 'users',
  url: 'usuarios',
  field_configs: {
    list: {
      name: { align: 'left' },
      email: {},
      user_type: {},
      customer: {},
    },
    form: {
      name: { required: true },
      email: { required: true, email: true },
      password: { required: true, formatter: PasswordField, hideOnUpdate: true },
      c_password: {
        formatter: PasswordField,
        match: { field: 'password', message: 'Las contraseñas no coinciden' },
        conditionalRequired: [
          { field: 'password', logic: '!=', value: null },
        ],
        hideOnUpdate: true,
      },
      details: {
        formatter: UserDetailsForm,
        default: {},
      },
    },
  },
  fields: {
    name: { display_name: 'Nombre' },
    email: { display_name: 'Correo' },
    password: { display_name: 'Contraseña' },
    c_password: { display_name: 'Confirmar Contraseña' },
    details: { display_name: 'Detalles' },
    user_type: { display_name: 'Tipo de Usuario' },
    customer: { display_name: 'Cliente' },
  },
};

export default User;
