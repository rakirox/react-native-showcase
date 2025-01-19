import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type StoreType = {
  bears: number;
  increasePopulation: () => void;
  removeAllbears: () => void;
};

const useProductStore = create(
  persist(
    set => ({
      bears: 0,
      increasePopulation: () =>
        set((state: StoreType) => ({bears: state.bears + 1})),
      removeAllBears: () => set({bears: 0}),
    }),
    {
      name: 'product-storage', // unique name
      getStorage: () => AsyncStorage, // Add this here!
    },
  ),
);

export default useProductStore;
