'use strict';

const pluginId = require('../../admin/src/pluginId');

module.exports = [
  {
    method: 'GET',
    path: '/categories',
    handler: 'category.getCategories',
    config: {
      middlewares: [`plugin::${pluginId}.pageInfo`],
    },
  },
];
