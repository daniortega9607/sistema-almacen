import AutocompleteBox from '../../components/form/AutocompleteBox.vue';
import Fabric from './fabric';
import Design from './design';
import Color from './color';

const Formatter = ({ props }) => {
  const product = props.product || props;
  return (
    <div>{product.sku}</div>
  );
};

const Product = {
  name: 'Product',
  display_name: 'Modelo',
  display_name_plural: 'Modelos',
  apiUrl: 'products',
  url: 'modelos',
  field_configs: {
    search: ['sku', 'fabric.name', 'design.name', 'color.name'],
    list: {
      sku: { align: 'left' },
      fabric_id: { align: 'left', formatter: Fabric.formatter },
      design_id: { align: 'left', formatter: Design.formatter },
      color_id: { align: 'left', formatter: Color.formatter, sortable: false },
    },
    form: {
      sku: { required: true },
      fabric_id: {
        required: true,
        formatter: AutocompleteBox,
        formatter_options: { entity: Fabric, fromStore: true },
      },
      design_id: {
        formatter: AutocompleteBox,
        formatter_options: { entity: Design, fromStore: true },
      },
      color_id: {
        formatter: AutocompleteBox,
        formatter_options: { entity: Color, fromStore: true },
      },
    },
  },
  fields: {
    sku: { display_name: 'Código' },
    fabric_id: { display_name: 'Tela' },
    design_id: { display_name: 'Diseño' },
    color_id: { display_name: 'Color' },
  },

  formatter: Formatter,
};

export default Product;
