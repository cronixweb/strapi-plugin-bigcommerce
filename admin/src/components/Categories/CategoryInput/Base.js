import React, {useCallback, useState} from 'react';
import PropTypes from 'prop-types';
import {Button} from '@strapi/design-system/Button';
import styled from 'styled-components';
import getTrad from '../../../utils/getTrad';
import {FormattedMessage} from 'react-intl';
import {Stack} from '@strapi/design-system/Stack';
import {Typography} from '@strapi/design-system/Typography';
import {request} from '@strapi/helper-plugin';
import pluginId from '../../../pluginId';
import {useInfiniteQuery} from 'react-query';
import {Loader} from '@strapi/design-system/Loader';
import {get, uniqBy} from 'lodash';
import {Box} from '@strapi/design-system/Box';
import BigCommerceFieldsContext from '../../../contexts/BigCommerceFields';
import CategoryGrid from "../CategoryGrid";
import CategoryPicker from "../CategoryPicker";

const Content = styled(Stack)`
  min-height: 13.875rem;
`;

const Callout = styled(Stack)`
  border-radius: 4px;
  padding: 1rem;
  border: 1px solid ${({theme, variant}) =>
    variant === 'error' ? theme.colors.danger200 : theme.colors.warning200};
  background-color: ${({theme, variant}) =>
    variant === 'error' ? theme.colors.danger100 : theme.colors.warning100};
`;

const Input = ({name, multiple, attribute, onChange, value, error}) => {
  const [pickerOpen, setPickerOpen] = useState(false);

  const fetchCategories = async (pageParam) => {
    if (pageParam) return await request(`/${pluginId}/categories`, {params: pageParam});
    else
      return await request(`/${pluginId}/categories`, {
        params: {
          ...attribute.options,
          limit: 12,
          include_fields: Array.from(
            new Set([...get(attribute, 'options.fields', []), 'id', 'name', 'image_url'])
          ),
        },
      });
  };

  const {
    data,
    isLoading,
    isRefetching,
    isError,
    isSuccess,
    hasNextPage,
    dataUpdatedAt,
    refetch,
    fetchNextPage,
  } = useInfiniteQuery(
    [pluginId, 'categories', JSON.stringify(attribute.options)],
    ({pageParam}) => fetchCategories(pageParam),
    {
      getNextPageParam: (lastPage) => get(lastPage, 'meta.pagination.nextPage'),
      initialData: {pages: [{data: value}]},
    }
  );

  const loading = isLoading || isRefetching;
  const formattedValue = value ? JSON.parse(value) : null;
  const previewAmount = 3;

  const categories = uniqBy(
    data.pages
      .map((page) => page.data)
      .flat()
      .filter(Boolean),
    (category) => category.id
  );

  const sortCategories = useCallback(
    (categories) =>
      categories.reduce((sp, category, index) => {
        if (Array.isArray(formattedValue))
          return formattedValue?.find((p) => p.id === category.id) && index >= previewAmount
            ? [category, ...sp]
            : [...sp, category];
        else
          return category.id === formattedValue?.id && index >= previewAmount
            ? [category, ...sp]
            : [...sp, category];
      }, []),
    [formattedValue]
  );

  const togglePicker = () => setPickerOpen((prev) => !prev);

  const isSelected = (category) => {
    if (multiple) return formattedValue?.some((p) => p.id === category.id);
    else return formattedValue?.id === category.id;
  };

  const handleChange = (category) => {
    console.log(attribute);
    if (multiple)
      value = JSON.stringify(
        !formattedValue || !formattedValue.find((p) => p.id === category.id)
          ? [...(formattedValue || []), _.pick(category, attribute?.options?.fields, 'id')]
          : formattedValue.filter((p) => p.id !== category.id),
        null,
        2
      );
    else
      value =
        !formattedValue || formattedValue.id !== category.id
          ? JSON.stringify(_.pick(category, attribute?.options?.fields, 'id'), null, 2)
          : null;

    onChange({
      target: {
        name,
        value: value === '[]' ? null : value,
        type: 'json',
      },
    });
  };

  return (
    <BigCommerceFieldsContext.Provider
      value={{
        handleChange,
        togglePicker,
        refetch,
        fetchNextPage,
        isSelected,
        sortCategories,
        hasNextPage,
        value,
        dataUpdatedAt,
        loading,
        isError,
        isSuccess,
        categories,
        formattedValue,
        previewAmount,
      }}
    >
      <Stack>
        <Stack horizontal justifyContent="space-between">
          <Typography variant="pi" fontWeight="bold">
            {name}
          </Typography>
          <Button variant="secondary" small disabled={loading} onClick={refetch}>
            <FormattedMessage id={getTrad('components.Input.refresh')} defaultMessage="Refresh"/>
          </Button>
        </Stack>
        <Content paddingTop={1} alignItems="stretch" justifyContent="center">
          {loading && (
            <Stack grow="1" justifyContent="center" alignItems="center">
              <Loader small>
                <FormattedMessage
                  id={getTrad('components.Input.loading')}
                  defaultMessage="Loading"
                />
              </Loader>
            </Stack>
          )}
          {!loading && isError && (
            <Callout variant="error" justifyContent="center" alignItems="center" gap={4}>
              <Typography variant="omega" textColor="danger600">
                <FormattedMessage
                  id={getTrad('components.Input.fetchError')}
                  defaultMessage="Could not fetch categories from BigCommerce"
                />
              </Typography>
              <Button variant="danger-light" onClick={refetch}>
                <FormattedMessage
                  id={getTrad('components.Input.refresh')}
                  defaultMessage="Refresh"
                />
              </Button>
            </Callout>
          )}
          {!loading &&
            isSuccess &&
            (categories.length > 0 ? (
              <CategoryGrid
                categories={categories}
                selectedCategories={value}
                onChange={handleChange}
                onViewMore={() => setPickerOpen(true)}
                canViewMore={hasNextPage}
              />
            ) : (
              <Callout grow={1} variant="empty" justifyContent="center" alignItems="center" gap={4}>
                <Typography variant="omega" textColor="warning600">
                  <FormattedMessage
                    id={getTrad('components.Input.empty')}
                    defaultMessage="No categories found"
                  />
                </Typography>
              </Callout>
            ))}
        </Content>
        <Box paddingTop={2}>
          <Typography variant="pi" textColor="danger600">
            {error}
          </Typography>
        </Box>
      </Stack>
      {pickerOpen && <CategoryPicker multiple={multiple}/>}
    </BigCommerceFieldsContext.Provider>
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  multiple: PropTypes.bool,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      image: PropTypes.string,
    })
  ),
};

export default Input;
