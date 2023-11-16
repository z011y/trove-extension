import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Header from '../components/Header';
import HomeScreen from '../screens/HomeScreen';
import CollectionsModal from '../screens/CollectionsModal';

const Stack = createNativeStackNavigator();

export default function HomeNavigator({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Your Trove" component={HomeScreen} options={{
        headerTransparent: true,
        header: () => <Header navigation={navigation} />,
        headerStyle: {
          position: 'absolute',
          height: 128
        },
        headerTitleStyle: {
          fontFamily: 'Epilogue_700Bold',
        }
      }} />
      <Stack.Screen name="CollectionsModal" component={CollectionsModal} options={{
        presentation: 'modal'
      }} />
    </Stack.Navigator>
  );
}
