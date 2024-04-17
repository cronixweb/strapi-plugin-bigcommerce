const pluginId = require('../../admin/src/pluginId');
const {getProductsParamsSchema} = require('../utils/validation');

module.exports = {
  getProducts: async (ctx) => {
    return await strapi.plugin(pluginId).service('bigcommerce').getProducts(ctx.query);
  },
  getProduct: async (ctx) => {
    ctx.send('hello');
  }
};
