import BigCommerceIcon from '../components/BigCommerceIcon';
import pluginId from '../pluginId';
import getTrad from '../utils/getTrad';

export default {
  name: 'multiple-products',
  pluginId,
  type: 'json',
  icon: BigCommerceIcon,
  components: {
    Input: async () => import('../components/Input/Multiple'),
  },
  intlLabel: {
    id: getTrad('custom-fields.multiple-products.label'),
    defaultMessage: 'BigCommerce – Multiple Products',
  },
  intlDescription: {
    id: getTrad('custom-fields.multiple-products.description'),
    defaultMessage: 'Select multiple products from BigCommerce',
  },
  multiple: true,
  options: {
    // advanced: [
    //   // {
    //   //   sectionTitle: {
    //   //     id: getTrad('custom-fields.multiple-products.response-settings'),
    //   //     defaultMessage: 'Response settings',
    //   //   },
    //   //   items: [options.fields, options.presentmentCurrencies],
    //   // },
    //   // {
    //   //   sectionTitle: {
    //   //     id: getTrad('custom-fields.multiple-products.filter-by-product-details'),
    //   //     defaultMessage: 'Filter by product details',
    //   //   },
    //   //   items: [
    //   //     options.collectionId,
    //   //     options.publishedStatus,
    //   //     options.vendor,
    //   //     options.status,
    //   //     options.productType,
    //   //     options.sinceId,
    //   //     options.presentmentCurrencies,
    //   //   ],
    //   // },
    //   // {
    //   //   sectionTitle: {
    //   //     id: getTrad('custom-fields.multiple-products.filter-by-dates'),
    //   //     defaultMessage: 'Filter by dates',
    //   //   },
    //   //   items: [
    //   //     options.createdAtMax,
    //   //     options.createdAtMin,
    //   //     options.publishedAtMax,
    //   //     options.publishedAtMin,
    //   //     options.updatedAtMax,
    //   //     options.updatedAtMin,
    //   //   ],
    //   // },
    // ],
    // validator: () => ({
    //   fields: yup.array().of(yup.string()).default([]),
    // }),
  },
};
