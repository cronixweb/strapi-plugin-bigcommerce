import React from 'react';
import BrandCard from '../BrandCard';
import {Grid, GridItem} from '@strapi/design-system/Grid';
import {Button} from '@strapi/design-system/Button';
import {Typography} from '@strapi/design-system/Typography';
import styled from 'styled-components';
import {FormattedMessage} from 'react-intl';
import getTrad from '../../../utils/getTrad';
import {useBigCommerceFields} from '../../../contexts/BigCommerceFields';

const ViewMoreGridItem = styled(GridItem)`
  height: 100%;
`;

const ViewMoreButton = styled(Button)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  div {
    height: 100%;
  }

  span {
    display: block;
  }

  ${Typography} {
    font-weight: 400;
  }
`;

const BrandGrid = () => {
  const {
    brands,
    sortBrands,
    isSelected,
    togglePicker,
    hasNextPage,
    handleChange,
    previewAmount,
    formattedValue,
  } = useBigCommerceFields();

  const sortedBrands = sortBrands(brands);

  return (
    <Grid gap={2}>
      {sortedBrands.slice(0, 3).map((brand) => (
        <GridItem key={brand.id} col={3}>
          <BrandCard
            onChange={() => handleChange(brand)}
            selected={isSelected(brand)}
            title={brand.name}
            image={brand.image_url}
            brandId={brand.id}
          />
        </GridItem>
      ))}
      {(brands.length > 3 || hasNextPage) && (
        <ViewMoreGridItem col={3}>
          <ViewMoreButton variant="tertiary" onClick={togglePicker}>
            <span>
              <FormattedMessage
                id={getTrad('components.BrandGrid.view-more')}
                defaultMessage="View more"
              />
            </span>
            <Typography variant="pi" textColor="neutral300">
              {formattedValue?.length > previewAmount && (
                <Typography variant="pi" textColor="neutral300">
                  <FormattedMessage
                    id="components.BrandGrid.moreSelected"
                    defaultMessage="{amount} more selected"
                    values={{amount: formattedValue.length - previewAmount}}
                  />
                </Typography>
              )}
            </Typography>
          </ViewMoreButton>
        </ViewMoreGridItem>
      )}
    </Grid>
  );
};

export default BrandGrid;
