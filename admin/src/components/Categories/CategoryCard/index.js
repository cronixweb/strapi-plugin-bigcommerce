import PropTypes from 'prop-types';
import React from 'react';
import {
  Card,
  CardAsset,
  CardBody,
  CardCheckbox,
  CardContent,
  CardHeader,
  CardSubtitle,
  CardTitle,
} from '@strapi/design-system/Card';
import styled from 'styled-components';

const StyledCard = styled(Card)`
  cursor: pointer;
`;

const StyledCardContent = styled(CardContent)`
  width: 100%;
`;

const CategoryCard = ({selected, categoryId, title, image, onChange}) => {
  return (
    <StyledCard onClick={onChange}>
      <CardHeader>
        <CardCheckbox value={selected}/>
        <CardAsset src={image}/>
      </CardHeader>
      <CardBody>
        <StyledCardContent style={{width: '100%'}}>
          <CardTitle ellipsis>{title}</CardTitle>
          <CardSubtitle>ID: {categoryId}</CardSubtitle>
        </StyledCardContent>
      </CardBody>
    </StyledCard>
  );
};

CategoryCard.defaultProps = {
  selected: false,
};

CategoryCard.propTypes = {
  selected: PropTypes.bool,
  title: PropTypes.string.isRequired,
  image: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  categoryId: PropTypes.number.isRequired,
};

export default CategoryCard;
