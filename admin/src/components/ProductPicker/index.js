import {ModalBody, ModalFooter, ModalHeader, ModalLayout,} from '@strapi/design-system/ModalLayout';
import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import {FormattedMessage} from 'react-intl';
import {Typography} from '@strapi/design-system/Typography';
import getTrad from '../../utils/getTrad';
import {Grid, GridItem} from '@strapi/design-system/Grid';
import {Stack} from '@strapi/design-system/Stack';
import {Loader} from '@strapi/design-system/Loader';
import {Button} from '@strapi/design-system/Button';
import {Searchbar} from '@strapi/design-system';
import ProductCard from '../ProductCard';
import {useBigCommerceFields} from '../../contexts/BigCommerceFields';

const ProductPicker = ({multiple}) => {
  const {
    togglePicker,
    products,
    handleChange,
    fetchNextPage,
    dataUpdatedAt,
    refetch,
    hasNextPage,
    isSelected,
    loading,
    searchQuery,
    setSearchQuery
  } = useBigCommerceFields();

  const [firstOpen, setFirstOpen] = useState(true);

  useEffect(() => {
    if (!firstOpen) {
      const delayDebounceFn = setTimeout(() => {
        refetch();
      }, 1000);

      return () => clearTimeout(delayDebounceFn);
    } else {
      setFirstOpen(false);
    }
  }, [searchQuery]);

  return (
    <ModalLayout onClose={togglePicker} labelledBy="title">
      <ModalHeader>
        <Typography variant="omega" fontWeight="bold" id="title">
          <FormattedMessage
            id={
              multiple
                ? getTrad('components.ProductPicker.pick-products')
                : getTrad('components.ProductPicker.pick-product')
            }
            defaultMessage={multiple ? 'Pick your BigCommerce products' : 'Pick your BigCommerce product'}
          />
        </Typography>
      </ModalHeader>
      <ModalBody style={{minHeight: '60vh'}}>
        {loading ? (
          <Stack
            alignItems="center"
            justifyContent="center"
            style={{height: 'calc(60vh - 64px)'}}
          >
            <Loader/>
          </Stack>
        ) : (
          <>
            <Searchbar name="searchbar" value={searchQuery} onClear={() => setSearchQuery('')}
                       onChange={e => setSearchQuery(e.target.value)} placeholder="Search products">
            </Searchbar>
            <br/>
            <Grid gap={2}>
              {products.map((product) => (
                <GridItem key={product.id} col={3}>
                  <ProductCard
                    selected={isSelected(product)}
                    onChange={() => handleChange(product)}
                    title={product.name}
                    image={product.images?.[0]?.url_thumbnail}
                    productId={product.id}
                  />
                </GridItem>
              ))}
            </Grid>
            {hasNextPage && (
              <Stack marginTop={6} horizontal justifyContent="center">
                <Button variant="tertiary" onClick={fetchNextPage}>
                  <FormattedMessage
                    id={getTrad('onents.ProductPicker.load-more')}
                    defaultMessage="Load more"
                  />
                </Button>
              </Stack>
            )}
          </>
        )}
      </ModalBody>
      <ModalFooter
        startActions={
          <Typography variant="pi">
            <FormattedMessage
              id={getTrad('onents.ProductPicker.last-updated')}
              defaultMessage="Last updated at {updatedAt, time, short} on {updatedAt, date, long}"
              values={{updatedAt: new Date(dataUpdatedAt)}}
            />
          </Typography>
        }
        endActions={
          <Stack horizontal spacing={2}>
            <Button variant="secondary" onClick={refetch} disabled={loading}>
              <FormattedMessage
                id={getTrad('onents.ProductPicker.refresh')}
                defaultMessage="Refresh products"
              />
            </Button>
            <Button onClick={togglePicker}>
              <FormattedMessage
                id={getTrad('onents.ProductPicker.finish')}
                defaultMessage="Finish"
              />
            </Button>
          </Stack>
        }
      />
    </ModalLayout>
  );
};

ProductPicker.propTypes = {
  multiple: PropTypes.bool,
};

export default ProductPicker;
