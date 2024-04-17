'use strict';

const pluginId = require('../admin/src/pluginId');

module.exports = async ({strapi}) => {
  // Products Custom Fields
  strapi.customFields.register({
    plugin: pluginId,
    name: 'single-product',
    type: 'json',
  });

  strapi.customFields.register({
    plugin: pluginId,
    name: 'multiple-products',
    type: 'json',
  });

  // Brands Custom Fields
  strapi.customFields.register({
    plugin: pluginId,
    name: 'single-brand',
    type: 'json',
  });

  strapi.customFields.register({
    plugin: pluginId,
    name: 'multiple-brands',
    type: 'json',
  });
};
