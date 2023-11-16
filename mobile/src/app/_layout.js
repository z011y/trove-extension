import { Tabs } from 'expo-router/tabs';
import { Coins, Storefront, UserCircle } from 'phosphor-react-native';
import { useState, useEffect } from 'react';
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

export default function AppLayout() {
  // const [serifFontsLoaded, serifFontError] = useSerifFonts({
  //   Epilogue_400Regular,
  //   Epilogue_700Bold,
  // });
  // const [sansFontsLoaded, sansFontError] = useSansFonts({
  //   EpilogueSans_400Regular,
  //   EpilogueSans_700Bold,
  // });
  const [fontsLoaded, fontError] = useFonts({
    // Epilogue_400Regular,
    // Epilogue_400Regular,
    // Epilogue_700Bold
    Epilogue_400Regular,
    Epilogue_500Medium,
    Epilogue_700Bold,
  });
  const [sessionId, setSessionId] = useState(null);

  async function login() {
    const res = await fetch('http://192.168.1.6:3001/sign-in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'cameron.ntc@gmail.com',
        password: '17N1kk1TRoVE__0111',
      }),
    });
    const data = await res.json();
    setSessionId(data.user.id);
  }

  useEffect(() => {
    login();
  }, []);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
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
  );
}
