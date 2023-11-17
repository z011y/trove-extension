import { Tabs } from 'expo-router/tabs';
import { Coins, Storefront, UserCircle } from 'phosphor-react-native';
import { useState, useEffect, createContext } from 'react';
import {
  useFonts,
  Epilogue_400Regular,
  Epilogue_500Medium,
  Epilogue_700Bold,
} from '@expo-google-fonts/epilogue';
import { CollectionProductsProvider } from '../context/collections';
import {
  ActiveCollectionContext,
  ActiveCollectionProvider,
} from '../context/activeCollection';
import SignIn from '../components/SignIn';

export const SessionContext = createContext(null);

export default function AppLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Epilogue_400Regular,
    Epilogue_500Medium,
    Epilogue_700Bold,
  });
  const [session, setSession] = useState(null);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  if (!session) {
    return (
      <SessionContext.Provider value={{ session, setSession }}>
        <SignIn />
      </SessionContext.Provider>
    );
  }

  return (
    <SessionContext.Provider value={{ session, setSession }}>
      <CollectionProductsProvider>
        <ActiveCollectionProvider>
          <Tabs
            screenOptions={{
              tabBarStyle: {
                paddingTop: 16,
                borderTopWidth: 0,
                borderTopColor: 'transparent',
              },
              tabBarActiveTintColor: '#20134B',
              tabBarInactiveTintColor: '#8E8BA3',
              tabBarShowLabel: false,
            }}
          >
            <Tabs.Screen
              name="(home)"
              options={{
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                  <Coins
                    size="28"
                    weight={focused ? 'fill' : 'regular'}
                    color={focused ? '#20134B' : '#8E8BA3'}
                  />
                ),
              }}
            />
            <Tabs.Screen
              name="shop"
              options={{
                tabBarIcon: ({ focused }) => (
                  <Storefront
                    size="28"
                    weight={focused ? 'fill' : 'regular'}
                    color={focused ? '#20134B' : '#8E8BA3'}
                  />
                ),
              }}
            />
            <Tabs.Screen
              name="account"
              options={{
                tabBarIcon: ({ focused }) => (
                  <UserCircle
                    size="28"
                    weight={focused ? 'fill' : 'regular'}
                    color={focused ? '#20134B' : 'rgba(32, 19, 75, 0.6)'}
                  />
                ),
              }}
            />
          </Tabs>
        </ActiveCollectionProvider>
      </CollectionProductsProvider>
    </SessionContext.Provider>
  );
}
