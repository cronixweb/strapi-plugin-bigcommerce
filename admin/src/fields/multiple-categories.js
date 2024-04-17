import BigCommerceIcon from '../components/BigCommerceIcon';
import pluginId from '../pluginId';
import getTrad from '../utils/getTrad';

export default {
  name: 'multiple-categories',
  pluginId,
  type: 'json',
  icon: BigCommerceIcon,
  components: {
    Input: async () => import('../components/Categories/CategoryInput/Multiple'),
  },
  intlLabel: {
    id: getTrad('custom-fields.multiple-categories.label'),
    defaultMessage: 'BigCommerce – Multiple Categories',
  },
  intlDescription: {
    id: getTrad('custom-fields.multiple-categories.description'),
    defaultMessage: 'Select multiple categories from BigCommerce',
  },
  multiple: true,
  options: {
    // advanced: [
    //   // {
    //   //   sectionTitle: {
    //   //     id: getTrad('custom-fields.multiple-categories.response-settings'),
    //   //     defaultMessage: 'Response settings',
    //   //   },
    //   //   items: [options.fields, options.presentmentCurrencies],
    //   // },
    //   // {
    //   //   sectionTitle: {
    //   //     id: getTrad('custom-fields.multiple-categories.filter-by-category-details'),
    //   //     defaultMessage: 'Filter by category details',
    //   //   },
    //   //   items: [
    //   //     options.collectionId,
    //   //     options.publishedStatus,
    //   //     options.vendor,
    //   //     options.status,
    //   //     options.categoryType,
    //   //     options.sinceId,
    //   //     options.presentmentCurrencies,
    //   //   ],
    //   // },
    //   // {
    //   //   sectionTitle: {
    //   //     id: getTrad('custom-fields.multiple-categories.filter-by-dates'),
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
