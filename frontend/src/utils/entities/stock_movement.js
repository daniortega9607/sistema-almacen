  const StockMovement = {
    name: 'StockMovement',
    store: false,
    display_name: 'Envios de Almacen',
    display_name_plural: 'Envio de Almacen',
    apiUrl: 'stock_movements',
    url: 'envios-almacen',
    field_configs: {
      list: {
      },
      form: {
      },
    },
    fields: {
      office_id: { display_name: 'Desde' },
      to_office_id: { display_name: 'Hacia' },
      balance: { display_name: 'Saldo' },
      total: { display_name: 'Total' },
      status: { display_name: 'Estado' },
      user_id: { display_name: 'Creado por' }
    },
  };
  
  export default StockMovement;
  