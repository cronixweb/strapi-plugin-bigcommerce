import React from 'react';
import CategoryCard from '../CategoryCard';
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

const CategoryGrid = () => {
  const {
    categories,
    sortCategories,
    isSelected,
    togglePicker,
    hasNextPage,
    handleChange,
    previewAmount,
    formattedValue,
  } = useBigCommerceFields();

  const sortedCategories = sortCategories(categories);

  return (
    <Grid gap={2}>
      {sortedCategories.slice(0, 3).map((category) => (
        <GridItem key={category.id} col={3}>
          <CategoryCard
            onChange={() => handleChange(category)}
            selected={isSelected(category)}
            title={category.name}
            image={category.image_url}
            categoryId={category.id}
          />
        </GridItem>
      ))}
      {(categories.length > 3 || hasNextPage) && (
        <ViewMoreGridItem col={3}>
          <ViewMoreButton variant="tertiary" onClick={togglePicker}>
            <span>
              <FormattedMessage
                id={getTrad('components.CategoryGrid.view-more')}
                defaultMessage="View more"
              />
            </span>
            <Typography variant="pi" textColor="neutral300">
              {formattedValue?.length > previewAmount && (
                <Typography variant="pi" textColor="neutral300">
                  <FormattedMessage
                    id="components.CategoryGrid.moreSelected"
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

export default CategoryGrid;
