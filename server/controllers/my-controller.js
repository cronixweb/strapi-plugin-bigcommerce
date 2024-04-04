'use strict';

module.exports = ({strapi}) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('big-commerce-fields')
      .service('myService')
      .getWelcomeMessage();
  },
});
