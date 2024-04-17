import BigCommerceIcon from '../components/BigCommerceIcon';
import pluginId from '../pluginId';
import getTrad from '../utils/getTrad';

export default {
  name: 'single-category',
  pluginId,
  type: 'json',
  icon: BigCommerceIcon,
  multiple: true,
  components: {
    Input: async () => import('../components/Categories/CategoryInput/Single'),
  },
  intlLabel: {
    id: getTrad('custom-fields.single-category.label'),
    defaultMessage: 'BigCommerce – Single Category',
  },
  intlDescription: {
    id: getTrad('custom-fields.single-category.description'),
    defaultMessage: 'Select a category from BigCommerce',
  },
  options: {
    // advanced: [
    //   {
    //     sectionTitle: {
    //       id: getTrad('custom-fields.multiple-categorys.response-settings'),
    //       defaultMessage: 'Response settings',
    //     },
    //     items: [options.fields, options.presentmentCurrencies],
    //   },
    //   {
    //     sectionTitle: {
    //       id: getTrad('custom-fields.multiple-categorys.filter-by-category-details'),
    //       defaultMessage: 'Filter by category details',
    //     },
    //     items: [
    //       options.collectionId,
    //       options.publishedStatus,
    //       options.vendor,
    //       options.status,
    //       options.categoryType,
    //       options.sinceId,
    //       options.presentmentCurrencies,
    //     ],
    //   },
    //   {
    //     sectionTitle: {
    //       id: getTrad('custom-fields.multiple-categorys.filter-by-dates'),
    //       defaultMessage: 'Filter by dates',
    //     },
    //     items: [
    //       options.createdAtMax,
    //       options.createdAtMin,
    //       options.publishedAtMax,
    //       options.publishedAtMin,
    //       options.updatedAtMax,
    //       options.updatedAtMin,
    //     ],
    //   },
    // ],
    // validator: () => ({
    //   fields: yup.array().of(yup.string()).default([]),
    // }),
  },
};
