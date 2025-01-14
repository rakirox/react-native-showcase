import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import React, {useMemo, useRef, useState} from 'react';
import {FlatList, SafeAreaView, TouchableOpacity, View} from 'react-native';
import {
  ActionIcon,
  FilterButton,
  H2,
  Separator,
  Text,
  useTheme,
  ProductItem,
} from 'rn-theme-components';
import {
  Collection as CollectionType,
  Product,
  ProductVariant,
} from '../gql/graphql';

export type CollectionProps = {
  onFilterPress?: () => void;
  onSortPress?: () => void;
  onLayoutPress?: () => void;
  onProductPress?: (productId: string) => void;
  loading?: boolean;
  products?: ProductVariant[];
  title?: string;
};

type SortTypes =
  | 'Popular'
  | 'Newest'
  | 'Customer review'
  | 'Price: lowest to high'
  | 'Price: highest to low';

export default function Collection({
  onProductPress,
  loading = true,
  products = [],
  title,
}: CollectionProps) {
  const {sizes} = useTheme();
  const [layoutView, setLayoutView] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSort] = useState<SortTypes>('Popular');
  const bottomSheetRef = useRef<BottomSheet>(null);
  const onSortPress = () => {
    bottomSheetRef?.current?.expand();
  };
  const onLayoutPress = () => {
    setLayoutView(layoutView === 'grid' ? 'list' : 'grid');
  };
  const snapPoints = useMemo(() => ['30%', '50%'], []);

  return (
    <>
      <View style={{flex: 1}}>
        {/* <SafeAreaView> */}
        <H2
          style={{
            paddingHorizontal: sizes.global.padding,
          }}>
          {title}
        </H2>
        <FlatList
          contentContainerStyle={{
            padding: sizes.global.padding,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          horizontal
          data={[
            'T - shirt',
            'Crop tops',
            'Sleeveless',
            'Shirts',
            'Sleeveless 2',
          ]}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
            <FilterButton onButtonPress={() => {}} label={item} />
          )}
        />
        <View
          style={{
            // padding: sizes.global.padding,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <ActionIcon label="Filters" icon="filter" />
          <ActionIcon label={sortBy} icon="sort" onPress={onSortPress} />
          <ActionIcon icon={layoutView} onPress={onLayoutPress} />
        </View>
        <Separator />

        <FlatList<ProductVariant>
          key={`list-${layoutView}`}
          data={products}
          numColumns={layoutView === 'grid' ? 2 : 1}
          style={{}}
          contentContainerStyle={{
            alignItems: 'center',
            marginTop: sizes.s,
          }}
          renderItem={({item, index}) => {
            // TODO: this lists are temp, only for test needs
            // const productsList = [
            //   require('../assets/products/list/1.png'),
            //   require('../assets/products/list/2.png'),
            //   require('../assets/products/list/3.png'),
            //   require('../assets/products/list/4.png'),
            // ];
            // const productsGrid = [
            //   require('../assets/products/grid/1.png'),
            //   require('../assets/products/grid/2.png'),
            //   require('../assets/products/grid/2.png'),
            //   require('../assets/products/grid/1.png'),
            // ];
            // const productImage =
            //   layoutView === 'grid' ? productsGrid[index] : productsList[index];
            const assets = [];
            if (item?.assets) {
              assets.push(...item?.assets);
            }
            if (item.product?.assets) {
              assets.push(...item.product?.assets);
            }
            return (
              <ProductItem
                delayedTime={index * 200}
                productImage={assets[0]?.source}
                productLayoutType={layoutView}
                onProductPress={() => onProductPress?.(item.productId)}
                name={item.name}
                description={item.product.description}
                price={`${item.price}`}
              />
            );
          }}
        />
        {/* </SafeAreaView> */}
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        enablePanDownToClose
        index={-1}
        snapPoints={snapPoints}
        backdropComponent={BottomSheetBackdrop}
        style={{
          borderRadius: 34,
          borderColor: 'orange',
          overflow: 'hidden',
        }}>
        <BottomSheetView style={{paddingBottom: 10}}>
          <Text style={{alignSelf: 'center', fontWeight: '600'}}>Sort by</Text>
          <FlatList<SortTypes>
            style={{height: '100%'}}
            data={[
              'Popular',
              'Newest',
              'Customer review',
              'Price: lowest to high',
              'Price: highest to low',
            ]}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  setSort(item);
                  bottomSheetRef?.current?.close();
                }}>
                <Text
                  style={{
                    padding: sizes.global.padding,
                    fontWeight: '500',
                    backgroundColor:
                      sortBy === item ? '#DB3022' : 'transparent',
                    color: sortBy === item ? 'white' : 'black',
                  }}>
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          />
        </BottomSheetView>
      </BottomSheet>
    </>
  );
}
