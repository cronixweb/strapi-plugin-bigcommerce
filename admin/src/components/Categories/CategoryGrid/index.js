import React from 'react';
import {GridItem} from '@strapi/design-system/Grid';
import {Button} from '@strapi/design-system/Button';
import {Typography} from '@strapi/design-system/Typography';
import styled from 'styled-components';
import {FormattedMessage} from 'react-intl';
import getTrad from '../../../utils/getTrad';
import {useBigCommerceFields} from '../../../contexts/BigCommerceFields';
import {BaseCheckbox, Stack, Table, Tbody, Td, Th, Thead, Tr, VisuallyHidden} from "@strapi/design-system";

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
    fetchNextPage,
  } = useBigCommerceFields();

  const sortedCategories = sortCategories(categories);

  return <div style={{height: '26rem', overflow: 'auto'}}>
    <Table colCount={1} rowCount={1}>
      <Thead>
        <Tr>
          <Th>
            <VisuallyHidden>Actions</VisuallyHidden>
          </Th>
          <Th>
            <Typography variant="sigma">ID</Typography>
          </Th>
          <Th>
            <Typography variant="sigma">Name</Typography>
          </Th>
          <Th>
            <Typography variant="sigma">URL</Typography>
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {categories.map(entry => <Tr key={entry.id}>
          <Td>
            <BaseCheckbox value={isSelected(entry)}
                          onValueChange={() => {
                            handleChange(entry)
                          }}
                          name={`category_${entry.id}`}
                          aria-label={`Select ${entry.name}`}/>
          </Td>
          <Td>
            <Typography textColor="neutral800">{entry.id}</Typography>
          </Td>
          <Td>
            <Typography textColor="neutral800">{entry.name}</Typography>
          </Td>
          <Td>
            <Typography textColor="neutral800">{entry.custom_url?.url}</Typography>
          </Td>
        </Tr>)}
      </Tbody>
    </Table>
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
  </div>
};

export default CategoryGrid;
