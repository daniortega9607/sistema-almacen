const Customer = {
  name: 'Customer',
  display_name: 'Cliente',
  display_name_plural: 'Clientes',
  apiUrl: 'customers',
  url: 'clientes',
  field_configs: {
    list: {
      name: { align: 'left' },
      address: {},
      phone: {},
      mobilephone: {},
      email: {},
      credit_days: {},
      comments: {},
    },
    form: {
      name: { required: true },
      address: {},
      phone: {},
      mobilephone: {},
      email: {},
      credit_days: {},
      comments: { type: 'textarea' },
    },
  },
  fields: {
    name: { display_name: 'Nombre' },
    address: { display_name: 'Direccion' },
    phone: { display_name: 'Telefono' },
    mobilephone: { display_name: 'Celular' },
    email: { display_name: 'Correo' },
    credit_days: { display_name: 'Dias de Crédito' },
    comments: { display_name: 'Observaciones' },
  },
};

export default Customer;
