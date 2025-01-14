import React from 'react';
import {ImageSourcePropType} from 'react-native';
import ProductListItem from './ProductListItem';
import ProductGridItem from './ProductGridItem';

export type ProductItemProps = {
  productImage?: string;
  delayedTime?: number;
  onProductPress?: () => void;
  name?: string;
  description?: string;
  price?: string;
};

export interface ProductItemTypeProps extends ProductItemProps {
  productLayoutType?: 'list' | 'grid';
}

export default function ProductItem({
  productImage,
  productLayoutType = 'list',
  delayedTime = 0,
  ...props
}: ProductItemTypeProps) {
  return productLayoutType === 'list' ? (
    <ProductListItem
      productImage={productImage}
      delayedTime={delayedTime}
      {...props}
    />
  ) : (
    <ProductGridItem
      productImage={productImage}
      delayedTime={delayedTime}
      {...props}
    />
  );
}
