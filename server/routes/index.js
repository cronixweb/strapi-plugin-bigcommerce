const productRoutes = require('./product');
const brandRoutes = require('./brand');
const categoryRoutes = require('./category');

module.exports = {
  admin: {
    type: 'admin',
    routes: [...productRoutes, ...brandRoutes, ...categoryRoutes],
  },
};
