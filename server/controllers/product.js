const pluginId = require('../../admin/src/pluginId');
const {getProductsParamsSchema} = require('../utils/validation');

module.exports = {
  getProducts: async (ctx) => {
    const query = getProductsParamsSchema.validateSync(ctx.query);
    return await strapi.plugin(pluginId).service('bigcommerce').getProducts(query);
  },
  getProduct: async (ctx) => {
    ctx.send('hello');
  },
};
