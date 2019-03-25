import axios from 'axios';

export const setHeaders = () => {
  if (localStorage.getItem('token')) {
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }
};

setHeaders();

export const fetch = ({
  method = 'get', url, data = {}, params = null,
}) => axios({
  method, url, data, params,
})
  .then(res => [null, res.data])
  .catch(err => [err]);

export const getErrors = (res) => {
  let errors = [];
  Object.keys(res).forEach((element) => {
    errors = errors.concat(res[element]);
  });
  return errors.length ? errors[0] : 'Ocurrio un error';
};

export const getField = (item, keys) => {
  if (item[keys]) { return keys; }
  if (keys.indexOf('.') !== -1) {
    const lastIndex = keys.split('.').length;
    const newKeys = keys.split('.');
    newKeys.splice(lastIndex - 1, 1).join('.');
    return getField(item, newKeys.join('.'));
  }
  return null;
};

export const getDataFromKey = (data, keys, initialKeys) => {
  let value = '';
  if (initialKeys) {
    const field = getField(data, initialKeys.join('.'));
    if (field) return JSON.stringify(data[field]);
  }
  const key = keys[0];
  if (typeof data[key] === 'object' && data[key] !== null && keys.length > 1) {
    const newKeys = keys.slice(1);
    if (newKeys) { value = getDataFromKey(data[key], newKeys); }
  } else value = data[key];
  return value;
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

export default {
  fetch, getErrors,
};
