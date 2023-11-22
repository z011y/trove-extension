import { Tabs } from 'expo-router/tabs';
import { Coins, Storefront, UserCircle } from 'phosphor-react-native';

export default function Root() {
  return (
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
  );
}
