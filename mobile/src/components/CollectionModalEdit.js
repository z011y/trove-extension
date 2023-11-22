import { useState, useContext, createContext } from 'react';
import { View, useWindowDimensions, Pressable } from 'react-native';
import Input from './Input';
import { Heading } from './Text';
import SwipeableModal from './SwipableModal';
import Button from './Button';
import * as Haptics from 'expo-haptics';
import { CollectionProductsContext } from '../context/collections';
import { ArrowLeft } from 'phosphor-react-native';

export const CollectionModalEditContext = createContext(null);

export default function CollectionModalEdit({ collection, back }) {
  const { isCollectionModalEditVisible, setIsCollectionModalEditVisible } =
    useContext(CollectionModalEditContext);
  const { getProductsAndCollections } = useContext(CollectionProductsContext);
  const [name, setName] = useState(collection?.name);
  const [description, setDescription] = useState(collection?.description);
  const { height } = useWindowDimensions();

  async function editCollection() {
    Haptics.selectionAsync();
    const res = await fetch('http://10.0.0.139:3001/edit-collection', {
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
      setIsCollectionModalEditVisible(false);
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  }

  return (
    <View
      style={{
        flex: 1,
        display: 'flex',
        gap: 16,
      }}
    >
      <Pressable onPress={back}>
        <ArrowLeft size="20" weight="bold" />
      </Pressable>
      <Heading level={2}>Edit Collection</Heading>
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
      <Button title="Update Collection" onPress={editCollection} />
    </View>
  );
}
