import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import {
  ActionIcon,
  FilterButton,
  H2,
  Separator,
  useTheme,
  ProductItem,
  CollectionHorizontalPreview,
  ProductType,
  PickerList,
  Text,
  H5,
  CircleColorOption,
  SmText,
  Icon,
  PickerColor,
  ColorType,
} from 'rn-theme-components';
import Animated, {
  FadeIn,
  runOnJS,
  SlideInLeft,
  SlideInRight,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import removeMd from 'remove-markdown';
import stc from 'string-to-color';

import {
  CollectionResult,
  FacetValue,
  ProductVariant,
  SearchResult,
} from '../gql/graphql';
import {priceExtractor} from '../tools';

export type CollectionProps = {
  onLoadMoreProducts?: () => void;
  onLayoutPress?: () => void;
  onSort?: (option: SortOption) => void;
  onFilter?: (filters: FacetValue[]) => void;
  onViewCollectionPress?: (collectionId: string) => void;
  onTitleToggle?: (isShowing: boolean) => void;
  onProductPress?: (productId: string) => void;
  loading?: boolean;
  products?: SearchResult[];
  title?: string;
  facets?: FacetValue[];
  collections?: CollectionResult[];
};

export type SortOption =
  | {
      label: 'Name: ASC';
      value: 'name-asc';
    }
  | {
      label: 'Name: DESC';
      value: 'name-desc';
    }
  | {
      label: 'Price: lowest to high';
      value: 'low-high';
    }
  | {
      label: 'Price: highest to low';
      value: 'high-low';
    };

export const sortOptions: SortOption[] = [
  {
    label: 'Name: ASC',
    value: 'name-asc',
  },
  {
    label: 'Name: DESC',
    value: 'name-desc',
  },
  {
    label: 'Price: lowest to high',
    value: 'low-high',
  },
  {
    label: 'Price: highest to low',
    value: 'high-low',
  },
];

const TITLE_HEIGHT = 48;

export default function Collection({
  loading = true,
  products = [],
  title,
  facets,
  collections,
  onTitleToggle,
  onProductPress,
  onLoadMoreProducts,
  onViewCollectionPress,
  onSort,
  onFilter,
}: CollectionProps) {
  const {sizes} = useTheme();
  const [layoutView, setLayoutView] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortOption] = useState<SortOption>(sortOptions[0]);
  const [filters, setFilters] = useState<FacetValue[]>([]);
  const [selectedColors, setSelectedColors] = useState<ColorType<FacetValue>[]>(
    [],
  );
  const [scroll, setScroll] = useState(0);
  const [isTitleVisible, setTitleVisible] = useState(true);
  const titleHeight = useSharedValue(TITLE_HEIGHT);

  const bottomSortSheetRef = useRef<BottomSheet>(null);
  const bottomFiltersSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ['30%', '50%'], []);
  const colors = useMemo<ColorType<FacetValue>[] | undefined>(() => {
    const result: ColorType<FacetValue>[] = [];
    facets
      ?.filter(facetValue => facetValue.facet.code === 'color')
      .forEach(facet => {
        if (!result.some(c => c.value.code === facet.code)) {
          result.push({
            color: stc(facet.code),
            value: facet,
          });
        }
      });
    return result;
  }, [facets]);

  const animatedTitleStyle = useAnimatedStyle(() => {
    return {
      height: titleHeight.value,
    };
  });
  const onSortPress = useCallback(() => {
    bottomSortSheetRef?.current?.expand();
  }, [bottomSortSheetRef]);
  const onLayoutPress = useCallback(() => {
    setLayoutView(layoutView === 'grid' ? 'list' : 'grid');
  }, [layoutView, setLayoutView]);
  const handleTitleRemove = useCallback(() => {
    titleHeight.value = withTiming(0, {duration: 500}, () => {
      runOnJS(setTitleVisible)(false);
      if (onTitleToggle) {
        runOnJS(onTitleToggle)(false);
      }
    });
  }, [titleHeight, setTitleVisible, onTitleToggle]);
  const handleTitleAdd = useCallback(() => {
    setTitleVisible(true);
    onTitleToggle?.(true);
    titleHeight.value = withDelay(
      600,
      withTiming(TITLE_HEIGHT, {duration: 500}),
    );
  }, [setTitleVisible, onTitleToggle, titleHeight]);
  const onFilterOpen = useCallback(() => {
    bottomFiltersSheetRef.current?.expand();
  }, []);

  const onFilterAction = (facet: FacetValue) => {
    const newFilters: FacetValue[] = [...filters];
    const index = newFilters.findIndex(f => f.id === facet.id);
    if (index > -1) {
      newFilters.splice(index, 1);
    } else {
      newFilters.push(facet);
    }
    setFilters(newFilters);
    onFilter?.(newFilters);
  };
  useEffect(() => {
    if (scroll > 100 && isTitleVisible) {
      handleTitleRemove();
    } else if (scroll < 100 && !isTitleVisible) {
      handleTitleAdd();
    }
  }, [scroll]);
  return (
    <>
      <View style={{flex: 1}}>
        {isTitleVisible && (
          <H2
            style={[
              {
                paddingHorizontal: sizes.global.padding,
                height: 48,
              },
              animatedTitleStyle,
            ]}>
            {title}
          </H2>
        )}

        <FlatList<FacetValue>
          style={{height: 70}}
          contentContainerStyle={{
            padding: sizes.global.padding,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          horizontal
          data={facets?.filter(fa => fa.facet.code === 'category')}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => `facet-group-${item.id}`}
          renderItem={({item, index}) => (
            <FilterButton
              entering={SlideInRight.delay(100 * index)}
              onButtonPress={() => onFilterAction(item)}
              label={item.code}
              selected={filters.some(f => f.code === item.code)}
            />
          )}
        />
        <Animated.View entering={FadeIn.delay(400)}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <ActionIcon label="Filters" icon="filter" onPress={onFilterOpen} />
            <ActionIcon
              label={sortBy.label}
              icon="sort"
              onPress={onSortPress}
            />
            <ActionIcon icon={layoutView} onPress={onLayoutPress} />
          </View>
        </Animated.View>
        <Separator style={{marginBottom: 0}} entering={FadeIn.delay(1000)} />

        <FlatList<SearchResult>
          onScroll={event => {
            setScroll(event.nativeEvent.contentOffset.y);
          }}
          key={`list-${layoutView}`}
          data={products}
          onEndReached={onLoadMoreProducts}
          numColumns={layoutView === 'grid' ? 2 : 1}
          contentContainerStyle={{
            alignItems: 'center',
            marginTop: sizes.s,
            minHeight: '100%',
          }}
          renderItem={({item, index}) => {
            return (
              <ProductItem
                delayedTime={index * 200}
                productImage={item?.productAsset?.preview}
                productLayoutType={layoutView}
                onProductPress={() => onProductPress?.(item.productId)}
                name={item.productName}
                description={item.description}
                price={priceExtractor(item.price)}
              />
            );
          }}
          ListFooterComponent={
            <FlatList<CollectionResult>
              data={collections}
              keyExtractor={col => col.collection.id}
              renderItem={({item}) => {
                return (
                  <CollectionHorizontalPreview
                    title={item.collection.name}
                    products={item.collection.productVariants.items.map(
                      (pVariant: ProductVariant) => {
                        const assets = [];
                        assets.push(
                          ...pVariant.assets,
                          ...pVariant.product.assets,
                        );
                        return {
                          id: pVariant.id,
                          title: pVariant.name,
                          description: pVariant.product.description,
                          price: pVariant.price,
                          productImage: assets[0]?.source,
                        } as ProductType;
                      },
                    )}
                    subtitle={removeMd(item.collection.description)}
                    actionButtonLabel="View all"
                    onuButtonPress={() => {
                      onViewCollectionPress?.(item.collection.id);
                    }}
                    onProductPress={onProductPress}
                  />
                );
              }}
            />
          }
        />
      </View>
      <BottomSheet
        ref={bottomSortSheetRef}
        enablePanDownToClose
        index={-1}
        snapPoints={snapPoints}
        backdropComponent={BottomSheetBackdrop}
        style={{
          borderRadius: 34,
          overflow: 'hidden',
        }}>
        <BottomSheetView style={{paddingBottom: 10}}>
          <PickerList
            onOptionSelected={option => {
              setSortOption(option as SortOption);
              bottomSortSheetRef.current?.close();
              onSort?.(option as SortOption);
            }}
            selected={sortBy.value}
            options={sortOptions}
          />
        </BottomSheetView>
      </BottomSheet>
      <BottomSheet
        enablePanDownToClose
        index={-1}
        snapPoints={snapPoints}
        ref={bottomFiltersSheetRef}
        backdropComponent={BottomSheetBackdrop}
        style={{
          borderRadius: 34,
          overflow: 'hidden',
        }}>
        <BottomSheetView style={{paddingBottom: 10}}>
          <View style={{padding: sizes.global.padding}}>
            <Text style={{alignSelf: 'center', fontWeight: '600'}}>
              Filters
            </Text>
            <PickerColor
              colors={colors}
              onColorPress={color => {
                const id = selectedColors.findIndex(
                  c => c.color === color.color,
                );
                const result: ColorType[] = [];
                onFilterAction(color.value as FacetValue);
                if (id >= 0) {
                  selectedColors.splice(id, 1);
                  result.push(...selectedColors);
                } else {
                  result.push(...selectedColors, color);
                }
                setSelectedColors(result);
              }}
              selectedColors={selectedColors}
            />
            {/* <PickerColor  /> */}
            <TouchableOpacity onPress={() => {}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: sizes.global.padding,
                }}>
                <View style={{flex: 1}}>
                  <H5>Brand</H5>
                  <SmText>addidas ....</SmText>
                </View>
                <Icon iconType="arrow-right" />
              </View>
            </TouchableOpacity>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </>
  );
}
