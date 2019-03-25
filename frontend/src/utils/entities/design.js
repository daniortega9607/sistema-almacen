const Formatter = ({ props }) => {
  const design = props.design || props;
  return <div>{design.name}</div>;
};

const Design = {
  name: 'Design',
  display_name: 'Diseño',
  display_name_plural: 'Diseños',
  apiUrl: 'designs',
  url: 'disenos',
  field_configs: {
    list: {
      name: { align: 'left' },
    },
    form: {
      name: { required: true },
    },
  },
  fields: {
    name: { display_name: 'Nombre' },
  },
  formatter: Formatter,
};

export default Design;
