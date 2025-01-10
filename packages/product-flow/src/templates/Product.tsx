import React from 'react';
import {FlatList, Image, SafeAreaView, ScrollView, View} from 'react-native';
import {
  Navbar,
  SmText,
  Stars,
  H4,
  useTheme,
  CollectionHorizontalPreview,
  PsmText,
  Button,
  SectionDetail,
} from 'rn-theme-components';

export type ProductProps = {};

export default function Product({}: ProductProps) {
  const {sizes} = useTheme();
  return (
    <>
      <ScrollView contentContainerStyle={{paddingBottom: 100}}>
        <FlatList
          data={[
            require('../assets/products/detail/1.png'),
            require('../assets/products/detail/2.png'),
          ]}
          renderItem={({item}) => {
            return <Image source={item} />;
          }}
          horizontal
        />
        <View style={{padding: sizes.global.padding}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <H4>H&M</H4>
            <H4>$19.99</H4>
          </View>
          <SmText>Short black dress</SmText>
          <Stars style={{paddingVertical: sizes.s}} />
          <PsmText>
            Short dress in soft cotton jersey with decorative buttons down the
            front and a wide, frill-trimmed
          </PsmText>
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
          // ListFooterComponent={() => (
          //   <View
          //     style={{width: '100%', height: 0.4, backgroundColor: '#9B9B9B'}}
          //   />
          // )}
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
