import PasswordField from '../../components/form/PasswordField.vue';

const Setting = {
  store: false,
  name: 'Setting',
  display_name: 'Ajuste',
  display_name_plural: 'Ajustes',
  apiUrl: 'users/settings',
  url: 'ajustes',
  field_configs: {
    form: {
      name: { required: true },
      email: { required: true, email: true },
      password: { formatter: PasswordField },
      n_password: {
        formatter: PasswordField,
        min: 6,
      },
      c_password: {
        formatter: PasswordField,
        match: { field: 'n_password', message: 'Las contraseñas no coinciden' },
        conditionalRequired: [
          { field: 'n_password', logic: '!=', value: null },
        ],
      },
    },
  },
  fields: {
    name: { display_name: 'Nombre' },
    email: { display_name: 'Correo' },
    password: { display_name: 'Contraseña Actual' },
    n_password: { display_name: 'Nueva Contraseña' },
    c_password: { display_name: 'Confirmar Contraseña' },
  },
};

export default Setting;
