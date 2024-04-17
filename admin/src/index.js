import Multiselect from "./components/Multiselect";
import multipleProducts from "./fields/multiple-products";
import singleProduct from "./fields/single-product";
import singleBrand from "./fields/single-brand";
import multipleBrands from "./fields/multiple-brands";

export default {
  register(app) {
    app.plugins["content-type-builder"].apis.forms.components.add({
      id: "multiselect",
      component: Multiselect,
    });

    // Product Custom Fields
    app.customFields.register(singleProduct);
    app.customFields.register(multipleProducts);

    // Brand Custom Fields
    app.customFields.register(singleBrand);
    app.customFields.register(multipleBrands);
  },
};
