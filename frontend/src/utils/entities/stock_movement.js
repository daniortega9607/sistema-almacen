import AutocompleteBox from '../../components/form/AutocompleteBox.vue';
import Office from './office';
import StockMovementDetailsForm from '../../components/StockMovementDetailsForm.vue';

const StockMovement = {
  name: 'StockMovement',
  display_name: 'Envio de Almacen',
  display_name_plural: 'Envios de Almacen',
  apiUrl: 'stock_movements',
  url: 'envios-almacen',
  field_configs: {
    list: {
      office_id: { align: 'left', formatter: Office.formatter, sortable: false },
      to_office_id: { align: 'left', formatter: Office.formatter, sortable: false },
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
      total: { type:'number', default: '0.00' },
      balance: { type:'number', default: '0.00' },
      details: { formatter: StockMovementDetailsForm, default: [] },
    },
  },
  fields: {
    office_id: { display_name: 'Desde Sucursal' },
    to_office_id: { display_name: 'Hacia Sucursal' },
    balance: { display_name: 'Saldo' },
    total: { display_name: 'Total' },
    status: { display_name: 'Estado' },
    user_id: { display_name: 'Creado por' },
    details: { display_name: 'Rollos para envio' },
  },
};

export default StockMovement;
