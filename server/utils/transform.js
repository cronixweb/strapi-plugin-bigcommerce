const _ = require('lodash');

const transformResponse = (data) => {
  return {
    data: data?.data,
    meta: {
      pagination: {
        nextPage: data?.links?.next,
        previousPage: data?.links?.previous,
      },
    },
  };
};

module.exports = transformResponse;
