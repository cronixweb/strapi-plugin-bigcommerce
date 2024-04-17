'use strict';

const pluginId = require('../../admin/src/pluginId');
const transformResponse = require('../utils/transform');

module.exports = ({strapi}) => {
  let url = 'https://api.bigcommerce.com/stores/' + strapi.plugin(pluginId).config('shopHash') + '/v3/';
  let options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Auth-Token': strapi.plugin(pluginId).config('accessToken')
    }
  };

  const getProducts = async (params) => {
    const bigCommerceResponse = await fetch(url + 'catalog/products?' + (new URLSearchParams(params).toString()), options)
      .then(res => res.json())
      .catch(err => console.error('error:' + err));
    console.log(bigCommerceResponse);
    return transformResponse(bigCommerceResponse);
  };

  const getBrands = async (params) => {
    const bigCommerceResponse = await fetch(url + 'catalog/brands?' + (new URLSearchParams(params).toString()), options)
      .then(res => res.json())
      .catch(err => console.error('error:' + err));
    return transformResponse(bigCommerceResponse);
  };

  const getCategories = async (params) => {
    const bigCommerceResponse = await fetch(url + 'catalog/categories?' + (new URLSearchParams(params).toString()), options)
      .then(res => res.json())
      .catch(err => console.error('error:' + err));
    return transformResponse(bigCommerceResponse);
  };

  const getProduct = async (id) => {
    const bigCommerceProduct = fetch(url + 'catalog/products/' + id, options)
      .then(res => res.json())
      // .then(json => console.log(json))
      .catch(err => console.error('error:' + err));
    return transformResponse(bigCommerceProduct);
  };

  return {getProduct, getProducts, getBrands, getCategories};
};
