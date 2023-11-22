import { createContext, useContext, useState } from 'react';
import {
  View,
  Text,
  useWindowDimensions,
  Pressable,
  FlatList,
  Animated,
  LayoutAnimation,
} from 'react-native';
import { Pencil, Trash } from 'phosphor-react-native';
import * as Haptics from 'expo-haptics';
import { CollectionProductsContext } from '../context/collections';
import { Paragraph, Heading } from './Text';
import SwipeableModal from './SwipableModal';
import { CollectionModalEditContext } from './CollectionModalEdit';
import CollectionModalEdit from './CollectionModalEdit';

export const CollectionModalActionsContext = createContext(null);

export default function CollectionModalActions({ collection }) {
  const [isEditing, setIsEditing] = useState(false);
  const {
    isCollectionModalActionsVisible,
    setIsCollectionModalActionsVisible,
  } = useContext(CollectionModalActionsContext);
  const { setIsCollectionModalEditVisible } = useContext(
    CollectionModalEditContext
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
      action: () => {
        Haptics.selectionAsync();
        LayoutAnimation.configureNext({
          duration: 400,
          update: { type: 'spring', springDamping: 0.6 },
        });
        setIsEditing(true);
      },
    },
    {
      title: `Delete "${collection?.name}"`,
      icon: <Trash size="18" weight="bold" color="red" />,
      action: deleteCollection,
    },
  ];

  return (
    <SwipeableModal
      isVisible={isCollectionModalActionsVisible}
      onSwipeComplete={() => setIsCollectionModalActionsVisible(false)}
      onBackdropPress={() => setIsCollectionModalActionsVisible(false)}
      modalHeight={isEditing ? height / 1.25 : height / 2}
    >
      {isEditing ? (
        <CollectionModalEdit
          collection={collection}
          back={() => {
            Haptics.selectionAsync();
            LayoutAnimation.configureNext({
              duration: 400,
              update: { type: 'spring', springDamping: 0.6 },
            });
            setIsEditing(false);
          }}
        />
      ) : (
        <>
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
        </>
      )}
    </SwipeableModal>
  );
}
