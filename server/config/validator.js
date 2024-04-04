'use strict';

const yup = require('yup');

module.exports = (data) =>
  yup
    .object()
    .shape({
      accessToken: yup.string().required(),
      shopHash: yup.string().required(),
    })
    .validate(data);
