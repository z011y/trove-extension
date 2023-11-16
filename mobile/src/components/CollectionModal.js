import { createContext, useContext } from 'react';
import {
  View,
  Text,
  useWindowDimensions,
  Pressable,
  FlatList,
} from 'react-native';
import Modal from 'react-native-modal';
import { Pencil, Trash } from 'phosphor-react-native';
import * as Haptics from 'expo-haptics';
import { CollectionProductsContext } from '../context/collections';

export const CollectionModalContext = createContext(null);

export default function CollectionModal({ collection }) {
  const { isCollectionModalVisible, setIsCollectionModalVisible } = useContext(
    CollectionModalContext
  );
  const { getProductsAndCollections } = useContext(CollectionProductsContext);
  const { width, height } = useWindowDimensions();

  async function deleteCollection() {
    Haptics.selectionAsync();
    const res = await fetch(
      `http://10.0.0.139:3001/delete-collection/${collection.id}`,
      {
        method: 'POST',
      }
    );
    const data = await res.json();
    console.log(data);
    if (res.status === 200) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      await getProductsAndCollections();
      setIsCollectionModalVisible(false);
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  }

  const actions = [
    {
      title: 'Edit Name',
      icon: <Pencil size="18" weight="bold" />,
      action: () => null,
    },
    {
      title: 'Edit Description',
      icon: <Pencil size="18" weight="bold" />,
      action: () => null,
    },
    {
      title: 'Delete Collection',
      icon: <Trash size="18" weight="bold" color="red" />,
      action: deleteCollection,
    },
  ];

  return (
    <Modal
      isVisible={isCollectionModalVisible}
      onSwipeComplete={() => setIsCollectionModalVisible(false)}
      onBackdropPress={() => setIsCollectionModalVisible(false)}
      swipeDirection="down"
      backdropOpacity={0.25}
      backdropTransitionInTiming={200}
      backdropTransitionOutTiming={200}
      style={{ margin: 0, display: 'flex', justifyContent: 'flex-end' }}
    >
      <View
        style={{
          height: 256,
          width: width,
          backgroundColor: '#fff',
          borderRadius: 16,
          padding: 24,
        }}
      >
        <View
          style={{
            position: 'absolute',
            top: 4,
            left: width / 2 - 32,
            width: 64,
            height: 4,
            borderRadius: 4,
            backgroundColor: '#F3F3F3',
          }}
        />
        <FlatList
          data={actions}
          keyExtractor={(item, index) => item + index}
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
          renderItem={({ item }) => (
            <Pressable onPress={item.action}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: 16,
                  backgroundColor: '#F3F3F3',
                  borderRadius: 16,
                }}
              >
                <Text
                  style={{
                    height: 18,
                    fontFamily: 'Epilogue_500Medium',
                  }}
                >
                  {item.title}
                </Text>
                {item.icon}
              </View>
            </Pressable>
          )}
        />
      </View>
    </Modal>
  );
}
