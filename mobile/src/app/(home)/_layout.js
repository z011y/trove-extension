import { useContext, useEffect, useState } from 'react';
import { Stack } from 'expo-router/stack';
import Header from '../../components/Header';
import { CollectionProductsContext } from '../../context/collections';
import { CollectionModalContext } from '../../components/CollectionModal';

export default function HomeLayout() {
  const [isCollectionModalVisible, setIsCollectionModalVisible] =
    useState(false);
  const { getProductsAndCollections } = useContext(CollectionProductsContext);

  useEffect(() => {
    getProductsAndCollections();
  }, []);

  return (
    <CollectionModalContext.Provider
      value={{ isCollectionModalVisible, setIsCollectionModalVisible }}
    >
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            header: () => <Header />,
          }}
        />
        <Stack.Screen
          name="collections"
          options={{
            animation: 'fade',
            headerShown: false,
            gestureEnabled: true,
            presentation: 'transparentModal',
          }}
        />
        <Stack.Screen
          name="collection/[id]"
          options={{
            headerShown: false,
            gestureDirection: 'vertical',
            contentStyle: {
              backgroundColor: 'transparent',
            },
          }}
        />
        <Stack.Screen
          name="product/[id]"
          options={{
            headerShown: false,
            gestureEnabled: true,
            presentation: 'modal',
          }}
        />
      </Stack>
    </CollectionModalContext.Provider>
  );
}
