import { createContext, useContext } from 'react';
import {
  View,
  Text,
  useWindowDimensions,
  Pressable,
  FlatList,
} from 'react-native';
import { Pencil, Trash } from 'phosphor-react-native';
import * as Haptics from 'expo-haptics';
import { CollectionProductsContext } from '../context/collections';
import { Paragraph, Heading } from './Text';

export const CollectionModalActionsContext = createContext(null);

export default function CollectionModalActions({ collection }) {
  const {
    isCollectionModalActionsVisible,
    setIsCollectionModalActionsVisible,
  } = useContext(CollectionModalActionsContext);
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
      setIsCollectionModalActionsVisible(false);
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  }

  const actions = [
    {
      title: `Edit "${collection?.name}"`,
      icon: <Pencil size="18" weight="bold" />,
      action: () => null,
    },
    {
      title: `Delete "${collection?.name}"`,
      icon: <Trash size="18" weight="bold" color="red" />,
      action: deleteCollection,
    },
  ];

  return (
    <Modal
      isVisible={isCollectionModalVisible}
      onSwipeComplete={() => setIsCollectionModalActionsVisible(false)}
      onBackdropPress={() => setIsCollectionModalActionsVisible(false)}
      swipeDirection="down"
      backdropOpacity={0.25}
      backdropTransitionInTiming={200}
      backdropTransitionOutTiming={200}
      style={{ margin: 0, display: 'flex', justifyContent: 'flex-end' }}
    >
      <View
        style={{
          height: height / 2,
          width: width,
          backgroundColor: '#fff',
          borderRadius: 16,
          padding: 24,
          display: 'flex',
          gap: 16,
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
        <Heading level={3}>{collection?.name}</Heading>
        <Paragraph>{collection?.description}</Paragraph>
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
