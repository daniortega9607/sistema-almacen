const StockMovementDetails = {
  name: 'StockMovementDetails',
  display_name_plural: 'Rollos',
  apiUrl: 'stock_movement_details',
  field_configs: {
    list: {
        stock_detail_id: {}
    },
    form: {
    },
  },
  fields: {
    stock_detail_id: { display_name: 'Producto' }
  },
};

export default StockMovementDetails;
