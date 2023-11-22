import { Tabs } from 'expo-router/tabs';
import { useWindowDimensions } from 'react-native';
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
import SignIn, { SessionContext } from '../components/SignIn';
import { Drawer } from 'expo-router/drawer';
import Header from '../components/Header';
import { CollectionModalActionsContext } from '../components/CollectionModalActions';
import { CollectionModalAddContext } from '../components/CollectionModalAdd';
import { CollectionModalEditContext } from '../components/CollectionModalEdit';
import Sidebar from '../components/Sidebar';

export default function AppLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Epilogue_400Regular,
    Epilogue_500Medium,
    Epilogue_700Bold,
  });
  const [session, setSession] = useState(null);
  const [isCollectionModalActionsVisible, setIsCollectionModalActionsVisible] =
    useState(false);
  const [isCollectionModalAddVisible, setIsCollectionModalAddVisible] =
    useState(false);
  const [isCollectionModalEditVisible, setIsCollectionModalEditVisible] =
    useState(false);
  const { width } = useWindowDimensions();

  async function getSession() {
    const res = await fetch('http://10.0.0.139:3001/get-session');
    const data = await res.json();
    setSession(data.session);
  }

  useEffect(() => {
    getSession();
  }, []);

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
          <CollectionModalEditContext.Provider
            value={{
              isCollectionModalEditVisible,
              setIsCollectionModalEditVisible,
            }}
          >
            <CollectionModalActionsContext.Provider
              value={{
                isCollectionModalActionsVisible,
                setIsCollectionModalActionsVisible,
              }}
            >
              <CollectionModalAddContext.Provider
                value={{
                  isCollectionModalAddVisible,
                  setIsCollectionModalAddVisible,
                }}
              >
                <Drawer
                  drawerContent={({ navigation }) => (
                    <Sidebar navigation={navigation} />
                  )}
                  screenOptions={{
                    drawerStyle: {
                      width: width - 64,
                    },
                    overlayColor: 'rgba(0,0,0,0.1)',
                  }}
                >
                  <Drawer.Screen
                    name="(root)"
                    options={{
                      headerShown: false,
                    }}
                  />
                </Drawer>
              </CollectionModalAddContext.Provider>
            </CollectionModalActionsContext.Provider>
          </CollectionModalEditContext.Provider>
        </ActiveCollectionProvider>
      </CollectionProductsProvider>
    </SessionContext.Provider>
  );
}
