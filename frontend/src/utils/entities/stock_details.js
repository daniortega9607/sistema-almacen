import moment from 'moment';

moment.locale('es');

const FromNowFormatter = ({ props }) => (
  <div>{moment(props.created_at).fromNow()}</div>
);

const StockDetail = {
  name: 'StockDetail',
  display_name_plural: 'Rollos',
  apiUrl: 'stock_details',
  field_configs: {
    list: {
      created_at: { formatter: FromNowFormatter },
      quantity: { align: 'right', sortable: false },
      buy_price: { align: 'right', type: 'number', sortable: false },
    },
    form: {
      quantity: { type: 'number' },
      buy_price: { type: 'number' },
    },
  },
  fields: {
    quantity: { display_name: 'Cantidad (m)' },
    buy_price: { display_name: 'Precio de Compra (USD)' },
    created_at: { display_name: 'Creado' },
  },
};

export default StockDetail;
