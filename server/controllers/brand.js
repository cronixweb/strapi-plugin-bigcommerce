const pluginId = require('../../admin/src/pluginId');

module.exports = {
  getBrands: async (ctx) => {
    return await strapi.plugin(pluginId).service('bigcommerce').getBrands(ctx.query);
  },
  getBrand: async (ctx) => {
    ctx.send('hello');
  }
};
