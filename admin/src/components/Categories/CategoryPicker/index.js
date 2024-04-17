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
import CategoryCard from '../CategoryCard';
import {useBigCommerceFields} from '../../../contexts/BigCommerceFields';

const CategoryPicker = ({multiple}) => {
  const {
    togglePicker,
    categories,
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
                ? getTrad('components.CategoryPicker.pick-categories')
                : getTrad('components.CategoryPicker.pick-category')
            }
            defaultMessage={multiple ? 'Pick your BigCommerce categories' : 'Pick your BigCommerce category'}
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
              {categories.map((category) => (
                <GridItem key={category.id} col={3}>
                  <CategoryCard
                    selected={isSelected(category)}
                    onChange={() => handleChange(category)}
                    title={category.name}
                    image={category.image_url}
                    categoryId={category.id}
                  />
                </GridItem>
              ))}
            </Grid>
            {hasNextPage && (
              <Stack marginTop={6} horizontal justifyContent="center">
                <Button variant="tertiary" onClick={fetchNextPage}>
                  <FormattedMessage
                    id={getTrad('onents.CategoryPicker.load-more')}
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
              id={getTrad('onents.CategoryPicker.last-updated')}
              defaultMessage="Last updated at {updatedAt, time, short} on {updatedAt, date, long}"
              values={{updatedAt: new Date(dataUpdatedAt)}}
            />
          </Typography>
        }
        endActions={
          <Stack horizontal spacing={2}>
            <Button variant="secondary" onClick={refetch} disabled={loading}>
              <FormattedMessage
                id={getTrad('onents.CategoryPicker.refresh')}
                defaultMessage="Refresh categories"
              />
            </Button>
            <Button onClick={togglePicker}>
              <FormattedMessage
                id={getTrad('onents.CategoryPicker.finish')}
                defaultMessage="Finish"
              />
            </Button>
          </Stack>
        }
      />
    </ModalLayout>
  );
};

CategoryPicker.propTypes = {
  multiple: PropTypes.bool,
};

export default CategoryPicker;
