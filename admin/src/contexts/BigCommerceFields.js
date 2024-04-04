import {createContext, useContext} from 'react';

const BigCommerceFieldsContext = createContext();

export const useBigCommerceFields = () => useContext(BigCommerceFieldsContext);
export default BigCommerceFieldsContext;
