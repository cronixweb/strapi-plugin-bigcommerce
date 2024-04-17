const pluginId = require('../../admin/src/pluginId');

module.exports = {
  getCategories: async (ctx) => {
    return await strapi.plugin(pluginId).service('bigcommerce').getCategories(ctx.query);
  },
  getCategory: async (ctx) => {
    ctx.send('hello');
  }
};
