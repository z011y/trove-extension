import { useContext, useEffect, useState } from 'react';
import { Stack } from 'expo-router/stack';
import { Drawer } from 'expo-router/drawer';
import Header from '../../../components/Header';
import { CollectionProductsContext } from '../../../context/collections';

export default function HomeLayout() {
  const { getProductsAndCollections } = useContext(CollectionProductsContext);

  useEffect(() => {
    getProductsAndCollections();
  }, []);

  return (
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
        name="product/[id]"
        options={{
          headerShown: false,
          gestureEnabled: true,
          presentation: 'modal',
        }}
      />
    </Stack>
  );
}
