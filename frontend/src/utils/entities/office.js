const Formatter = ({ props }) => {
  const office = props.office || props;
  return <div>{office.name}</div>;
};

const Office = {
  name: 'Office',
  display_name: 'Sucursal',
  display_name_plural: 'Sucursales',
  apiUrl: 'offices',
  url: 'sucursales',
  field_configs: {
    list: {
      name: { align: 'left' },
      address: { align: 'left' },
      phone: { align: 'left' },
    },
    form: {
      name: { required: true },
      address: {},
      phone: {},
    },
  },
  fields: {
    name: { display_name: 'Nombre' },
    address: { display_name: 'Direccion' },
    phone: { display_name: 'Telefono' },
  },

  formatter: Formatter,
};

export default Office;
