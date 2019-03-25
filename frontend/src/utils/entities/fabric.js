const Formatter = ({ props }) => {
  const fabric = props.fabric || props;
  return <div>{fabric.name}</div>;
};

const Fabric = {
  name: 'Fabric',
  display_name: 'Tela',
  display_name_plural: 'Telas',
  apiUrl: 'fabrics',
  url: 'telas',
  field_configs: {
    list: {
      name: { align: 'left' },
      buy_price: { align: 'right', type: 'number' },
      sell_price: { align: 'right', type: 'number' },
    },
    form: {
      name: { required: true },
      buy_price: { type: 'number' },
      sell_price: { type: 'number' },
    },
  },
  fields: {
    name: { display_name: 'Nombre' },
    buy_price: { display_name: 'Precio de Compra' },
    sell_price: { display_name: 'Precio de Venta' },
  },
  formatter: Formatter,
};

export default Fabric;
