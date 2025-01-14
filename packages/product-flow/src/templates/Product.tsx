import React from 'react';
import {FlatList, Image, ScrollView, View} from 'react-native';
import {
  SmText,
  Stars,
  H4,
  useTheme,
  CollectionHorizontalPreview,
  PsmText,
  Button,
  SectionDetail,
  Text,
  Icon,
  Favorite,
} from 'rn-theme-components';

export type ProductProps = {
  assets: string[];
  title?: string;
  price?: string;
  name?: string;
  description?: string;
};

export default function Product({
  assets,
  title,
  price,
  name,
  description,
}: ProductProps) {
  const {sizes} = useTheme();
  return (
    <>
      <ScrollView contentContainerStyle={{paddingBottom: 100}}>
        <FlatList
          data={assets}
          renderItem={({item}) => {
            return (
              <Image source={{uri: item}} style={{width: 275, height: 413}} />
            );
          }}
          horizontal
        />

        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <View
            style={{
              flex: 2,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                borderWidth: 1,
                borderRadius: 8,
                borderColor: '#9B9B9B',
                padding: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                minWidth: 130,
              }}>
              <Text>Size</Text>
              <Icon type="dropdown" />
            </View>
          </View>
          <View
            style={{
              flex: 2,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                borderWidth: 1,
                borderRadius: 8,
                borderColor: '#9B9B9B',
                padding: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                minWidth: 130,
              }}>
              <Text>Size</Text>
              <Icon type="dropdown" />
            </View>
          </View>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Favorite />
          </View>
        </View>

        <View style={{padding: sizes.global.padding}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <H4>{title}</H4>
            <H4>{price}</H4>
          </View>
          <SmText>{name}</SmText>
          <Stars style={{paddingVertical: sizes.s}} />
          <PsmText>{description}</PsmText>
        </View>
        <View style={{padding: sizes.global.padding}}>
          <Button
            label="ADD TO CART"
            onPress={() => console.log('asd')}
            style={{width: '100%', height: 48}}
          />
        </View>
        <FlatList
          ItemSeparatorComponent={() => (
            <View
              style={{width: '100%', height: 0.4, backgroundColor: '#9B9B9B'}}
            />
          )}
          ListHeaderComponent={() => (
            <View
              style={{width: '100%', height: 0.4, backgroundColor: '#9B9B9B'}}
            />
          )}
          data={['Shipping Info', 'Support']}
          renderItem={({item}) => <SectionDetail title={item} />}
        />
        <CollectionHorizontalPreview
          productImage={require('../assets/product.png')}
          title="You can also like this"
          actionButtonLabel="12 items"
          onuButtonPress={() => console.log('navigating to somewhere')}
        />
      </ScrollView>
    </>
  );
}
