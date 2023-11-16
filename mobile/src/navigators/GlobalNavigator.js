import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import { Coins, ShoppingBag, UserCircle } from 'phosphor-react-native';
import HomeNavigator from './HomeNavigator';
import HomeScreen from '../screens/HomeScreen';

const Tab = createBottomTabNavigator();

export default function GlobalNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: '#c4b8f3',
          position: 'absolute',
          height: 88
        }
      }}>
        <Tab.Screen name="Collections" component={HomeNavigator} options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => <Coins size="28" weight={focused ? 'fill' : 'regular'} color={focused ? '#20134B' : 'rgba(32, 19, 75, 0.6)'} />,
          tabBarLabelStyle: {
            fontFamily: 'Epilogue_700Bold',
            fontSize: 11
          },
          tabBarBackground: () => <BlurView intensity={100} style={StyleSheet.absoluteFill} />,
          tabBarActiveTintColor: '#20134B',
          tabBarInactiveTintColor: 'rgba(32, 19, 75, 0.6)'
        }} />
        <Tab.Screen name="Shop" component={HomeScreen} options={{
          tabBarIcon: ({ focused }) => <ShoppingBag size="28" weight={focused ? 'fill' : 'regular'} color={focused ? '#20134B' : 'rgba(32, 19, 75, 0.6)'} />,
          tabBarLabelStyle: {
            fontFamily: 'Epilogue_700Bold',
            fontSize: 11
          },
          tabBarActiveTintColor: '#20134B',
          tabBarInactiveTintColor: 'rgba(32, 19, 75, 0.6)'
        }} />
        <Tab.Screen name="Account" component={HomeScreen} options={{
          tabBarIcon: ({ focused }) => <UserCircle size="28" weight={focused ? 'fill' : 'regular'} color={focused ? '#20134B' : 'rgba(32, 19, 75, 0.6)'} />,
          tabBarLabelStyle: {
            fontFamily: 'Epilogue_700Bold',
            fontSize: 11
          },
          tabBarActiveTintColor: '#20134B',
          tabBarInactiveTintColor: 'rgba(32, 19, 75, 0.6)'
        }} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
