'use strict';

const pluginId = require('../../admin/src/pluginId');

module.exports = [
  {
    method: 'GET',
    path: '/brands',
    handler: 'brand.getBrands',
    config: {
      middlewares: [`plugin::${pluginId}.pageInfo`],
    },
  },
];
