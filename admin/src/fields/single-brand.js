import BigCommerceIcon from '../components/BigCommerceIcon';
import pluginId from '../pluginId';
import getTrad from '../utils/getTrad';

export default {
  name: 'single-brand',
  pluginId,
  type: 'json',
  icon: BigCommerceIcon,
  multiple: true,
  components: {
    Input: async () => import('../components/Brands/BrandInput/Single'),
  },
  intlLabel: {
    id: getTrad('custom-fields.single-brand.label'),
    defaultMessage: 'BigCommerce – Single Brand',
  },
  intlDescription: {
    id: getTrad('custom-fields.single-brand.description'),
    defaultMessage: 'Select a brand from BigCommerce',
  },
  options: {
    // advanced: [
    //   {
    //     sectionTitle: {
    //       id: getTrad('custom-fields.multiple-brands.response-settings'),
    //       defaultMessage: 'Response settings',
    //     },
    //     items: [options.fields, options.presentmentCurrencies],
    //   },
    //   {
    //     sectionTitle: {
    //       id: getTrad('custom-fields.multiple-brands.filter-by-brand-details'),
    //       defaultMessage: 'Filter by brand details',
    //     },
    //     items: [
    //       options.collectionId,
    //       options.publishedStatus,
    //       options.vendor,
    //       options.status,
    //       options.brandType,
    //       options.sinceId,
    //       options.presentmentCurrencies,
    //     ],
    //   },
    //   {
    //     sectionTitle: {
    //       id: getTrad('custom-fields.multiple-brands.filter-by-dates'),
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
