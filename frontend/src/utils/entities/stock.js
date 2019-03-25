import AutocompleteBox from '../../components/form/AutocompleteBox.vue';
import StockDetailsForm from '../../components/StockDetailsForm.vue';
import Product from './product';
import Office from './office';
import Fabric from './fabric';
import Design from './design';
import Color from './color';

const Stock = {
  name: 'Stock',
  display_name: 'Almacen',
  display_name_plural: 'Almacen',
  apiUrl: 'stocks',
  url: 'almacen',
  field_configs: {
    search: ['office.name', 'product.sku', 'fabric.name', 'design.name', 'color.name', 'stock'],
    list: {
      office_id: { align: 'left', formatter: Office.formatter, sortable: false },
      product_id: { align: 'left', formatter: Product.formatter },
      fabric: { align: 'left', formatter: Fabric.formatter },
      design: { align: 'left', formatter: Design.formatter },
      color: { align: 'left', formatter: Color.formatter, sortable: false },
      stock: { align: 'right', type: 'number' },
    },
    form: {
      office_id: {
        required: true,
        formatter: AutocompleteBox,
        formatter_options: { entity: Office, fromStore: true },
      },
      product_id: {
        required: true,
        formatter: AutocompleteBox,
        formatter_options: { entity: Product, fromStore: true, concatedKeys: ['sku', 'fabric.name', 'design.name', 'color.name'] },
      },
      stock: { type: 'number' },
      details: {
        formatter: StockDetailsForm,
        default: [],
      },
    },
  },
  fields: {
    office_id: { display_name: 'Sucursal' },
    product_id: { display_name: 'Modelo' },
    fabric: { display_name: 'Tela' },
    design: { display_name: 'Diseño' },
    color: { display_name: 'Color' },
    stock: { display_name: 'Cantidad (m)' },
    details: { display_name: 'Rollos' },
  },
};

export default Stock;
