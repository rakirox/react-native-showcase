/**
 * @format
 */

// import {AppRegistry} from 'react-native';
// import App from './App';
// import {name as appName} from './app.json';

// AppRegistry.registerComponent(appName, () => App);

// const useProductStore = create(set => ({
//   bears: 0,
//   increasePopulation: () => set(state => ({bears: state.bears + 1})),
//   removeAllBears: () => set({bears: 0}),
// }));

export {default as useProductStore} from './src/state';
export {default as HomeProducts} from './src/templates/HomeProducts';
export {default as Collection} from './src/templates/Collection';
export {default as Product} from './src/templates/Product';
export {
  default as ProductStack,
  ProductStackParamList,
  HomeParams,
} from './src/navigation/ProductStack';
