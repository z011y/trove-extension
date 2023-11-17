import { useContext, useEffect, useState } from 'react';
import { Stack } from 'expo-router/stack';
import Header from '../../components/Header';
import { CollectionProductsContext } from '../../context/collections';
import { CollectionModalActionsContext } from '../../components/CollectionModalActions';

export default function HomeLayout() {
  const [isCollectionModalActionsVisible, setIsCollectionModalActionsVisible] =
    useState(false);
  const { getProductsAndCollections } = useContext(CollectionProductsContext);

  useEffect(() => {
    getProductsAndCollections();
  }, []);

  return (
    <CollectionModalActionsContext.Provider
      value={{
        isCollectionModalActionsVisible,
        setIsCollectionModalActionsVisible,
      }}
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
    </CollectionModalActionsContext.Provider>
  );
}
