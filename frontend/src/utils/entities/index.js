import Color from './color';
import Design from './design';
import Fabric from './fabric';
import Product from './product';
import Office from './office';
import Customer from './customer';
import Supplier from './supplier';
import User from './user';
import Setting from './setting';
import Stock from './stock';
import StockMovement from './stock_movement';

export const Entities = {
  Color,
  Design,
  Fabric,
  Product,
  Office,
  Customer,
  Supplier,
  User,
  Setting,
  Stock,
  StockMovement,
};

export const MappedEntities = {};

Object.keys(Entities).forEach((key) => {
  if (Entities[key].url) MappedEntities[Entities[key].url] = Entities[key].name;
});

export const getEntityInfo = ({ url, name }) => {
  if (url && MappedEntities[url]) return Entities[MappedEntities[url]];
  return name && Entities[name] ? Entities[name] : null;
};

export const isValidEntity = ({ url, name }) => (
  (url && MappedEntities[url] && Entities[MappedEntities[url]])
  || (name && Entities[name])
);

export const getEntityHeaders = (Entity) => {
  const headers = [];
  if (Entity.field_configs && Entity.field_configs.list) {
    const config = Entity.field_configs.list;
    Object.keys(Entity.field_configs.list).forEach((key) => {
      headers.push({
        text: Entity.fields[key].display_name,
        value: key,
        ...config[key],
      });
    });
  }
  if (!Entity.no_actions) {
    headers.push({ text: '', align: 'right', sortable: false });
  }
  return headers;
};

export const getEntityDefaultItem = (Entity) => {
  const item = {};
  if (Entity.fields) {
    Object.keys(Entity.fields).forEach((key) => {
      item[key] = (Entity.field_configs.form[key] && Entity.field_configs.form[key].default)
        || null;
    });
  }
  return item;
};

export const getEntityForm = (Entity, isUpdate = false) => {
  const fields = [];
  if (Entity.field_configs && Entity.field_configs.form) {
    const config = Entity.field_configs.form;
    Object.keys(Entity.field_configs.form).forEach((field) => {
      if ((isUpdate && !config[field].hideOnUpdate) || !isUpdate) {
        fields.push(field);
      }
    });
  }
  return fields;
};

const validateRequired = (conditions, item) => {
  let required = true;
  conditions.forEach((condition) => {
    switch (condition.logic) {
      case '!=':
        if (condition.value === null) {
          if (item[condition.field] !== null && item[condition.field] !== '') {
            required = false;
          }
        }
        break;

      default:
        break;
    }
  });
  return required;
};

export const getFieldValidations = (Entity, field, item) => {
  const validations = [];
  if (Entity.field_configs && Entity.field_configs.form && Entity.field_configs.form[field]) {
    const config = Entity.field_configs.form[field];
    if (config.required) {
      validations.push(v => !!v || 'Debe completar este campo');
    }
    if (config.min) {
      validations.push(v => (v && v.length >= config.min) || !v || `Minimo ${config.min} caracteres`);
    }
    if (config.email) {
      validations.push(v => /.+@.+/.test(v) || 'Debe ingresar un e-mail válido');
    }
    if (config.match) {
      validations.push(v => v === item[config.match.field] || config.match.message || 'Los campos no coinciden');
    }
    if (config.conditionalRequired) {
      if (validateRequired(config.conditionalRequired, item)) {
        validations.push(v => !!v || 'Debe completar este campo');
      }
    }
  }
  return validations;
};

export const getStoredEntities = () => {
  const entities = {};
  Object.keys(Entities).forEach((entity) => {
    if (Entities[entity].store !== false) {
      entities[Entities[entity].apiUrl] = [];
    }
  });
  return entities;
};
