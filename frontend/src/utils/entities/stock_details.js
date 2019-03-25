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
      remaining_quantity: { align: 'right', sortable: false },
    },
    form: {
      quantity: { type: 'number' },
      remaining_quantity: { type: 'number' },
    },
  },
  fields: {
    quantity: { display_name: 'Cantidad (m)' },
    remaining_quantity: { display_name: 'Cantidad Restante (m)' },
    created_at: { display_name: 'Creado' },
  },
};

export default StockDetail;
