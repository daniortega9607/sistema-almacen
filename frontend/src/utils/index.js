import axios from 'axios';

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

export default {
  fetch, getErrors,
};
