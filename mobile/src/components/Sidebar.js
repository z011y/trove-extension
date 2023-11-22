import { useContext, useEffect } from 'react';
import { View } from 'react-native';
import { Heading } from './Text';
import { CollectionProductsContext } from '../context/collections';
import Button from './Button';
import { useNavigation } from 'expo-router';
import { ActiveCollectionContext } from '../context/activeCollection';
import { useDrawerStatus } from '@react-navigation/drawer';
import * as Haptics from 'expo-haptics';

export default function Sidebar({ navigation }) {
  const { collections } = useContext(CollectionProductsContext);
  const { activeCollection, setActiveCollection } = useContext(
    ActiveCollectionContext
  );
  const status = useDrawerStatus();

  useEffect(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }, [status]);

  return (
    <View
      style={{
        marginTop: 80,
        display: 'flex',
        gap: 16,
        padding: 16,
      }}
    >
      <Button
        title="All"
        variant={activeCollection === 0 ? 'primary' : 'secondary'}
        onPress={() => {
          setActiveCollection(0);
          navigation.closeDrawer();
        }}
      />
      {collections.map((collection, i) => (
        <Button
          title={collection?.name}
          variant={activeCollection === i + 1 ? 'primary' : 'secondary'}
          onPress={() => {
            setActiveCollection(i + 1);
            navigation.closeDrawer();
          }}
        />
      ))}
    </View>
  );
}
