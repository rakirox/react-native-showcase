import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {FlatList, View} from 'react-native';
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
} from 'rn-theme-components';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import removeMd from 'remove-markdown';
import {
  CollectionResult,
  FacetValueFilterInput,
  FacetValueResult,
  ProductVariant,
  SearchResult,
} from '../gql/graphql';
import {priceExtractor} from '../tools';

export type CollectionProps = {
  onLoadMoreProducts?: () => void;
  onLayoutPress?: () => void;
  onSort?: (option: SortOption) => void;
  onFilter?: (filters: FacetValueResult[]) => void;
  onViewCollectionPress?: (collectionId: string) => void;
  onTitleToggle?: (isShowing: boolean) => void;
  onProductPress?: (productId: string) => void;
  loading?: boolean;
  products?: SearchResult[];
  title?: string;
  facets?: FacetValueResult[];
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
const FILTERS_HEIGHT = 54;

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
  const [filters, setFilters] = useState<FacetValueResult[]>([]);
  // const [filters, setFilters] = useState<>([]);
  const [scroll, setScroll] = useState(0);
  const [isTitleVisible, setTitleVisible] = useState(true);
  const [isFiltersVisible, setFiltersVisible] = useState(true);
  const titleHeight = useSharedValue(TITLE_HEIGHT);
  const filtersHeight = useSharedValue(FILTERS_HEIGHT);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['30%', '50%'], []);
  const animatedTitleStyle = useAnimatedStyle(() => {
    return {
      height: titleHeight.value,
    };
  });
  const animatedFiltersStyle = useAnimatedStyle(() => {
    return {
      height: filtersHeight.value,
    };
  });
  const onSortPress = useCallback(() => {
    bottomSheetRef?.current?.expand();
  }, [bottomSheetRef]);
  const onLayoutPress = useCallback(() => {
    setLayoutView(layoutView === 'grid' ? 'list' : 'grid');
  }, [layoutView, setLayoutView]);
  const handleFiltersRemove = useCallback(() => {
    filtersHeight.value = withTiming(0, {duration: 500}, () => {
      runOnJS(setFiltersVisible)(false);
    });
  }, [filtersHeight, setFiltersVisible]);
  const handleFiltersAdd = useCallback(() => {
    setFiltersVisible(true);
    filtersHeight.value = withTiming(FILTERS_HEIGHT, {duration: 500});
  }, [setFiltersVisible]);

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
  const onToggleFilters = useCallback(() => {
    if (isFiltersVisible) {
      handleFiltersRemove();
    } else {
      handleFiltersAdd();
    }
  }, [handleFiltersRemove, handleFiltersAdd, isFiltersVisible]);
  const onFilterAction = (facet: FacetValueResult) => {
    const newFilters: FacetValueResult[] = [...filters];
    const index = newFilters.findIndex(
      f => f.facetValue.id === facet.facetValue.id,
    );
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
        {isFiltersVisible && (
          <Animated.View style={animatedFiltersStyle}>
            <FlatList<FacetValueResult>
              contentContainerStyle={{
                padding: sizes.global.padding,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              horizontal
              data={facets}
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => (
                <FilterButton
                  onButtonPress={() => onFilterAction(item)}
                  label={item.facetValue.code}
                />
              )}
            />
          </Animated.View>
        )}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <ActionIcon label="Filters" icon="filter" onPress={onToggleFilters} />
          <ActionIcon label={sortBy.label} icon="sort" onPress={onSortPress} />
          <ActionIcon icon={layoutView} onPress={onLayoutPress} />
        </View>
        <Separator />

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
          <PickerList
            onOptionSelected={option => {
              setSortOption(option as SortOption);
              bottomSheetRef.current?.close();
              onSort?.(option as SortOption);
            }}
            selected={sortBy.value}
            options={sortOptions}
          />
        </BottomSheetView>
      </BottomSheet>
    </>
  );
}
