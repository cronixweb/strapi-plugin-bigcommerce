function paramsToObject(entries) {
  const result = {}
  for (const [key, value] of entries) {
    result[key] = value;
  }
  return result;
}

const transformResponse = (data) => {

  let nextObject = null;
  let previousObject = null;

  if (data?.meta?.pagination?.links?.next || data?.meta?.pagination?.links?.previous) {
    nextObject = paramsToObject((new URLSearchParams(data?.meta?.pagination?.links?.next)).entries());
    previousObject = paramsToObject((new URLSearchParams(data?.meta?.pagination?.links?.previous)).entries());
  }

  return {
    data: data?.data,
    meta: {
      pagination: {
        nextPage: nextObject,
        previousPage: previousObject,
      },
    },
  };
};

module.exports = transformResponse;
