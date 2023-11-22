import { useState, useContext, createContext } from 'react';
import { View, useWindowDimensions } from 'react-native';
import Input from './Input';
import { Heading } from './Text';
import SwipeableModal from './SwipableModal';
import Button from './Button';
import * as Haptics from 'expo-haptics';
import { CollectionProductsContext } from '../context/collections';

export const CollectionModalAddContext = createContext(null);

export default function CollectionModalAdd() {
  const { isCollectionModalAddVisible, setIsCollectionModalAddVisible } =
    useContext(CollectionModalAddContext);
  const { getProductsAndCollections } = useContext(CollectionProductsContext);
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const { height } = useWindowDimensions();

  async function addCollection() {
    Haptics.selectionAsync();
    const res = await fetch('http://10.0.0.139:3001/add-collection', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        collection: { name, description },
      }),
    });
    const data = await res.json();
    if (res.status === 200) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      await getProductsAndCollections();
      setIsCollectionModalAddVisible(false);
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  }

  return (
    <SwipeableModal
      isVisible={isCollectionModalAddVisible}
      onSwipeComplete={() => setIsCollectionModalAddVisible(false)}
      onBackdropPress={() => setIsCollectionModalAddVisible(false)}
      modalHeight={height / 1.5}
    >
      <View
        style={{
          flex: 1,
          display: 'flex',
          gap: 16,
        }}
      >
        <Heading level={2}>New Collection</Heading>
        <Input
          placeholder="Collection Name"
          value={name}
          onChangeText={(input) => setName(input)}
        />
        <Input
          placeholder="Collection Description"
          value={description}
          onChangeText={(input) => setDescription(input)}
          multiline={true}
        />
        <Button title="Create Collection" onPress={addCollection} />
      </View>
    </SwipeableModal>
  );
}
