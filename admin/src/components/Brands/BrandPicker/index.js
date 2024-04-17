import {ModalBody, ModalFooter, ModalHeader, ModalLayout,} from '@strapi/design-system/ModalLayout';
import PropTypes from 'prop-types';
import React from 'react';
import {FormattedMessage} from 'react-intl';
import {Typography} from '@strapi/design-system/Typography';
import getTrad from '../../../utils/getTrad';
import {Grid, GridItem} from '@strapi/design-system/Grid';
import {Stack} from '@strapi/design-system/Stack';
import {Loader} from '@strapi/design-system/Loader';
import {Button} from '@strapi/design-system/Button';
import BrandCard from '../BrandCard';
import {useBigCommerceFields} from '../../../contexts/BigCommerceFields';

const BrandPicker = ({multiple}) => {
  const {
    togglePicker,
    brands,
    handleChange,
    fetchNextPage,
    dataUpdatedAt,
    refetch,
    hasNextPage,
    isSelected,
    loading,
  } = useBigCommerceFields();

  return (
    <ModalLayout onClose={togglePicker} labelledBy="title">
      <ModalHeader>
        <Typography variant="omega" fontWeight="bold" id="title">
          <FormattedMessage
            id={
              multiple
                ? getTrad('components.BrandPicker.pick-brands')
                : getTrad('components.BrandPicker.pick-brand')
            }
            defaultMessage={multiple ? 'Pick your BigCommerce brands' : 'Pick your BigCommerce brand'}
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
            <Grid gap={2}>
              {brands.map((brand) => (
                <GridItem key={brand.id} col={3}>
                  <BrandCard
                    selected={isSelected(brand)}
                    onChange={() => handleChange(brand)}
                    title={brand.name}
                    image={brand.image_url}
                    brandId={brand.id}
                  />
                </GridItem>
              ))}
            </Grid>
            {hasNextPage && (
              <Stack marginTop={6} horizontal justifyContent="center">
                <Button variant="tertiary" onClick={fetchNextPage}>
                  <FormattedMessage
                    id={getTrad('onents.BrandPicker.load-more')}
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
              id={getTrad('onents.BrandPicker.last-updated')}
              defaultMessage="Last updated at {updatedAt, time, short} on {updatedAt, date, long}"
              values={{updatedAt: new Date(dataUpdatedAt)}}
            />
          </Typography>
        }
        endActions={
          <Stack horizontal spacing={2}>
            <Button variant="secondary" onClick={refetch} disabled={loading}>
              <FormattedMessage
                id={getTrad('onents.BrandPicker.refresh')}
                defaultMessage="Refresh brands"
              />
            </Button>
            <Button onClick={togglePicker}>
              <FormattedMessage
                id={getTrad('onents.BrandPicker.finish')}
                defaultMessage="Finish"
              />
            </Button>
          </Stack>
        }
      />
    </ModalLayout>
  );
};

BrandPicker.propTypes = {
  multiple: PropTypes.bool,
};

export default BrandPicker;
