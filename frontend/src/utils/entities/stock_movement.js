import AutocompleteBox from '../../components/form/AutocompleteBox.vue';
import Office from './office';

const StockMovement = {
  name: 'StockMovement',
  display_name: 'Envio de Almacen',
  display_name_plural: 'Envios de Almacen',
  apiUrl: 'stock_movements',
  url: 'envios-almacen',
  field_configs: {
    list: {
    },
    form: {
      office_id: {
        required: true,
        formatter: AutocompleteBox,
        formatter_options: { entity: Office, fromStore: true },
      },
      to_office_id: {
        required: true,
        formatter: AutocompleteBox,
        formatter_options: { entity: Office, fromStore: true },
      },
      details: { default: [] },
    },
  },
  fields: {
    office_id: { display_name: 'Desde' },
    to_office_id: { display_name: 'Hacia' },
    balance: { display_name: 'Saldo' },
    total: { display_name: 'Total' },
    status: { display_name: 'Estado' },
    user_id: { display_name: 'Creado por' },
    details: { display_name: 'Rollos para envio' },
  },
};

export default StockMovement;
